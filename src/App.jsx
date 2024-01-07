/* eslint-disable react-hooks/exhaustive-deps */
import Home from "./components/home/Home";
//import Login from "./components/login/Login";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";


function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Login />} /> 
                <Route path="/home" element={<Home />} />
            </Routes>
        </>
    );
}

export default App;
