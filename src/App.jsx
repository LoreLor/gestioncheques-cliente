import Home from "./components/home/Home";
import Login from "./components/login/Login";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";



function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
