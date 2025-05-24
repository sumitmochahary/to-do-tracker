import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"

function LoginPage({ onSubmit }) {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onFormSubmit = data => {
        onSubmit(data)
    }

    return (
        <Container maxWidth="sm">
            <Box mt={10} p={4} boxShadow={3} borderRadius={2} bgcolor={"#fff"}>
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
                        />
                    </Box>

                    <Box mb={3}>
                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters."
                                }
                            })}
                            errors={!!errors.password}
                            helperText={errors.password?.message}
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
            </Box>
        </Container>
    )
}

export default LoginPage