import { Box, TextField, InputAdornment, Button } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import EmailIcon from "@mui/icons-material/Email"
import PersonIcon from "@mui/icons-material/Person"
import DialpadIcon from "@mui/icons-material/Dialpad"
import PasswordIcon from "@mui/icons-material/Password"
import { registerUser } from "../services/AuthService"

function RegisterForm({ onLoadingChange, onShowSnackbar }) {

    const {
        register,
        handleSubmit,
        trigger,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            userName: "",
            emailId: "",
            phoneNumber: "",
            password: "",
            confirmPassword: ""
        }
    });

    const [loading, setLoading] = useState(false)

    const onFormSubmit = async (data) => {
        setLoading(true);
        onLoadingChange?.(true);

        // Remove confirmPassword before submitting
        const submitData = { ...data };
        delete submitData.confirmPassword;

        try {
            const response = await registerUser(submitData);
            console.log(response);
            reset();

            onShowSnackbar?.("Registration successful!", "success")
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
            setLoading(false);
            onLoadingChange?.(false);
        }
    };

    const validatePhoneNumber = (value) => {
        if (!/^[0-9]+$/.test(value)) {
            return "Phone number must contain digits only.";
        }
        if (value.length !== 10) {
            return "Phone number must be exactly 10 digits.";
        }
        if (!/^[6-9]/.test(value)) {
            return "Phone number must start with 6, 7, 8, or 9.";
        }
        return true;
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
            {/* Name field */}
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    autoComplete="name"
                    value={watch("userName")}
                    {...register("userName", {
                        required: "First name is required.",
                        minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters long.",
                        },
                        pattern: {
                            value: /^[A-Za-z\s]+$/, // Only letters and spaces
                            message: "Name can only contain letters (A-Z or a-z).",
                        },
                    })}
                    error={!!errors.userName}
                    helperText={errors.userName?.message || " "}
                    onBlur={() => trigger("userName")}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PersonIcon />
                                </InputAdornment>
                            ),
                        }
                    }}
                />
            </Box>
            {/* Email field */}
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    autoComplete="email"
                    value={watch("emailId")}
                    {...register("emailId", {
                        required: "Email is required.",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook)\.(com|in|co\.in)$/,
                            message: "Invalid email address.",
                        },
                    })}
                    error={!!errors.emailId}
                    helperText={errors.emailId?.message || " "}
                    onBlur={() => trigger("emailId")}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <EmailIcon />
                                </InputAdornment>
                            ),
                        }
                    }}
                />
            </Box>
            {/* Phone number field */}
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    autoComplete="tel"
                    value={watch("phoneNumber")}
                    {...register("phoneNumber", {
                        required: "Phone number is required.",
                        validate: validatePhoneNumber,
                    })}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message || " "}
                    onBlur={() => trigger("phoneNumber")}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <DialpadIcon />
                                </InputAdornment>
                            ),
                        }
                    }}
                />
            </Box>

            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Password"
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
                    autoComplete="new-password"
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
                {loading ? "Registering..." : "Register"}
            </Button>
        </form>
    );
}

export default RegisterForm