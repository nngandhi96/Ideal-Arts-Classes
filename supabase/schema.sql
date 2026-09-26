-- ====================================================================
-- Ideal Arts Classes (कला ज्ञानं जीवनम्) - Supabase Database Schema
-- Run this in Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ====================================================================

-- 1. Create Profiles Table (Linked with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    class_name TEXT DEFAULT '12th' CHECK (class_name IN ('12th', '11th', '10th', '9th', '8th')),
    stream TEXT DEFAULT 'Arts (कला संकाय)',
    avatar_url TEXT,
    role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Live Classes Table
CREATE TABLE IF NOT EXISTS public.live_classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    title_hindi TEXT,
    class_id TEXT NOT NULL CHECK (class_id IN ('12th', '11th', '10th', '9th', '8th')),
    subject_id TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    teacher_name TEXT NOT NULL DEFAULT 'Ideal Arts Faculty',
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_mins INT DEFAULT 60,
    is_live BOOLEAN DEFAULT false,
    meeting_link TEXT,
    recording_url TEXT,
    badge_label TEXT DEFAULT 'Important',
    viewers_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Study Materials (Notes, PDFs, Objective & Subjective)
CREATE TABLE IF NOT EXISTS public.study_materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    title_hindi TEXT,
    class_id TEXT NOT NULL CHECK (class_id IN ('12th', '11th', '10th', '9th', '8th')),
    subject_id TEXT NOT NULL,
    chapter_number INT NOT NULL,
    chapter_name TEXT NOT NULL,
    mode TEXT NOT NULL CHECK (mode IN ('objective', 'subjective', 'both')),
    file_url TEXT NOT NULL,
    pages_count INT DEFAULT 1,
    downloads_count INT DEFAULT 0,
    is_free BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    class_id TEXT DEFAULT 'all', -- 'all' or specific class '12th'
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('normal', 'high', 'urgent')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone authenticated can view their own profile, public can view basic info
CREATE POLICY "Public profiles are viewable by authenticated users" 
ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Live Classes: Publicly viewable by all students
CREATE POLICY "Live classes are viewable by everyone" 
ON public.live_classes FOR SELECT TO public USING (true);

-- Study Materials: Publicly viewable by everyone
CREATE POLICY "Study materials are viewable by everyone" 
ON public.study_materials FOR SELECT TO public USING (true);

-- Announcements: Publicly viewable by everyone
CREATE POLICY "Announcements are viewable by everyone" 
ON public.announcements FOR SELECT TO public USING (true);

-- ====================================================================
-- SAMPLE SEED DATA (For Immediate Verification)
-- ====================================================================

INSERT INTO public.live_classes (title, title_hindi, class_id, subject_id, subject_name, teacher_name, scheduled_at, is_live, viewers_count)
VALUES 
('Bhakti-Sufi Traditions Full Chapter', 'भक्ति-सूफ़ी परंपराएँ सम्पूर्ण अध्याय', '12th', 'history', 'History (इतिहास)', 'प्रो. आर. के. झा', now() + interval '2 hours', false, 128),
('Human Geography Principles & Practice', 'मानव भूगोल के मूल सिद्धांत', '12th', 'geography', 'Geography (भूगोल)', 'डॉ. एस. एन. वर्मा', now(), true, 342),
('Indian Constitution in Practice', 'भारतीय संविधान: सिद्धांत और व्यवहार', '11th', 'political_science', 'Political Science', 'प्रो. ए. के. शर्मा', now() + interval '1 day', false, 95)
ON CONFLICT DO NOTHING;

INSERT INTO public.announcements (title, message, class_id, priority)
VALUES 
('Special Bihar Board 2026 Objective Series', 'कक्षा 12वीं कला संकाय के लिए 500+ महत्वपूर्ण वस्तुनिष्ठ प्रश्नों की स्पेशल सीरीज़ शुरू हो गई है।', '12th', 'high'),
('Sunday Doubt Clearing Mega Session', 'रविवार सुबह 10:00 बजे सभी संकायों के लिए विशेष डाउट सेशन आयोजित किया जाएगा।', 'all', 'normal')
ON CONFLICT DO NOTHING;
