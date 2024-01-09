import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import ChecksTable from "../table/ChecksTable";
import Login from "../login/Login";

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        const user = localStorage.getItem("token");
        setIsAuthenticated(!!user);
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <div className="container pt-3">
            <Navbar isAuthenticated={() => isAuthenticated} onLogout={handleLogout} />

            {isAuthenticated ? <ChecksTable /> : <Login onLoginSuccess={handleLoginSuccess} />}
        </div>
    );
};

export default Home;



