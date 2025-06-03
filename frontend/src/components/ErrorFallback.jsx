import React from "react";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";

function ErrorFallback({ error, resetErrorBoundary }) {
    // Prepare mailto body (encoded for URL)
    const subject = encodeURIComponent("Bug Report from React App");
    const body = encodeURIComponent(`
A user encountered an error in the application.

Message:
${error.message}

Stack Trace:
${error.stack}

Steps to Reproduce:
(please describe how this error occurred)
  `);
    const mailtoLink = `mailto:your-email@example.com?subject=${subject}&body=${body}`;

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff0f0",
                px: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    backgroundColor: "#fdecea",
                    color: "#b71c1c",
                    textAlign: "left",
                    maxWidth: 700,
                    width: "100%",
                    overflow: "auto",
                }}
                role="alert"
            >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Something went wrong.
                </Typography>

                <Typography
                    variant="body1"
                    sx={{ fontFamily: "monospace", mt: 2, whiteSpace: "pre-wrap" }}
                >
                    {error.message}
                </Typography>

                {error.stack && (
                    <>
                        <Typography variant="subtitle1" mt={3} fontWeight="medium">
                            Stack trace:
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mt: 1,
                                fontFamily: "monospace",
                                backgroundColor: "#fff3f3",
                                p: 2,
                                borderRadius: 2,
                                whiteSpace: "pre-wrap",
                                overflowX: "auto",
                            }}
                        >
                            {error.stack}
                        </Typography>
                    </>
                )}

                <Box mt={4} textAlign="center">
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="contained" color="error" onClick={resetErrorBoundary}>
                            Try Again
                        </Button>
                        <Button variant="outlined" color="error" href={mailtoLink}>
                            Report this Bug
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}

export default ErrorFallback;
