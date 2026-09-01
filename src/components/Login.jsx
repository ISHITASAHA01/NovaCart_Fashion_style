import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter email and password.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "https://novacart-oeq5.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Login failed.");
                return;
            }

            // Save logged-in user
            const loggedInUser = {
                fullName:
                    data.user?.fullName ||
                    data.user?.name ||
                    email.split("@")[0],

                email:
                    data.user?.email ||
                    email,
            };

            localStorage.setItem(
                "novaUser",
                JSON.stringify(loggedInUser)
            );

            // Save token
            if (data.token) {
                localStorage.setItem("token", data.token);
            }

            // Go to profile after successful login
            navigate("/profile");

        } catch (error) {
            console.error("Login error:", error);
            alert("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                {/* Back Link */}
                <Link to="/" className="back-link">
                    ← Back to Home
                </Link>

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

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <div className="or-divider">
                    <span>OR</span>
                </div>

                <div className="social-login">

                    <button type="button" className="google-btn">
                        🔴 Continue with Google
                    </button>

                    <button type="button" className="facebook-btn">
                        🔵 Continue with Facebook
                    </button>

                    <button type="button" className="instagram-btn">
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
