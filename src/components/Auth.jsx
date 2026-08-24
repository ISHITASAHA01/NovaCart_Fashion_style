import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Auth.css";

function Auth() {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password || (!isLogin && !name)) {
            alert("Please fill all required fields.");
            return;
        }

        // Demo login
        const user = {
            name: name || "NovaCart User",
            email,
        };

        localStorage.setItem("novacartUser", JSON.stringify(user));

        alert(isLogin ? "Login successful 🎉" : "Account created 🎉");

        navigate("/profile");
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-logo">
                    ✦ <span>Nova<span>Cart</span></span>
                </div>

                <h1>
                    {isLogin ? "Welcome Back!" : "Create Account"}
                </h1>

                <p className="auth-subtitle">
                    {isLogin
                        ? "Login to continue shopping"
                        : "Join NovaCart and start shopping"}
                </p>

                <form onSubmit={handleSubmit}>

                    {!isLogin && (
                        <div className="input-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="auth-submit" type="submit">
                        {isLogin ? "Login" : "Create Account"}
                    </button>

                </form>

                <div className="divider">
                    <span>OR CONTINUE WITH</span>
                </div>

                <div className="social-buttons">

                    <button
                        type="button"
                        onClick={() => alert("Google login setup coming next")}
                    >
                        <FcGoogle size={22} />
                        <span>Google</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => alert("Facebook login setup coming next")}
                    >
                        <FaFacebook size={22} color="#1877F2" />
                        <span>Facebook</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => alert("Instagram login setup coming next")}
                    >
                        <FaInstagram size={22} color="#E4405F" />
                        <span>Instagram</span>
                    </button>

                </div>
                <p className="switch-auth">
                    {isLogin
                        ? "Don't have an account?"
                        : "Already have an account?"}

                    <button
                        type="button"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? " Sign Up" : " Login"}
                    </button>
                </p>

            </div>
        </div>
    );
}

export default Auth;