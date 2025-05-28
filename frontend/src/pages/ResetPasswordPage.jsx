import { Container, Paper, Typography } from "@mui/material"
import { useState } from "react"
import LoadingEffect from "../components/LoadingEffect"
import ForgotPasswordForm from "../components/ForgotPasswordForm"
import { Link } from "react-router"
import { motion as Motion } from "framer-motion"
import { formAnimationVariant } from "../animations/MotionVariants"
import ResetPasswordForm from "../components/ResetPasswordForm"

function ResetPasswordPage() {
    const [loading, setLoading] = useState(false);

    return (
        <>
            <LoadingEffect loading={loading} />

            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    background: "linear-gradient(to top right, #ffa585, #ffeda0, #a0e7e5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    width: "100%",
                }}
            >
                <Container
                    maxWidth="md"
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                        p: 2
                    }}
                >
                    <Motion.div
                        variants={formAnimationVariant}
                        initial="hidden"
                        animate="visible"
                        style={{ width: '100%', display: "flex", justifyContent: "center" }}
                    >
                        <Paper elevation={4} sx={{
                            padding: { xs: 3, sm: 4, md: 4 },
                            maxWidth: 550,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            borderRadius: 3,
                            boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                            backdropFilter: "blur(6px)",
                        }}>
                            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
                                Change your password
                            </Typography>

                            <Typography mb={3}>Enter a new password below to change your password</Typography>

                            <ResetPasswordForm onLoadingChange={setLoading} />
                        </Paper>
                    </Motion.div>
                </Container>
            </Container>
        </>
    )
}

export default ResetPasswordPage