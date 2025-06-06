import { Navigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token || token === "null" || token === "undefined") {
        // console.log("No valid token. Redirecting to login...");
        // console.log(token);
        return <Navigate to="/login" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);

        // Check if the token is expired
        if (decodedToken.exp * 1000 < Date.now()) {
            // console.log("Token expired. Redirecting to login...");
            return <Navigate to="/login" replace />;
        }

        return children;

    } catch {
        // console.log("Invalid token. Redirecting to login...");
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;

