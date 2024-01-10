
// Login.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/checks";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = localStorage.getItem("token");
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setInput({
            ...input,
            [name]:value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(error === null 
            && input.username !== ""
            && input.password !== ""
        ){
            let response;
            try {
                response = await dispatch(login(input));
                
                if (response.token.status === 200) {
                    setInput({
                        username: "",
                        password: "",
                    });
                    navigate("/login");
                }
            } catch (err) {
                setError("Usuario o contraseña incorrectos");
                console.error("Error al iniciar sesión:", err);
            }
        }

    };

    useEffect(() => {
        if (user) navigate("/home");
    }, [user]);



    return (
        <div className="d-flex flex-row justify-content-center">
            <div className="card p-2" style={{ maxWidth: "20%" }}>
                <img
                    src="https://static.vecteezy.com/system/resources/previews/002/713/427/large_2x/bank-cheque-book-vector.jpg"
                    alt="cheque"
                />
            </div>
            <div className="card p-2">
                <h2 className="card-header">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit} className="card-body form p-2">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Usuario
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            id="username"
                            value={input.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};



export default Login;
