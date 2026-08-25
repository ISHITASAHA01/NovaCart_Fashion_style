import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dateOfBirth: "",
        age: "",
        gender: "",
        address: "",
    });


    useEffect(() => {
        const savedUser = localStorage.getItem("novaUser");

        if (savedUser) {
            const data = JSON.parse(savedUser);

            setUser(data);
            setFormData(data);
        }
    }, []);

    // EDIT INPUT CHANGE
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    // SAVE PROFILE
    const handleSave = () => {
        localStorage.setItem(
            "novaUser",
            JSON.stringify(formData)
        );

        setUser(formData);
        setIsEditing(false);

        alert("Profile updated successfully! ✅");
    };

    // LOGOUT
    const handleLogout = () => {
        localStorage.removeItem("novaUser");

        navigate("/login");
    };

    // DELETE ACCOUNT
    const handleDelete = () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account?"
        );

        if (!confirmDelete) {
            return;
        }

        localStorage.removeItem("novaUser");

        navigate("/login");
    };

    // USER NOT LOGGED IN
    if (!user) {
        return (
            <div className="profile-page">
                <div className="profile-card">

                    <h2>Please login first 🔐</h2>

                    <button
                        className="profile-home-btn"
                        onClick={() => navigate("/login")}
                    >
                        Go to Login
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">

            <div className="profile-card">

                {/* PROFILE IMAGE */}

                <div className="profile-avatar">
                    <img
                        src={
                            user.image ||
                            "https://t4.ftcdn.net/jpg/11/66/06/77/360_F_1166067709_2SooAuPWXp20XkGev7oOT7nuK1VThCsN.jpg"
                        }
                        alt="Profile"
                    />
                </div>


                <h1>My Profile</h1>

                <p>
                    Welcome to NovaCart, {user.name} 👋
                </p>


                {/* =========================
                    EDIT MODE PROFILE FORM
                ========================= */}

                {!isEditing && (
                    <div className="profile-actions">

                        <button
                            className="edit-profile-btn"
                            onClick={() =>
                                setIsEditing(true)
                            }
                        >
                            ✏️ Edit Profile
                        </button>

                        <button
                            className="my-orders-btn"
                            onClick={() => navigate("/my-orders")}
                        >
                            📦 My Orders
                        </button>

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            🚪 Logout
                        </button>

                        <button
                            className="delete-btn"
                            onClick={handleDelete}
                        >
                            🗑️ Delete Account
                        </button>

                    </div>
                )}

                {/* CONTINUE SHOPPING */}

                <button
                    className="profile-home-btn"
                    onClick={() => navigate("/")}
                >
                    ← Continue Shopping
                </button>

            </div>

        </div>
    );
}

export default Profile;