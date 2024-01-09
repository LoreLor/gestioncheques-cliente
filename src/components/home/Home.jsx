import { useState } from "react";
import ChecksTable from "../checksTable/ChecksTable";
import Login from "../login/Login";

const Home = () => {
    const user = localStorage.getItem("token");
    const [isAuthenticated, setIsAuthenticated] = useState(user? true: false);
    

    const handleLoginSuccess = () => {
        if(user){
            setIsAuthenticated(true);
        }
    };

    return (
        <div className="container pt-3">
            {!isAuthenticated ? <Login onLoginSuccess={handleLoginSuccess} /> : <ChecksTable />}
        </div>
    );
};

export default Home;

