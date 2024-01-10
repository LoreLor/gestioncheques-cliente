// Home.jsx
import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Login from "../login/Login";
import Sidebar from "../sidebar/Sidebar";
import "./Home.css";
import { useSelector } from "react-redux";

const Home = () => {
    const user = useSelector((state) => state.login);
    const token = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);

    useEffect(() => {
        if (user) {
            setIsAuthenticated(token);
        }
    }, [token]);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <div className="container-fluid pt-3">
            {isAuthenticated ? (
                <>
                    <Navbar isAuthenticated={() => isAuthenticated} onLogout={handleLogout} />
                    <Sidebar />
                </>
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
};

export default Home;
