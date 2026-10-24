import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') &&
  supabaseUrl.startsWith('https://')
);

if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file or Vercel Environment Variables.'
  );
}

// Create Supabase Client instance (fallback to null client if not yet configured)
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

/**
 * ------------------------------------------------------------------
 * Ideal Arts Classes - Database & Auth Service Layer
 * ------------------------------------------------------------------
 */

export const authService = {
  async signUp({ email, password, fullName, phone, className = '12th' }) {
    if (!supabase) return { error: { message: 'Supabase is not configured' } };
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone,
          class_name: className
        }
      }
    });

    if (error) return { error };

    // Auto-create profile row if user created
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        full_name: fullName,
        phone,
        class_name: className,
        role: 'student'
      });
    }

    return { data, error: null };
  },

  async signIn({ email, password }) {
    if (!supabase) return { error: { message: 'Supabase is not configured' } };
    return await supabase.auth.signInWithPassword({ email, password });
  },

  async signInWithGoogle() {
    if (!supabase) return { error: { message: 'Supabase is not configured' } };
    try {
      const res = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          skipBrowserRedirect: true
        }
      });

      if (res.error) return res;

      if (res.data?.url) {
        // Probe endpoint to verify domain is valid and reachable before navigating
        try {
          await fetch(res.data.url, { method: 'HEAD', mode: 'no-cors' });
          window.location.href = res.data.url;
          return { data: res.data };
        } catch (netErr) {
          console.warn('Configured Supabase URL is unreachable or invalid (DNS error):', netErr);
          return { error: { message: 'Supabase URL is unreachable or invalid' } };
        }
      }
      return res;
    } catch (err) {
      console.warn('OAuth signIn exception:', err);
      return { error: err };
    }
  },

  async signInWithOtp({ email, phone }) {
    if (!supabase) return { error: { message: 'Supabase is not configured' } };
    if (email) {
      return await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true
        }
      });
    }
    return await supabase.auth.signInWithOtp({ phone });
  },

  async verifyOtp({ email, phone, token, type }) {
    if (!supabase) return { error: { message: 'Supabase is not configured' } };
    const otpType = type || (email ? 'email' : 'sms');
    const payload = { token, type: otpType };
    if (email) payload.email = email;
    if (phone) payload.phone = phone;
    return await supabase.auth.verifyOtp(payload);
  },

  async resetPasswordForEmail(email) {
    if (!supabase) return { error: { message: 'Supabase is not configured' } };
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin
    });
  },

  async signOut() {
    if (!supabase) return { error: null };
    return await supabase.auth.signOut();
  },

  async getSession() {
    if (!supabase) return { data: { session: null }, error: null };
    return await supabase.auth.getSession();
  },

  onAuthStateChange(callback) {
    if (!supabase) return { data: { subscription: { unsubscribe: () => {} } } };
    return supabase.auth.onAuthStateChange(callback);
  }
};

export const liveClassService = {
  async getLiveClasses(classId = '12th') {
    if (!supabase) return { data: [], error: null };
    let query = supabase
      .from('live_classes')
      .select('*')
      .order('scheduled_at', { ascending: true });
    
    if (classId) {
      query = query.eq('class_id', classId);
    }
    
    return await query;
  },

  async getActiveLiveClass() {
    if (!supabase) return { data: null, error: null };
    const { data, error } = await supabase
      .from('live_classes')
      .select('*')
      .eq('is_live', true)
      .limit(1)
      .maybeSingle();

    return { data, error };
  }
};

export const studyMaterialService = {
  async getMaterials(classId = '12th', subjectId = null, mode = 'all') {
    if (!supabase) return { data: [], error: null };
    let query = supabase
      .from('study_materials')
      .select('*')
      .eq('class_id', classId);

    if (subjectId) {
      query = query.eq('subject_id', subjectId);
    }

    if (mode && mode !== 'all') {
      query = query.eq('mode', mode); // 'objective' or 'subjective'
    }

    return await query.order('chapter_number', { ascending: true });
  }
};

export const profileService = {
  async getProfile(userId) {
    if (!supabase) return { data: null, error: null };
    return await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
  },

  async updateProfile(userId, updates) {
    if (!supabase) return { error: { message: 'Supabase is not configured' } };
    return await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);
  }
};

export const announcementService = {
  async getAnnouncements(classId = '12th') {
    if (!supabase) return { data: [], error: null };
    return await supabase
      .from('announcements')
      .select('*')
      .or(`class_id.eq.${classId},class_id.eq.all`)
      .order('created_at', { ascending: false });
  }
};
