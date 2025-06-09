import { Box, TextField, InputAdornment, Button, Typography, IconButton } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import EmailIcon from "@mui/icons-material/Email"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { loginUser } from "../services/AuthService"
import { Link, useNavigate } from "react-router"

function LoginForm({ onLoadingChange, onShowSnackbar }) {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        trigger,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            emailId: "",
            password: ""
        }
    });

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    };

    const onFormSubmit = async (data) => {
        setLoading(true);
        onLoadingChange?.(true);

        try {
            const response = await loginUser(data);
            localStorage.setItem("token", response.token);
            onShowSnackbar?.(response.message, "success")
            reset();

            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (error) {
            onShowSnackbar?.(error.message, "error");
        } finally {
            setLoading(false);
            onLoadingChange?.(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        type="email"
                        autoComplete="email"
                        value={watch("emailId")}
                        {...register("emailId", {
                            required: "Email is required.",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.(com|in|co\.in)$/,
                                message: "Invalid email address."
                            }
                        })}
                        error={!!errors.emailId}
                        helperText={errors.emailId?.message || " "}
                        onBlur={() => trigger("emailId")}
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

                <Box >
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        value={watch("password")}
                        autoComplete="current-password"
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                            required: "Password is required"
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

                <Typography mb={2} align="right" gutterBottom>
                    <Link to="/forgot-password" className="no-underline">Forgot Password?</Link>
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
        </>
    )
}

export default LoginForm