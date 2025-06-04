import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router';



function CommonHeader() {
    const navigate = useNavigate();

    const handleGoToBoard = () => navigate("/dashboard");
    const goToLandingPage = () => navigate('/');

    return (
        <AppBar position="sticky" sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            py: 1
        }}>
            <Toolbar>
                <AssignmentIcon sx={{ mr: 1, fontSize: 30 }} />
                <Typography variant="h5" sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    flexGrow: 1
                }}>
                    {/* <span style={{ marginRight: '0.5rem', fontSize: '1.8rem' }}>📋</span> */}
                    To-Do
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton onClick={goToLandingPage} color='inherit'>
                        <HomeIcon />
                    </IconButton>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#667eea',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                            '&:hover': { backgroundColor: '#5a6fd8' }
                        }}
                        onClick={handleGoToBoard}
                    >
                        Go to Board
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default CommonHeader