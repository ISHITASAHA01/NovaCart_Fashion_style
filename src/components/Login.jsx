import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        // Temporary login
        localStorage.setItem(
            "novaUser",
            JSON.stringify({
                name: email.split("@")[0],
                email: email,
            })
        );

        navigate("/profile");
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    ✦ <span>Nova<span>Cart</span></span>
                </div>

                <h1>Welcome Back 👋</h1>

                <p className="auth-subtitle">
                    Login to continue shopping
                </p>

                <form onSubmit={handleLogin}>

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="auth-submit">
                        Login
                    </button>

                </form>

                <div className="or-divider">
                    <span>OR</span>
                </div>

                <div className="social-login">

                    <button className="google-btn">
                        🔴 Continue with Google
                    </button>

                    <button className="facebook-btn">
                        🔵 Continue with Facebook
                    </button>

                    <button className="instagram-btn">
                        🟣 Continue with Instagram
                    </button>

                </div>

                <p className="signup-text">
                    Don't have an account?{" "}
                    <Link to="/signup">
                        Sign Up
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;