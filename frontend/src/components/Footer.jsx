import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Link, 
  IconButton,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <GitHubIcon />, url: 'https://github.com', label: 'GitHub' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <TwitterIcon />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <EmailIcon />, url: 'mailto:contact@example.com', label: 'Email' }
  ];

  const quickLinks = [
    { text: 'About Us', url: '/about' },
    { text: 'Features', url: '/features' },
    { text: 'Pricing', url: '/pricing' },
    { text: 'Contact', url: '/contact' }
  ];

  const supportLinks = [
    { text: 'Help Center', url: '/help' },
    { text: 'Privacy Policy', url: '/privacy' },
    { text: 'Terms of Service', url: '/terms' },
    { text: 'FAQ', url: '/faq' }
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: { xs: 3, sm: 4, md: 6 },
        mt: 'auto',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        // Ensure footer spans full width regardless of parent layout
        marginLeft: 0,
        marginRight: 0,
        left: 0,
        right: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          zIndex: 0
        }
      }}
    >
      <Container 
        maxWidth="xl" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Grid container spacing={{ xs: 3, sm: 4 }}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: { xs: 2, md: 3 } }}>
              <Typography 
                variant={isSmallMobile ? "h6" : "h5"}
                sx={{ 
                  fontWeight: 'bold', 
                  mb: 2,
                  background: 'linear-gradient(45deg, #ffffff 30%, #f8f9fa 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  justifyContent: { xs: 'center', md: 'flex-start' }
                }}
              >
                🎯 To-Do Tracker 
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.9, 
                  lineHeight: 1.6,
                  mb: 3,
                  textAlign: { xs: 'center', md: 'left' },
                  fontSize: { xs: '0.85rem', sm: '0.875rem' }
                }}
              >
                Streamline your productivity with our intuitive task management system. 
                Organize, prioritize, and achieve your goals with ease.
              </Typography>
              
              {/* Social Links */}
              <Box sx={{ 
                display: 'flex', 
                gap: 1,
                justifyContent: { xs: 'center', md: 'flex-start' },
                flexWrap: 'wrap'
              }}>
                {socialLinks.map((social, index) => (
                  <IconButton
                    key={index}
                    component={Link}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    size={isSmallMobile ? "small" : "medium"}
                    sx={{
                      color: 'white',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                opacity: 0.95,
                textAlign: { xs: 'center', sm: 'left' },
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'row', sm: 'column' },
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              gap: { xs: 2, sm: 1 },
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}>
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.8,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    '&:hover': {
                      opacity: 1,
                      textDecoration: 'underline',
                      transform: 'translateX(4px)',
                    },
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Support Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                opacity: 0.95,
                textAlign: { xs: 'center', sm: 'left' },
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Support
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'row', sm: 'column' },
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              gap: { xs: 2, sm: 1 },
              justifyContent: { xs: 'center', sm: 'flex-start' }
            }}>
              {supportLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  sx={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: 0.8,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    '&:hover': {
                      opacity: 1,
                      textDecoration: 'underline',
                      transform: 'translateX(4px)',
                    },
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {link.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold', 
                mb: 2,
                opacity: 0.95,
                textAlign: { xs: 'center', md: 'left' },
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              Get In Touch
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
              alignItems: { xs: 'center', md: 'flex-start' }
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                opacity: 0.9,
                fontSize: { xs: '0.85rem', sm: '0.875rem' }
              }}>
                <EmailIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                <Typography variant="body2" sx={{ fontSize: 'inherit' }}>
                  contact@taskflowpro.com
                </Typography>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                opacity: 0.9,
                fontSize: { xs: '0.85rem', sm: '0.875rem' }
              }}>
                <PhoneIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                <Typography variant="body2" sx={{ fontSize: 'inherit' }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1, 
                opacity: 0.9,
                fontSize: { xs: '0.85rem', sm: '0.875rem' }
              }}>
                <LocationIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                <Typography variant="body2" sx={{ fontSize: 'inherit' }}>
                  India, Mumbai
                </Typography>
              </Box>
            </Box>

            {/* Newsletter Signup */}
            <Box 
              sx={{ 
                mt: 3, 
                p: { xs: 1.5, sm: 2 }, 
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 1, 
                  fontWeight: 'medium',
                  fontSize: { xs: '0.85rem', sm: '0.875rem' }
                }}
              >
                📬 Stay Updated
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  opacity: 0.8,
                  fontSize: { xs: '0.75rem', sm: '0.8rem' }
                }}
              >
                Subscribe to our newsletter for the latest updates and productivity tips.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider 
          sx={{ 
            my: { xs: 3, sm: 4 }, 
            borderColor: 'rgba(255, 255, 255, 0.2)',
            opacity: 0.6
          }} 
        />

        {/* Bottom Section */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: 0.8,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              flexWrap: 'wrap',
              justifyContent: 'center',
              fontSize: { xs: '0.8rem', sm: '0.875rem' }
            }}
          >
            © {currentYear} To-Do Tracker . Made with 
            <FavoriteIcon sx={{ fontSize: { xs: '0.9rem', sm: '1rem' }, color: '#ff6b6b' }} /> 
            for productivity enthusiasts.
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              opacity: 0.7,
              fontSize: { xs: '0.75rem', sm: '0.8rem' }
            }}
          >
            Version 2.1.0 | All rights reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;