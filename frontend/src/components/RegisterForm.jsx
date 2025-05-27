import { Box, TextField, InputAdornment, Button, IconButton, Typography } from "@mui/material";

import { useState } from "react";
import { useForm } from "react-hook-form";

import EmailIcon from "@mui/icons-material/Email";
import { Visibility, VisibilityOff } from "@mui/icons-material";

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
            email: "",
            password: ""
        }
    });

    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    };

    const onFormSubmit = async (data) => {
        setLoading(true)
        onLoadingChange?.(true)

        setTimeout(() => {
            console.log("Logged In Successfully with:", data)
            setLoading(false)
            onLoadingChange?.(false)
            reset();
        }, 2000);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
            <Box mb={2}>
                <Typography>First Name</Typography>
                <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    {...register("firstName", { required: "First name is required." })}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message || " "}
                    onBlur={() => trigger("firstName")}
                />
            </Box>

            <Box mb={2}>
                <Typography>Last Name</Typography>
                <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    {...register("lastName", { required: "Last name is required." })}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message || " "}
                    onBlur={() => trigger("lastName")}
                />
            </Box>

            <Box mb={2}>
                <Typography>Email</Typography>
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
                <Typography>Phone Number</Typography>
                <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    autoComplete="tel"
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
                />
            </Box>

            <Box mb={2}>
                <Typography>Password</Typography>
                <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    autoComplete="new-password"
                    type={showPassword ? "text" : "password"}
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
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }
                    }}
                />
            </Box>

            <Box mb={2}>
                <Typography>Confirm Password</Typography>
                <TextField
                    fullWidth
                    label="Confirm Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
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
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
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