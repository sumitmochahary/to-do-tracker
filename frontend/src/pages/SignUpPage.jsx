import { Container, Paper, Typography } from "@mui/material"
import { useState } from "react"
import LoadingEffect from "../components/LoadingEffect"
import RegisterForm from "../components/RegisterForm"
import { Link } from "react-router"
import { motion as Motion } from "framer-motion"
import { formAnimationVariant } from "../animations/MotionVariants"

function SignUpPage() {

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
                    px: 2
                }}
            >
                <Motion.div
                    variants={formAnimationVariant}
                    initial="hidden"
                    animate="visible"
                    style={{ width: '100%', display: "flex", justifyContent: "center" }}
                >
                    <Paper
                        elevation={4}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            padding: { xs: 3, sm: 4, md: 4 },
                            width: "100%",
                            maxWidth: 550,
                            borderRadius: 3,
                            backdropFilter: "blur(6px)",
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            boxShadow: "0 12px 32px rgba(0,0,0,0.15)",
                        }}>
                        <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
                            Create an account
                        </Typography>

                        <RegisterForm onLoadingChange={setLoading} />

                        <Typography mt={3} align="center" gutterBottom>
                            Have an account?{" "}
                            <Link to="/login" className="no-underline">
                                Sign In
                            </Link>
                        </Typography>
                    </Paper>
                </Motion.div>
            </Container>
        </>
    );
}

export default SignUpPage;
