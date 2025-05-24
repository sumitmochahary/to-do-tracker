import { Box, Button, Container, Paper, TextField, Typography, InputAdornment, IconButton } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import EmailIcon from "@mui/icons-material/Email"
import { Visibility, VisibilityOff } from "@mui/icons-material"

function LoginPage({ onSubmit }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    const onFormSubmit = data => {
        onSubmit(data)
    }

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 6 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            {...register("email", {
                                required: "Email is required.",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Invalid email address."
                                }
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
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

                    <Box mb={3}>
                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters."
                                }
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={togglePasswordVisibility}
                                                edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
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
                    >
                        Sign In
                    </Button>
                </form>
            </Paper>
        </Container>
    )
}

export default LoginPage