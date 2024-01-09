import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/checks";
import { useNavigate } from "react-router-dom";



const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await dispatch(login(username, password));
            console.log(response);
    
            if (response && response.token) {
                const token = response.token;
    
                if (token) {
                    localStorage.setItem("token", token);
                    console.log("Login exitoso. Token guardado:", token);
                    
                    navigate("/home");
                } else {
                    setError("Token no encontrado en la respuesta");
                }
            } else {
                setError("Error al iniciar sesión: Respuesta incorrecta");
            }
        } catch (err) {
            setError("Usuario o contraseña incorrectos");
            console.error("Error al iniciar sesión:", err);
        }
    };
    

    Login.propTypes = {
        onLoginSuccess: PropTypes.func.isRequired,
    };

    return (
        <div className="container">
            <h2>Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={ handleSubmit }>
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