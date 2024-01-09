import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
//import ChecksTable from "../table/ChecksTable";
import Login from "../login/Login";
import Sidebar from "../sidebar/Sidebar";
import "./Home.css";

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

    const user = localStorage.getItem("token");
    useEffect(() => {
        setIsAuthenticated(!!user);
    }, []);

    const handleLoginSuccess = () => {
        if(user){
            setIsAuthenticated(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    return (
        <div className="container pt-3">
            <Navbar isAuthenticated={() => isAuthenticated} onLogout={handleLogout} />
            
            {isAuthenticated ? <Sidebar /> : <Login onLoginSuccess={handleLoginSuccess} />}
            {/* // {isAuthenticated ? <ChecksTable /> : <p>Not found </p>} */}
        </div>
    );
};

export default Home;



