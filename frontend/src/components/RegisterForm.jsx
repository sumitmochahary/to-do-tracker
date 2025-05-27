import { Box, TextField, InputAdornment, Button, IconButton, Typography } from "@mui/material"

import { useState } from "react"
import { useForm } from "react-hook-form"

import EmailIcon from "@mui/icons-material/Email"
import PersonIcon from "@mui/icons-material/Person"
import DialpadIcon from "@mui/icons-material/Dialpad"
import PasswordIcon from "@mui/icons-material/Password"

function RegisterForm({ onLoadingChange }) {

    const {
        register,
        handleSubmit,
        trigger,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
        }
    });

    const [loading, setLoading] = useState(false)

    const onFormSubmit = async (data) => {
        setLoading(true)
        onLoadingChange?.(true)

        setTimeout(() => {
            console.log("Registered Successfully with:", data)
            setLoading(false)
            onLoadingChange?.(false)
            reset();
        }, 2000);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
            {/* Name field */}
            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    value={watch("fullName")}
                    {...register("fullName", {
                        required: "First name is required."
                    })}
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message || " "}
                    onBlur={() => trigger("fullName")}
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
                    value={watch("email")}
                    {...register("email", {
                        required: "Email is required.",
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Invalid email address.",
                        },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message || " "}
                    onBlur={() => trigger("email")}
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

            <Box mb={2}>
                <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    autoComplete="tel"
                    value={watch("phone")}
                    {...register("phone", {
                        required: "Phone number is required.",
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Phone number must be 10 digits.",
                        },
                    })}
                    error={!!errors.phone}
                    helperText={errors.phone?.message || " "}
                    onBlur={() => trigger("phone")}
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