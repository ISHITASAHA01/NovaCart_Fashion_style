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
                    EDIT MODE
                ========================= */}

                {isEditing ? (

                    <div className="profile-edit-form">

                        <label>Name</label>

                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />


                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />


                        <label>Age</label>

                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                        />


                        <label>Gender</label>

                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">
                                Select Gender
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


                        <label>Address</label>

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            rows="3"
                        />


                        <div className="edit-buttons">

                            <button
                                className="save-btn"
                                onClick={handleSave}
                            >
                                ✓ Save Changes
                            </button>

                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    setFormData(user);
                                    setIsEditing(false);
                                }}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                ) : (

                    /* =========================
                       PROFILE VIEW
                    ========================= */

                    <div className="profile-info">

                        <div>
                            <span>👤</span>

                            <div>
                                <small>Name</small>
                                <b>{user.name}</b>
                            </div>
                        </div>


                        <div>
                            <span>📧</span>

                            <div>
                                <small>Email</small>
                                <b>{user.email}</b>
                            </div>
                        </div>


                        <div>
                            <span>🎂</span>

                            <div>
                                <small>Age</small>
                                <b>{user.age}</b>
                            </div>
                        </div>


                        <div>
                            <span>⚧️</span>

                            <div>
                                <small>Gender</small>
                                <b>{user.gender}</b>
                            </div>
                        </div>


                        <div>
                            <span>📍</span>

                            <div>
                                <small>Address</small>
                                <b>{user.address}</b>
                            </div>
                        </div>

                    </div>

                )}


                {/* =========================
                    PROFILE ACTIONS
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