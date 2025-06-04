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
        setLoading(true)
        onLoadingChange?.(true)

        try {
            const response = await forgotPassword(data)
            console.log(response)
            reset()

            onShowSnackbar?.("Reset link is send successfully", "success")
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
            onLoadingChange?.(false)
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
                            value: /^\S+@\S+\.\S+$/,
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