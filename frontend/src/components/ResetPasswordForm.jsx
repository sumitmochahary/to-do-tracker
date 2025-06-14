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
        setLoading(true);
        onLoadingChange?.(true);

        const { password } = data;

        try {
            await resetPassword(token, password);
            // console.log(response);
            reset();

            onShowSnackbar?.("Password changed successfully. Redirecting to login page...", "success");

            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error) {
            // console.error("Reset password error:", error);
            onShowSnackbar?.(error.message, "error");
        } finally {
            setLoading(false);
            onLoadingChange(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
            {/* New Password Field */}
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
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
                            message:
                                "Password must contain at least one uppercase letter, one lowercase letter, and one special character.",
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
            {/* Confirm Password Field */}
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