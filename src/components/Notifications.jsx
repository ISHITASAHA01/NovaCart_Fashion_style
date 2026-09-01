import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Notifications.css";

function Notifications() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            category: "order",
            icon: "📦",
            title: "Order Delivered",
            message:
                "Your order #NC12568 has been delivered.",
            time: "2 min ago",
            isRead: false,
        },
        {
            id: 2,
            category: "order",
            icon: "🟢",
            title: "Order Confirmed",
            message:
                "Your order has been successfully placed.",
            time: "1 hour ago",
            isRead: false,
        },
        {
            id: 3,
            category: "offer",
            icon: "🏷️",
            title: "Special Offer",
            message:
                "Get exciting deals on your favorite products.",
            time: "Yesterday",
            isRead: true,
        },
        {
            id: 4,
            category: "payment",
            icon: "💳",
            title: "Payment Successful",
            message:
                "Your payment was successfully completed.",
            time: "2 days ago",
            isRead: true,
        },
        {
            id: 5,
            category: "payment",
            icon: "💰",
            title: "Refund Completed",
            message:
                "Your refund has been successfully completed.",
            time: "3 days ago",
            isRead: true,
        },
    ]);

    // =========================
    // MARK ONE AS READ
    // =========================

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id
                    ? {
                        ...notification,
                        isRead: true,
                    }
                    : notification
            )
        );
    };

    // =========================
    // MARK ALL AS READ
    // =========================

    const markAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((notification) => ({
                ...notification,
                isRead: true,
            }))
        );
    };

    // =========================
    // DELETE
    // =========================

    const deleteNotification = (id) => {
        setNotifications((prev) =>
            prev.filter(
                (notification) =>
                    notification.id !== id
            )
        );
    };

    const unreadCount = notifications.filter(
        (notification) => !notification.isRead
    ).length;

    return (
        <div className="notifications-page">

            <div className="notifications-container">

                {/* HEADER */}

                <div className="notifications-header">

                    <div>
                        <Link
                            to="/profile"
                            className="back-link"
                        >
                            ← Back to Profile
                        </Link>

                        <h1>Notifications</h1>

                        <p>
                            Stay updated with your orders
                            and offers
                        </p>
                    </div>

                    {unreadCount > 0 && (
                        <button
                            className="mark-all-btn"
                            onClick={markAllAsRead}
                        >
                            ✓ Mark all read
                        </button>
                    )}

                </div>


                {/* NOTIFICATION COUNT */}

                {unreadCount > 0 && (
                    <div className="notification-count">
                        You have{" "}
                        <strong>{unreadCount}</strong>{" "}
                        unread notification
                        {unreadCount > 1 ? "s" : ""}.
                    </div>
                )}


                {/* NOTIFICATION LIST */}

                <div className="notification-list">

                    {notifications.length === 0 ? (
                        <div className="empty-notifications">
                            <div>🔔</div>

                            <h2>
                                No Notifications
                            </h2>

                            <p>
                                You're all caught up!
                            </p>
                        </div>
                    ) : (
                        notifications.map(
                            (notification) => (
                                <div
                                    key={notification.id}
                                    className={`notification-item ${!notification.isRead
                                        ? "unread"
                                        : ""
                                        }`}
                                    onClick={() =>
                                        markAsRead(
                                            notification.id
                                        )
                                    }
                                >

                                    <div className="notification-icon">
                                        {notification.icon}
                                    </div>

                                    <div className="notification-content">

                                        <div className="notification-title-row">

                                            <h3>
                                                {
                                                    notification.title
                                                }
                                            </h3>

                                            <span>
                                                {
                                                    notification.time
                                                }
                                            </span>

                                        </div>

                                        <p>
                                            {
                                                notification.message
                                            }
                                        </p>

                                        <div className="notification-bottom">

                                            <span
                                                className={`category-badge ${notification.category}`}
                                            >
                                                {
                                                    notification.category
                                                }
                                            </span>

                                            {!notification.isRead && (
                                                <button
                                                    onClick={(
                                                        e
                                                    ) => {
                                                        e.stopPropagation();

                                                        markAsRead(
                                                            notification.id
                                                        );
                                                    }}
                                                    className="read-btn"
                                                >
                                                    Mark as read
                                                </button>
                                            )}

                                            <button
                                                onClick={(
                                                    e
                                                ) => {
                                                    e.stopPropagation();

                                                    deleteNotification(
                                                        notification.id
                                                    );
                                                }}
                                                className="delete-btn"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                    {!notification.isRead && (
                                        <span className="unread-dot"></span>
                                    )}

                                </div>
                            )
                        )
                    )}

                </div>

            </div>

        </div>
    );
}

export default Notifications;
