import { Box, TextField, InputAdornment, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import PasswordIcon from "@mui/icons-material/Password"
import { resetPassword } from "../services/PasswordService";
import { useLocation, useNavigate } from "react-router";

function ResetPasswordForm({ onLoadingChange, onShowSnackbar }) {
    const {
        register,
        handleSubmit,
        trigger,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const [token, setToken] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const tokenFormUrl = searchParams.get("token")
        if (tokenFormUrl) {
            setToken(tokenFormUrl)
        }
    }, [location])

    const onFormSubmit = async (data) => {
        setLoading(true)
        onLoadingChange?.(true)

        const { password } = data

        try {
            const response = await resetPassword(token, password)
            console.log(response)
            reset()

            onShowSnackbar?.("Password changed successfully. Redirecting to login page...", "success")
            setTimeout(() => {
                navigate("/login")
            }, 3000);
        } catch (error) {
            console.error("Login error:", error);

            let message = "Login failed. Please try again.";

            // Network error (server is down or refused connection)
            if (error.message === "Network Error") {
                message = "Unable to connect to the server. Please check your internet or server.";
            }

            // Backend responded with error
            else if (error.response) {
                const status = error.response.status;
                const backendMessage = error.response.data?.message || error.response.data?.error || null;

                if (backendMessage) {
                    message = backendMessage;
                } else {
                    message = `Login failed with status ${status}.`;
                }
            }

            onShowSnackbar?.(message, "error");
        } finally {
            setLoading(false)
            onLoadingChange(false)
        }
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="New Password"
                    variant="outlined"
                    autoComplete="new-password"
                    type="password"
                    value={watch("password")}
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters.",
                        },
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message || " "}
                    onBlur={() => trigger("password")}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PasswordIcon />
                                </InputAdornment>
                            ),
                        }
                    }}
                />
            </Box>

            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Confirm Password"
                    variant="outlined"
                    value={watch("confirmPassword")}
                    type="text"
                    {...register("confirmPassword", {
                        required: "Confirm your password.",
                        validate: (value) =>
                            value === watch("password") || "Passwords do not match.",
                    })}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message || " "}
                    onBlur={() => trigger("confirmPassword")}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PasswordIcon />
                                </InputAdornment>
                            ),
                        }
                    }}
                />
            </Box>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
            >
                {loading ? "Reseting password..." : "Reset password"}
            </Button>
        </form>
    )
}

export default ResetPasswordForm