import { Route, Routes } from "react-router"
import SignUpPage from "../pages/SignUpPage"
import LoginPage from "../pages/LoginPage"
import ToDoLandingPage from "../pages/ToDoLandingPage"
import ForgotPasswordPage from "../pages/ForgotPasswordPage"
import ResetPasswordPage from "../pages/ResetPasswordPage"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<ToDoLandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
    )
}

export default AppRoutes