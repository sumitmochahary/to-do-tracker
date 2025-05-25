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
    Backdrop
} from "@mui/material";

import { useState } from "react";
import { useForm } from "react-hook-form";

import EmailIcon from "@mui/icons-material/Email";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginPage() {

    // Initialize react-hook-form with default values
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

    const [showPassword, setShowPassword] = useState(false); // Toggles password visibility
    const [loading, setLoading] = useState(false); // Controls loading screen visibility

    // Toggle visibility of password input
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    // Handle form submission
    const onFormSubmit = async (data) => {
        setLoading(true); // Show loading spinner

        // Simulate API call
        setTimeout(() => {
            console.log("Logged In Successfully with:", data);
            setLoading(false); // Hide spinner
            reset(); // Reset form fields
        }, 2000);
    };

    return (
        <>
            {/* Full-screen loading overlay */}
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            {/* Main login container */}
            <Container maxWidth={false} disableGutters sx={{
                backgroundColor: "pink",
                display: "flex",
                justifyContent: "center",
                minHeight: "100vh",
                width: "100%"
            }}>
                <Container maxWidth="sm">
                    <Paper elevation={3} sx={{ padding: 4, marginTop: 6 }}>
                        <Typography variant="h4" align="center" gutterBottom>
                            LOGIN
                        </Typography>

                        {/* Form starts here */}
                        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>

                            {/* Email input field */}
                            <Box mb={2}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    value={watch("email")} // Controlled input
                                    {...register("email", {
                                        required: "Email is required.",
                                        pattern: {
                                            value: /^\S+@\S+\.\S+$/,
                                            message: "Invalid email address."
                                        }
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message || " "} // Prevents layout shift
                                    onBlur={() => trigger("email")} // Trigger validation on blur
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

                            {/* Password input field */}
                            <Box mb={1}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    variant="outlined"
                                    value={watch("password")} // Controlled input
                                    type={showPassword ? "text" : "password"} // Toggle visibility
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters."
                                        }
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message || " "} // Prevents layout shift
                                    onBlur={() => trigger("password")} // Trigger validation on blur
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

                            {/* Forget password link */}
                            <Typography mb={1} align="right" gutterBottom>
                                Forget Password?
                            </Typography>

                            {/* Submit button */}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                disabled={loading} // Prevent multiple submissions
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </Button>
                        </form>

                        {/* Sign-up prompt */}
                        <Typography mt={4} align="center" gutterBottom>
                            Not a member? Register now
                        </Typography>
                    </Paper>
                </Container>
            </Container>
        </>
    );
}

export default LoginPage;
