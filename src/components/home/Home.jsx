import { useState } from "react";
import ModalAdd from "../modals/ModalAdd";
import ChecksTable from "../table/ChecksTable";
import Login from "../login/Login";

const Home = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    return (
        <div className="container pt-3">
            {!isAuthenticated && <Login onLoginSuccess={handleLoginSuccess} />}
            {isAuthenticated && <ModalAdd />}
            {isAuthenticated && <ChecksTable />}
        </div>
    );
};

export default Home;

