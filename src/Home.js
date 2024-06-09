import { Link } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";

function Home() {

    const { isAuthenticated, logout } = useAuth();

    return (
        <div>
            <h1>Welcome to Home!</h1>

            <ul>
                <li>
                    <Link to="/users">Users</Link>
                </li>
                <li>
                    <Link to="/products">Products</Link>
                </li>
                <li>
                    <Link to="/categories">Categories</Link>
                </li>
                <li>
                    <Link to="/orders">Add to Cart</Link>
                </li>
            </ul>

            {isAuthenticated &&
                <button className="btn btn-primary" onClick={logout}>Logout</button>
            }
            
        </div>
    )
}

export default Home;