import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"

function SignUpPage() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log("Sucessfully signed up", data)
    }

    const password = watch("password")

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 6 }}>
                <Typography variant="h4" gutterBottom>
                    Sign Up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={2}>
                        <Grid xs={12}
                        >
                            <TextField
                                label="Full Name"
                                fullWidth
                                {...register("fullName", { required: "Name is required" })}
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                            />
                        </Grid>

                        <Grid xs={12}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                {...register("email", {
                                    required: "Email is required", pattern: {
                                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                        message: "Invalid email address",
                                    }
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        <Grid xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) => value === password || "Passwords do not match"
                                })}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />
                        </Grid>

                        <Grid xs={12}>
                            <TextField
                                label="Phone Number"
                                type="tel"
                                fullWidth
                                {...register("phone", {
                                    required: "Phone number is requried",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Phone number must be 10 digits",
                                    }
                                })}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        </Grid>

                        <Grid xs={12}>
                            <Button variant="contained" fullWidth type="submit">
                                Sign Up
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default SignUpPage