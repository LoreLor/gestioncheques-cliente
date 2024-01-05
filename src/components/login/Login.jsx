import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {URL_AUTH} from "../../server/index";

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    Login.propTypes = {
        onLoginSuccess: PropTypes.func.isRequired,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URL_AUTH}/login`, {
                username,
                password,
            });
            const { token } = response.data;
            localStorage.setItem("token", token);
            console.log("Login exitoso:", response.data);

            onLoginSuccess(); // Llamamos a la función proporcionada por la prop onLoginSuccess
        } catch (err) {
            setError("Usuario o contraseña incorrectos");
            console.error("Error al iniciar sesión:", err);
        }
    };


    return (
        <div className="container">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Usuario</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;