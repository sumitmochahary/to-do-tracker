import { Box, Typography, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router';

function PageNotFound() {
    return (
        <Container
            maxWidth="md"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                py: 4,
            }}
        >
            <Typography variant="h1" component="div" color="error" gutterBottom>
                404
            </Typography>
            <Typography variant="h4" component="h2" gutterBottom>
                Page Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                The page you are looking for doesn't exist or has been moved.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/"
            >
                Go to Homepage
            </Button>
        </Container>
    )
}

export default PageNotFound