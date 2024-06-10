import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) =>{
        e.preventDefault();

        const data = {
            username: username,
            password: password
        };

        axios.post("http://localhost:8080/auth/login",data)
            .then(function(response){
                login(response.data);
                navigate("/");
            })
            .catch(function (error){
                console.log(error);
            })
    }

    return (
        <div class="d-flex justify-content-center align-items-center vh-100">

            <div>

                <h1>Login</h1>
                {/* <form onSubmit={handleLogin}>
                    <label>
                        Username: 
                        <input type="username" name="username" onChange={(e) => {
                            setUsername(e.target.value);
                        }}></input>
                    </label>
                    <label>
                        Password: 
                        <input type="password" name="password" onChange={(e) => {
                            setpassword(e.target.value);
                        }}></input>
                    </label>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form> */}
                
                <form onSubmit={handleLogin}>
                    <div class="mb-3">
                        <label for="Username" class="form-label">Username</label>
                        <input type="username" name="username" onChange={(e) => {
                            setUsername(e.target.value);
                        }}></input>
                    </div>
                    <div class="mb-3">
                        <label for="Password" class="form-label">Password</label>
                        <input type="password" name="password" onChange={(e) => {
                            setpassword(e.target.value);
                        }}></input>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>

            </div>

        </div>
    );
}

export default LoginPage;