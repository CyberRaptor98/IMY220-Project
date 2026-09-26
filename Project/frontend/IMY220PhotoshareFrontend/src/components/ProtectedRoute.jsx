import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext.jsx";

function ProtectedRoute({ children }) {

    const { currentUser } = useUser();

    if (!currentUser) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;