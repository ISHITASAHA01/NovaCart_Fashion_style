import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiUser,
    FiEdit2,
    FiPackage,
    FiHeart,
    FiMapPin,
    FiCreditCard,
    FiBell,
    FiHelpCircle,
    FiLogOut,
    FiTrash2,
    FiCalendar,
    FiMail,
    FiPhone,
    FiCamera,
    FiShield,
    FiRotateCcw,
    FiTag,
    FiHeadphones,
    FiChevronRight,
    FiShoppingCart
} from "react-icons/fi";

import "../css/Profile.css";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [orders, setOrders] = useState([]);
    const calculateAge = (dob) => {
        if (!dob) return "";

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

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        dateOfBirth: "",
        age: "",
        gender: "",
        address: "",
    });



    /* =========================
       LOAD USER + ORDERS
    ========================= */
    useEffect(() => {

        const getProfile = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const response = await fetch(
                    "https://novacart-oeq5.onrender.com/api/auth/profile",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                console.log("PROFILE DATA:", data);

                if (!response.ok) {

                    localStorage.removeItem("token");
                    localStorage.removeItem("novaUser");

                    navigate("/login");
                    return;
                }

                const userData = data.user;

                console.log("USER DATA:", userData);

                // Date of Birth
                const dob = userData.dateOfBirth
                    ? userData.dateOfBirth.substring(0, 10)
                    : "";

                // Age
                const age = calculateAge(dob);

                // Final user object
                const formattedUser = {
                    ...userData,
                    dateOfBirth: dob,
                    age: age,
                };

                console.log("FINAL USER:", formattedUser);

                // Profile state
                setUser(formattedUser);

                // Form state
                setFormData({
                    name: formattedUser.fullName || "",
                    email: formattedUser.email || "",
                    mobile: formattedUser.mobileNumber || "",
                    dateOfBirth: formattedUser.dateOfBirth || "",
                    age: formattedUser.age || "",
                    gender: formattedUser.gender || "",
                    address: formattedUser.address || "",
                });

                // Keep novaUser in sync
                localStorage.setItem(
                    "novaUser",
                    JSON.stringify(formattedUser)
                );

            } catch (error) {

                console.error(
                    "Profile error:",
                    error
                );
            }
        };


        // Initial backend profile load
        getProfile();


        // =========================
        // LISTEN FOR USER UPDATE
        // =========================

        const handleUserChanged = () => {

            console.log(
                "novaUserChanged received"
            );

            // Backend se fresh verified data lao
            getProfile();
        };

        window.addEventListener(
            "novaUserChanged",
            handleUserChanged
        );


        // =========================
        // ORDERS
        // =========================

        const savedOrders =
            JSON.parse(
                localStorage.getItem("novaOrders")
            ) || [];

        setOrders(savedOrders);


        // =========================
        // CLEANUP
        // =========================

        return () => {

            window.removeEventListener(
                "novaUserChanged",
                handleUserChanged
            );

        };

    }, [navigate]);

    /* =========================
       INPUT CHANGE
    ========================= */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    };

    /* =========================
       SAVE PROFILE
    ========================= */

    const handleSave = () => {

        const updatedUser = {
            ...user,

            fullName: formData.name,
            email: formData.email,
            mobileNumber: formData.mobile,
            dateOfBirth: formData.dateOfBirth,
            age: calculateAge(formData.dateOfBirth),
            gender: formData.gender,
            address: formData.address,
        };

        // Local storage update
        localStorage.setItem(
            "novaUser",
            JSON.stringify(updatedUser)
        );

        // React state update
        setUser(updatedUser);

        setFormData({
            name: updatedUser.fullName || "",
            email: updatedUser.email || "",
            mobile: updatedUser.mobileNumber || "",
            dateOfBirth: updatedUser.dateOfBirth || "",
            age: updatedUser.age || "",
            gender: updatedUser.gender || "",
            address: updatedUser.address || "",
        });

        // Notify App.jsx / other components
        window.dispatchEvent(
            new Event("novaUserChanged")
        );

        setIsEditing(false);

        alert("Profile updated successfully! ✅");
    };

    /* =========================
       CANCEL EDIT
    ========================= */

    const handleCancel = () => {

        setFormData({
            name: user.fullName || "",
            email: user.email || "",
            mobile: user.mobileNumber || "",
            dateOfBirth: user.dateOfBirth || "",
            age: user.age || "",
            gender: user.gender || "",
            address: user.address || "",
        });

        setIsEditing(false);
    };
    /* =========================
       LOGOUT
    ========================= */

    const handleLogout = () => {
        localStorage.removeItem("novaUser");

        navigate("/login");
    };
    // token
    // const handleLogout = () => {
    //     localStorage.removeItem("novaUser");
    //     navigate("/signin");
    // };

    /* =========================
       DELETE ACCOUNT
    ========================= */

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

    /* =========================
       LOGIN CHECK
    ========================= */

    if (!user) {
        return (
            <div className="profile-page">
                <div className="cart-loader">
                    <div className="cart-running">
                        <span className="speed-line line-1"></span>
                        <span className="speed-line line-2"></span>
                        <span className="speed-line line-3"></span>

                        <FiShoppingCart className="cart-icon" /></div>

                    <div className="loading-track">
                        <div className="loading-bar"></div>
                    </div>
                </div>
            </div>
        );
    }

    /* =========================
       RECENT ORDER
    ========================= */

    const userOrders = orders
        .filter(
            (order) =>
                !user.email ||
                order.userEmail === user.email
        )
        .slice(-3)
        .reverse();

    const recentOrder = userOrders[0];

    const firstItem =
        recentOrder?.items?.[0];

    /* =========================
       FORMAT DATE
    ========================= */

    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    return (
        <div className="profile-page">

            <div className="profile-container">

                {/* =================================================
                    LEFT SIDEBAR
                ================================================= */}

                <aside className="profile-sidebar">

                    {/* PROFILE MINI CARD */}

                    <div className="sidebar-user">

                        <div className="sidebar-avatar">
                            <FiUser />
                        </div>

                        <h3>
                            Hi, {user?.fullName ? user.fullName.split(" ")[0] : "User"}
                        </h3>

                        <p>
                            Welcome back!
                        </p>

                    </div>


                    {/* SIDEBAR MENU */}

                    <div className="profile-menu">

                        <button className="active">
                            <FiUser />
                            <span>My Profile</span>
                        </button>

                        <button
                            onClick={() =>
                                navigate("/my-orders")
                            }
                        >
                            <FiPackage />
                            <span>My Orders</span>
                        </button>

                        <button
                            onClick={() =>
                                navigate("/wishlist")
                            }
                        >
                            <FiHeart />
                            <span>Wishlist</span>
                        </button>

                        <button>
                            <FiMapPin />
                            <span>My Addresses</span>
                        </button>


                        <button
                            onClick={() =>
                                navigate("/support")
                            }
                        >
                            <FiHelpCircle />
                            <span>Help & Support</span>
                        </button>

                        <button
                            className="logout-menu"
                            onClick={handleLogout}
                        >
                            <FiLogOut />
                            <span>Logout</span>
                        </button>

                    </div>

                </aside>


                {/* =================================================
                    RIGHT CONTENT
                ================================================= */}

                <main className="profile-main">

                    {/* PROFILE INFORMATION CARD */}

                    <section className="profile-info-card">

                        <div className="profile-card-header">

                            <div>
                                <h1>My Profile</h1>

                                <p>
                                    Manage your personal information
                                </p>
                            </div>

                            {!isEditing && (
                                <button
                                    className="edit-profile-btn"
                                    onClick={() =>
                                        setIsEditing(true)
                                    }
                                >
                                    <FiEdit2 />
                                    Edit Profile
                                </button>
                            )}

                        </div>


                        {/* =========================
                            EDIT MODE
                        ========================= */}

                        {isEditing ? (

                            <div className="profile-edit-form">

                                <div className="edit-field">
                                    <label>Full Name</label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>


                                <div className="edit-field">
                                    <label>Email</label>

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>


                                <div className="edit-field">
                                    <label>Mobile Number</label>

                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                    />
                                </div>


                                <div className="edit-field">
                                    <label>Date of Birth</label>

                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                    />
                                </div>


                                <div className="edit-field">
                                    <label>Gender</label>

                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Select Gender
                                        </option>

                                        <option value="Male">
                                            Male
                                        </option>

                                        <option value="Female">
                                            Female
                                        </option>

                                        <option value="Other">
                                            Other
                                        </option>
                                    </select>
                                </div>


                                <div className="edit-field full-width">
                                    <label>Address</label>

                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows="3"
                                    />
                                </div>


                                <div className="edit-buttons">

                                    <button
                                        className="save-btn"
                                        onClick={handleSave}
                                    >
                                        Save Changes
                                    </button>

                                    <button
                                        className="cancel-btn"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </div>

                        ) : (

                            /* =========================
                               NORMAL PROFILE VIEW
                            ========================= */

                            <div className="profile-details-layout">

                                {/* AVATAR */}

                                <div className="profile-big-avatar">

                                    <FiUser />

                                    <button
                                        className="camera-btn"
                                        title="Change profile photo"
                                    >
                                        <FiCamera />
                                    </button>

                                </div>


                                {/* DETAILS */}

                                <div className="profile-details">

                                    <div className="detail-item">

                                        <FiUser />

                                        <div>
                                            <small>
                                                Full Name
                                            </small>

                                            <strong>
                                                {user.fullName || "-"}

                                            </strong>
                                        </div>

                                    </div>


                                    <div className="detail-item">

                                        <FiCalendar />

                                        <div>
                                            <small>
                                                Age
                                            </small>

                                            <strong>
                                                {user.age
                                                    ? `${user.age} Years`
                                                    : "-"}
                                            </strong>
                                        </div>

                                    </div>


                                    <div className="detail-item">

                                        <FiMail />

                                        <div>
                                            <small>
                                                Email
                                            </small>

                                            <strong>
                                                {user.email || "-"}
                                            </strong>
                                        </div>

                                    </div>


                                    <div className="detail-item">

                                        <FiPhone />

                                        <div>
                                            <small>
                                                Mobile Number
                                            </small>

                                            <strong>
                                                {user.mobileNumber
                                                    ? `+91 ${user.mobileNumber}`
                                                    : "-"}

                                            </strong>
                                        </div>

                                    </div>


                                    <div className="detail-item">

                                        <FiCalendar />

                                        <div>
                                            <small>
                                                Date of Birth
                                            </small>

                                            <strong>
                                                {user.dateOfBirth || "-"}
                                            </strong>
                                        </div>

                                    </div>

                                    <div className="detail-item">

                                        <FiUser />

                                        <div>
                                            <small>
                                                Gender
                                            </small>

                                            <strong>
                                                {user.gender || "-"}
                                            </strong>
                                        </div>

                                    </div>



                                    <div className="detail-item">

                                        <FiMapPin />

                                        <div>
                                            <small>
                                                Address
                                            </small>

                                            <strong>
                                                {user.address || "-"}
                                            </strong>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        )}

                    </section>


                    {/* =================================================
                        BENEFITS ROW
                    ================================================= */}

                    <section className="profile-benefits">

                        <div className="benefit-item">

                            <div className="benefit-icon blue">
                                <FiShield />
                            </div>

                            <div>
                                <strong>
                                    Secure Shopping
                                </strong>

                                <p>
                                    Your data is safe with us
                                </p>
                            </div>

                        </div>


                        <div className="benefit-item">

                            <div className="benefit-icon green">
                                <FiRotateCcw />
                            </div>

                            <div>
                                <strong>
                                    Easy Returns
                                </strong>

                                <p>
                                    Hassle free returns
                                </p>
                            </div>

                        </div>


                        <div className="benefit-item">

                            <div className="benefit-icon pink">
                                <FiTag />
                            </div>

                            <div>
                                <strong>
                                    Best Deals
                                </strong>

                                <p>
                                    Get exclusive offers
                                </p>
                            </div>

                        </div>


                        <div className="benefit-item">

                            <div className="benefit-icon purple">
                                <FiHeadphones />
                            </div>

                            <div>
                                <strong>
                                    24/7 Support
                                </strong>

                                <p>
                                    We are here to help
                                </p>
                            </div>

                        </div>

                    </section>


                    {/* =================================================
                        RECENT ORDERS
                    ================================================= */}

                    <section className="recent-orders-card">

                        <div className="recent-orders-header">

                            <div>
                                <h2>
                                    Recent Orders
                                </h2>

                                <p>
                                    View and track your recent orders
                                </p>
                            </div>

                            <button
                                onClick={() =>
                                    navigate("/my-orders")
                                }
                            >
                                View All Orders
                                <FiChevronRight />
                            </button>

                        </div>


                        {recentOrder && firstItem ? (

                            <div className="recent-order-row">

                                <div className="recent-product">

                                    <div className="recent-product-image">

                                        <img
                                            src={
                                                firstItem.thumbnail ||
                                                firstItem.image
                                            }
                                            alt={
                                                firstItem.title
                                            }
                                        />

                                    </div>

                                    <div>

                                        <strong>
                                            {firstItem.title}
                                        </strong>

                                        <small>
                                            Order ID: #{recentOrder.id}
                                        </small>

                                    </div>

                                </div>


                                <div className="order-date">

                                    <strong>
                                        {formatDate(
                                            recentOrder.createdAt
                                        )}
                                    </strong>

                                    <small>
                                        Placed on
                                    </small>

                                </div>


                                <div className="order-total">

                                    <strong>
                                        ₹
                                        {Number(
                                            recentOrder.total || 0
                                        ).toLocaleString("en-IN")}
                                    </strong>

                                    <small>
                                        Total Amount
                                    </small>

                                </div>


                                <span
                                    className={`order-status ${recentOrder.status}`}
                                >
                                    {recentOrder.status ===
                                        "cancelled"
                                        ? "Cancelled"
                                        : recentOrder.status ===
                                            "delivered"
                                            ? "Delivered"
                                            : "Placed"}
                                </span>


                                <button
                                    className="view-details-btn"
                                    onClick={() =>
                                        navigate(
                                            `/orders/${recentOrder.id}`,
                                            {
                                                state: {
                                                    order: recentOrder,
                                                },
                                            }
                                        )
                                    }
                                >
                                    View Details
                                </button>

                            </div>

                        ) : (

                            <div className="no-orders">
                                <FiPackage />

                                <h3>
                                    No orders yet
                                </h3>

                                <p>
                                    Your recent orders will appear here.
                                </p>

                                <button
                                    onClick={() =>
                                        navigate("/")
                                    }
                                >
                                    Start Shopping
                                </button>
                            </div>

                        )}

                    </section>


                    {/* DELETE ACCOUNT */}

                    <button
                        className="delete-account-btn"
                        onClick={handleDelete}
                    >
                        <FiTrash2 />
                        Delete Account
                    </button>

                </main>

            </div>

        </div>
    );
}

export default Profile;