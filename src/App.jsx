/* eslint-disable react-hooks/exhaustive-deps */
import Home from "./components/home/Home";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import "./index.css";

function App() {

    return (
        
        <>
            <Sidebar/>
            <Home />
        </>
    );
}

export default App;
