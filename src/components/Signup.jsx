import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");

    // =========================
    // CALCULATE AGE
    // =========================

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();

        let age =
            today.getFullYear() -
            birthDate.getFullYear();

        const monthDifference =
            today.getMonth() -
            birthDate.getMonth();

        if (
            monthDifference < 0 ||
            (
                monthDifference === 0 &&
                today.getDate() < birthDate.getDate()
            )
        ) {
            age--;
        }

        return age;
    };

    // =========================
    // SIGNUP
    // =========================

    const handleSignup = (e) => {
        e.preventDefault();

        if (
            !name ||
            !email ||
            !password ||
            !dateOfBirth ||
            !gender ||
            !address
        ) {
            alert("Please fill all required fields.");
            return;
        }

        const age = calculateAge(dateOfBirth);

        if (age < 13) {
            alert("You must be at least 13 years old.");
            return;
        }

        const user = {
            name,
            email,
            password,
            dateOfBirth,
            age,
            gender,
            address,
            image: "https://i.pravatar.cc/150?img=12",
        };

        localStorage.setItem(
            "novaUser",
            JSON.stringify(user)
        );

        navigate("/profile");
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-logo">
                    ✦ <span>Nova<span>Cart</span></span>
                </div>

                <h1>Create Account ✨</h1>

                <p className="auth-subtitle">
                    Join NovaCart and start shopping
                </p>

                <form onSubmit={handleSignup}>

                    {/* NAME */}

                    <label>Full Name *</label>

                    <input
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />


                    {/* EMAIL */}

                    <label>Email *</label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    {/* PASSWORD */}

                    <label>Password *</label>

                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    {/* DATE OF BIRTH */}

                    <label>Date of Birth *</label>

                    <input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) =>
                            setDateOfBirth(e.target.value)
                        }
                        max={
                            new Date()
                                .toISOString()
                                .split("T")[0]
                        }
                        required
                    />


                    {/* GENDER */}

                    <label>Gender *</label>

                    <select
                        value={gender}
                        onChange={(e) =>
                            setGender(e.target.value)
                        }
                        required
                    >
                        <option value="">
                            Select gender
                        </option>

                        <option value="Female">
                            Female
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Other">
                            Other
                        </option>

                        <option value="Prefer not to say">
                            Prefer not to say
                        </option>
                    </select>


                    {/* ADDRESS */}

                    <label>Address *</label>

                    <div className="signup-address-box">
                        <span>📍</span>

                        <textarea
                            placeholder="Enter your complete address"
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)
                            }
                            rows="3"
                            required
                        />
                    </div>


                    {/* SUBMIT */}
                    <button
                        type="submit"
                        className="auth-submit"
                    >
                        Create Account
                    </button>

                </form>


                <p className="signup-text">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Signup;
