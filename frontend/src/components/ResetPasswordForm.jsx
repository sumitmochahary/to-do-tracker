import { Box, TextField, InputAdornment, Button } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import PasswordIcon from "@mui/icons-material/Password"

function ResetPasswordForm({ onLoadingChange }) {
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

    const onFormSubmit = async (data) => {
        const submitData = { ...data };
        delete submitData.confirmPassword;
        setLoading(true)
        onLoadingChange?.(true)
        reset()
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