import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
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
                <Typography variant="h5" color='textPrimary' sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    color: 'black',
                    flexGrow: 1
                }}>
                    <span style={{ marginRight: '0.5rem', fontSize: '1.8rem' }}>📋</span>
                    To-Do
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton onClick={goToLandingPage}>
                        <HomeIcon />
                    </IconButton>
                    <Button
                        variant="contained"
                        onClick={handleGoToBoard}
                        sx={{
                            backgroundColor: "#a0e7e5",
                            color: "black"
                        }}
                    >
                        Go to Board
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default CommonHeader