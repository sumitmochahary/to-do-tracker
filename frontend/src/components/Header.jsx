import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Slide, useScrollTrigger } from "@mui/material";

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  // Alternative method using useScrollTrigger for smoother experience
  const trigger = useScrollTrigger({
    threshold: 100, // Start hiding after 100px scroll
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;
      const isAtTop = currentScrollPos < 10;

      // Show header when scrolling up, at top, or when close to top
      setVisible(isScrollingUp || isAtTop);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <Slide appear={false} direction="down" in={visible}>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(102, 126, 234, 0.95)',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 25px rgba(102, 126, 234, 0.4)',
          }
        }}
      >
        <Toolbar sx={{ minHeight: '64px !important' }}>
          <Typography 
            variant="h5" 
            noWrap 
            component="div"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #ffffff 30%, #f0f0f0 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              letterSpacing: '0.5px'
            }}
          >
            🎯 To-Do Tracker
          </Typography>
          
          {/* Optional: Add a subtle indicator that header can hide */}
          <Typography
            variant="caption"
            sx={{
              ml: 'auto',
              opacity: 0.7,
              fontSize: '11px',
              display: { xs: 'none', sm: 'block' }
            }}
          >
          </Typography>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Header;