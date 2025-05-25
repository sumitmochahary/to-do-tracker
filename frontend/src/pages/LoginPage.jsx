import {
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    CircularProgress,
    Backdrop,
    Divider
} from "@mui/material";

import { useState } from "react";
import { useForm } from "react-hook-form";

import EmailIcon from "@mui/icons-material/Email";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";

function LoginPage() {
    const {
        register,
        handleSubmit,
        trigger,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const onFormSubmit = async (data) => {
        setLoading(true);

        setTimeout(() => {
            console.log("Logged In Successfully with:", data);
            setLoading(false);
            reset();
        }, 2000);
    };

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <Container
                maxWidth={false}
                disableGutters
                sx={{
                    background: "linear-gradient(to top right, #ffa585, #ffeda0, #a0e7e5)",
                    display: "flex",
                    justifyContent: "center",
                    minHeight: "100vh",
                    width: "100%",
                    alignItems: "center"
                }}
            >
                <Container
                    maxWidth="md"
                    disableGutters
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        minHeight: "100vh",
                        gap: { md: 4 }
                    }}
                >
                    {/* Left side: Login Form */}
                    <Box
                        flex={1}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        p={2}
                    >
                        <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
                            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
                                Welcome back!
                            </Typography>
                            <Typography align="center" gutterBottom>
                                Simplify your task with our Todo App. Get started for free
                            </Typography>

                            <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                                <Box mb={2}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        type="email"
                                        value={watch("email")}
                                        {...register("email", {
                                            required: "Email is required.",
                                            pattern: {
                                                value: /^\S+@\S+\.\S+$/,
                                                message: "Invalid email address."
                                            }
                                        })}
                                        error={!!errors.email}
                                        helperText={errors.email?.message || " "}
                                        onBlur={() => trigger("email")}
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment>
                                                        <EmailIcon />
                                                    </InputAdornment>
                                                )
                                            }
                                        }}
                                    />
                                </Box>

                                <Box mb={1}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        variant="outlined"
                                        value={watch("password")}
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters."
                                            }
                                        })}
                                        error={!!errors.password}
                                        helperText={errors.password?.message || " "}
                                        onBlur={() => trigger("password")}
                                        slotProps={{
                                            input: {
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={togglePasswordVisibility}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }
                                        }}
                                    />
                                </Box>

                                <Typography mb={1} align="right" gutterBottom>
                                    Forgot Password?
                                </Typography>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    disabled={loading}
                                >
                                    {loading ? "Signing In..." : "Sign In"}
                                </Button>
                            </form>

                            <Typography mt={5} align="center" gutterBottom>
                                <Divider>or continue with</Divider>
                            </Typography>

                            <Box mt={3} display="flex" justifyContent="center" gap={2}>
                                <IconButton aria-label="Google login">
                                    <GoogleIcon />
                                </IconButton>
                                <IconButton aria-label="Apple login">
                                    <AppleIcon />
                                </IconButton>
                            </Box>

                            <Typography mt={4} align="center" gutterBottom>
                                Not a member? Register now
                            </Typography>
                        </Paper>
                    </Box>

                    {/* Right side: Image */}
                    <Box
                        sx={{
                            flex: 1,
                            display: { xs: 'none', md: "block" },
                            backgroundImage: "url('/assets/login-image.png')",
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: '100vh'
                        }}
                    />
                </Container>
            </Container>
        </>
    );
}

export default LoginPage;
