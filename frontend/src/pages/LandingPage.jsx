import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Mock navigation functions (replace with actual routing)
  const handleLogin = () => {
    console.log('Navigate to login');
    navigate("/login")
  };

  const handleSignUp = () => {
    console.log('Navigate to signup with email:', email);
    navigate("/register")
  };

  const handleGoToBoard = () => {
    console.log('Navigate to board');
    navigate("/dashboard")
  };

  const styles = {
    header: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: 'bold'
    },
    navButtons: {
      display: 'flex',
      gap: '1rem'
    },
    button: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      textDecoration: 'none'
    },
    primaryButton: {
      backgroundColor: '#667eea',
      color: 'white',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
    },
    secondaryButton: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      color: 'white',
      border: '1px solid rgba(255,255,255,0.3)'
    },
    heroSection: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '4rem 2rem'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%'
    },
    heroGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'center'
    },
    heroContent: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 1s ease'
    },
    heroTitle: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      color: 'white',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      marginBottom: '1.5rem',
      lineHeight: '1.2'
    },
    heroSubtitle: {
      fontSize: '1.25rem',
      color: 'rgba(255,255,255,0.9)',
      marginBottom: '2rem',
      lineHeight: '1.6'
    },
    emailForm: {
      display: 'flex',
      gap: '1rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    },
    emailInput: {
      flex: '1',
      minWidth: '250px',
      padding: '1rem',
      borderRadius: '8px',
      border: 'none',
      fontSize: '1rem',
      backgroundColor: 'rgba(255,255,255,0.9)',
      outline: 'none'
    },
    ctaButton: {
      padding: '1rem 2rem',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
    },
    guarantee: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: 'rgba(255,255,255,0.8)',
      fontSize: '0.9rem'
    },
    visualSection: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '400px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'scale(1)' : 'scale(0.8)',
      transition: 'all 1.2s ease'
    },
    boardContainer: {
      display: 'flex',
      gap: '1rem',
      transform: 'rotate(-5deg)',
      transition: 'transform 0.5s ease'
    },
    boardColumn: {
      width: '120px',
      backgroundColor: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
      padding: '1rem',
      animation: 'slideUp 0.8s ease both'
    },
    columnTitle: {
      fontSize: '0.9rem',
      fontWeight: 'bold',
      marginBottom: '0.75rem',
      color: '#2c3e50'
    },
    taskCard: {
      height: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      marginBottom: '8px'
    },
    featuresSection: {
      padding: '4rem 2rem',
      backgroundColor: '#f8f9fa'
    },
    featuresTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '3rem',
      color: '#2c3e50'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    },
    featureCard: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '12px',
      textAlign: 'center',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      transition: 'all 0.3s ease',
      border: 'none'
    },
    featureIcon: {
      fontSize: '3rem',
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    featureTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#2c3e50'
    },
    featureDescription: {
      color: '#666',
      lineHeight: '1.6'
    },
    ctaSection: {
      padding: '4rem 2rem',
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      color: 'white',
      textAlign: 'center'
    },
    ctaTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem'
    },
    ctaSubtitle: {
      fontSize: '1.25rem',
      marginBottom: '2rem',
      opacity: 0.9
    },
    finalCtaButton: {
      padding: '1rem 3rem',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)'
    },
    floatingElement: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.1)',
      animation: 'float 6s ease-in-out infinite'
    }
  };

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Organize tasks in seconds with our intuitive drag-and-drop interface'
    },
    {
      icon: '🔒',
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security measures'
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team members in real-time'
    }
  ];

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes slideUp {
            0% { opacity: 0; transform: translateY(50px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          }
          .button:hover {
            transform: translateY(-2px);
          }
          .cta-button:hover {
            background-color: #5a6fd8 !important;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
          }
          .final-cta-button:hover {
            background-color: #5a6fd8 !important;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
          }
          .board-container:hover {
            transform: rotate(0deg);
          }
          @media (max-width: 768px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
            .hero-title {
              font-size: 2.5rem !important;
            }
            .email-form {
              flex-direction: column !important;
            }
            .board-container {
              transform: none !important;
            }
            .features-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={{ marginRight: '0.5rem', fontSize: '1.8rem' }}>📋</span>
          To-Do Tracker
        </div>
        <div style={styles.navButtons}>
          <button
            style={{ ...styles.button, ...styles.secondaryButton }}
            className="button"
            onClick={handleLogin}
          >
            Log in
          </button>
          <button
            style={{ ...styles.button, ...styles.primaryButton }}
            className="button"
            onClick={handleGoToBoard}
          >
            Go to Board
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        {/* Floating elements */}
        <div style={{
          ...styles.floatingElement,
          top: '10%',
          left: '10%',
          width: '100px',
          height: '100px'
        }} />
        <div style={{
          ...styles.floatingElement,
          top: '60%',
          right: '15%',
          width: '150px',
          height: '150px',
          animationDelay: '2s',
          animationDirection: 'reverse'
        }} />

        <div style={styles.container}>
          <div style={styles.heroGrid} className="hero-grid">
            <div style={styles.heroContent}>
              <h1 style={styles.heroTitle} className="hero-title">
                Organize Your Life
                <span style={{ color: '#FFE066' }}> Beautifully</span>
              </h1>
              <p style={styles.heroSubtitle}>
                Transform chaos into clarity with our powerful, intuitive task management platform.
                Perfect for individuals and teams who want to get things done.
              </p>

              <div style={styles.emailForm} className="email-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.emailInput}
                />
                <button
                  onClick={handleSignUp}
                  style={styles.ctaButton}
                  className="cta-button"
                >
                  Get Started Free →
                </button>
              </div>

              <div style={styles.guarantee}>
                <span style={{ color: '#4CAF50', fontSize: '1.2rem' }}>✓</span>
                No credit card required • Free forever plan available
              </div>
            </div>

            <div style={styles.visualSection}>
              <div style={styles.boardContainer} className="board-container">
                {['To Do', 'In Progress', 'Done'].map((title, index) => (
                  <div
                    key={title}
                    style={{
                      ...styles.boardColumn,
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <div style={styles.columnTitle}>{title}</div>
                    {Array.from({ length: index + 1 }, (_, i) => (
                      <div key={i} style={styles.taskCard} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.container}>
          <h2 style={styles.featuresTitle}>Why Choose TrelloBoard?</h2>
          <div style={styles.featuresGrid} className="features-grid">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                style={{
                  ...styles.featureCard,
                  animationDelay: `${index * 0.2}s`
                }}
                className="feature-card"
              >
                <div style={styles.featureIcon}>{feature.icon}</div>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.container}>
          <h2 style={styles.ctaTitle}>Ready to Get Organized?</h2>
          <p style={styles.ctaSubtitle}>
            Join thousands of users who have transformed their productivity
          </p>
          <button
            style={styles.finalCtaButton}
            className="final-cta-button"
            onClick={handleLogin}
          >
            Start Your Journey Today
          </button>
        </div>
      </section>
    </>
  );
};

export default LandingPage;