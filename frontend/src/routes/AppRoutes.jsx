import { Route, Routes } from "react-router"
import SignUpPage from "../pages/SignUpPage"
import LoginPage from "../pages/LoginPage"
import LandingPage from "../pages/LandingPage"
import Board from "../pages/Board"
import ForgotPasswordPage from "../pages/ForgotPasswordPage"
import ResetPasswordPage from "../pages/ResetPasswordPage"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/dashboard" element={<Board />} />
        </Routes>
    )
}

export default AppRoutes