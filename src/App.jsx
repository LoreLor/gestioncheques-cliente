import Home from "./components/home/Home";
import Login from "./components/login/Login";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import "./index.css";



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
