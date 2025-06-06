import { Box, TextField, InputAdornment, Button } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import EmailIcon from "@mui/icons-material/Email"
import { forgotPassword } from "../services/PasswordService";

function ForgotPasswordForm({ onLoadingChange, onShowSnackbar }) {

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
        }
    });

    const [loading, setLoading] = useState(false)

    const onFormSubmit = async (data) => {
        setLoading(true);
        onLoadingChange?.(true);

        try {
            const response = await forgotPassword(data);
            console.log(response);
            reset();

            onShowSnackbar?.("Reset link is sent successfully", "success");
        } catch (error) {
            console.error("Forgot password error:", error);
            onShowSnackbar?.(error.message, "error");
        } finally {
            setLoading(false);
            onLoadingChange?.(false);
        }
    };


    return (
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

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
            >
                {loading ? "Sending reset link..." : "Send reset link"}
            </Button>
        </form>
    )
}

export default ForgotPasswordForm