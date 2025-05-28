import { Route, Routes } from "react-router"
import Register from "../pages/SignUpPage"
import Login from "../pages/LoginPage"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRoutes