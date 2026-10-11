import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Ideal Arts Classes App Error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0F172A',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{
            maxWidth: 420,
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 16,
            padding: 24,
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'rgba(13, 148, 136, 0.15)',
              color: '#2DD4BF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              fontSize: 24
            }}>
              ✨
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
              Ideal Arts Classes
            </h2>
            <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 20 }}>
              कुछ अप्रत्याशित समस्या आई है। कृपया ऐप पुनः लोड करें।
            </p>
            <button
              onClick={this.handleReset}
              style={{
                width: '100%',
                padding: '12px 20px',
                background: '#0D9488',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ऐप पुनः लोड करें (Reload App)
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
