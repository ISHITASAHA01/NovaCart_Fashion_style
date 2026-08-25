import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/MyOrders.css";

function MyOrders() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState(
        () =>
            JSON.parse(
                localStorage.getItem("novaOrders")
            ) || []
    );

    const [cancelOrderId, setCancelOrderId] =
        useState(null);

    const [cancelReason, setCancelReason] =
        useState("");

    const [otherReason, setOtherReason] =
        useState("");

    const cancelReasons = [
        "Changed my mind",
        "Ordered by mistake",
        "Found a better price",
        "Product no longer needed",
        "Delivery taking too long",
        "Product information was incorrect",
        "Other",
    ];

    /* =========================
       OPEN CANCEL MODAL
    ========================= */

    const openCancelModal = (orderId) => {
        setCancelOrderId(orderId);
        setCancelReason("");
        setOtherReason("");
    };


    /* =========================
       CLOSE CANCEL MODAL
    ========================= */

    const closeCancelModal = () => {
        setCancelOrderId(null);
        setCancelReason("");
        setOtherReason("");
    };


    /* =========================
       CONFIRM CANCEL
    ========================= */

    const confirmCancel = () => {

        if (!cancelReason) {
            alert("Please select a cancellation reason.");
            return;
        }

        if (
            cancelReason === "Other" &&
            !otherReason.trim()
        ) {
            alert("Please enter your reason.");
            return;
        }

        const finalReason =
            cancelReason === "Other"
                ? otherReason.trim()
                : cancelReason;


        const updatedOrders = orders.map(
            (order) =>
                order.id === cancelOrderId
                    ? {
                        ...order,
                        status: "cancelled",

                        cancellationReason:
                            finalReason,

                        cancelledAt:
                            new Date().toISOString(),
                    }
                    : order
        );


        setOrders(updatedOrders);

        localStorage.setItem(
            "novaOrders",
            JSON.stringify(updatedOrders)
        );

        closeCancelModal();
    };

    const handleDelete = (orderId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to remove this order from your history?"
        );

        if (!confirmDelete) {
            return;
        }

        const updatedOrders = orders.filter(
            (order) => order.id !== orderId
        );

        localStorage.setItem(
            "novaOrders",
            JSON.stringify(updatedOrders)
        );

        window.location.reload();
    };

    return (
        <main className="my-orders-page">

            {/* =========================
                HEADER
            ========================= */}

            <div className="orders-header">

                <div>
                    <h1>My Orders</h1>

                    <p>
                        View and manage your orders
                    </p>
                </div>

                <button
                    onClick={() => navigate("/")}
                >
                    Continue Shopping
                </button>

            </div>


            {/* =========================
                EMPTY
            ========================= */}

            {orders.length === 0 ? (

                <div className="orders-empty">

                    <div className="empty-icon">
                        📦
                    </div>

                    <h2>No Orders Yet</h2>

                    <p>
                        You haven't placed any orders yet.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                    >
                        Start Shopping
                    </button>

                </div>

            ) : (

                <div className="orders-list">

                    {orders
                        .slice()
                        .reverse()
                        .map((order) => (

                            <section
                                className="order-card"
                                key={order.id}
                            >

                                {/* =========================
                                    ORDER HEADER
                                ========================= */}

                                <div className="order-card-header">

                                    <div>
                                        <span>Order ID</span>

                                        <strong>
                                            {order.id}
                                        </strong>
                                    </div>


                                    <div>
                                        <span>
                                            Order Date
                                        </span>

                                        <strong>
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString(
                                                "en-IN"
                                            )}
                                        </strong>
                                    </div>


                                    <div>
                                        <span>Status</span>

                                        <strong
                                            className={`order-status ${order.status}`}
                                        >
                                            {order.status
                                                .replaceAll(
                                                    "-",
                                                    " "
                                                )
                                                .toUpperCase()}
                                        </strong>
                                    </div>

                                </div>


                                {/* =========================
                                    PRODUCTS
                                ========================= */}

                                <div className="order-products">

                                    {order.items.map(
                                        (item) => (

                                            <div
                                                className="order-product"
                                                key={item.id}
                                            >

                                                <img
                                                    src={
                                                        item.thumbnail
                                                    }
                                                    alt={
                                                        item.title
                                                    }
                                                />


                                                <div className="order-product-info">

                                                    <h3>
                                                        {
                                                            item.title
                                                        }
                                                    </h3>

                                                    <p>
                                                        Quantity:{" "}
                                                        {
                                                            item.quantity
                                                        }
                                                    </p>

                                                    <strong>
                                                        ₹
                                                        {Math.round(
                                                            item.price *
                                                            83
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </strong>

                                                </div>

                                            </div>

                                        )
                                    )}

                                </div>


                                {/* =========================
                                    CANCELLATION REASON
                                ========================= */}

                                {order.status ===
                                    "cancelled" &&
                                    order.cancellationReason && (

                                        <div className="cancellation-info">

                                            <strong>
                                                Cancellation reason:
                                            </strong>

                                            <span>
                                                {
                                                    order.cancellationReason
                                                }
                                            </span>

                                        </div>

                                    )}


                                {/* =========================
                                    FOOTER
                                ========================= */}

                                <div className="order-card-footer">

                                    <div>
                                        <span>
                                            Total Amount
                                        </span>

                                        <strong>
                                            ₹
                                            {order.total.toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>
                                    </div>


                                    <div className="order-actions">
                                        {order.status !== "cancelled" ? (
                                            <>
                                                <button
                                                    className="track-order-btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `/orders/${order.id}`,
                                                            {
                                                                state: {
                                                                    order,
                                                                },
                                                            }
                                                        )
                                                    }
                                                >
                                                    🚚 Track Order
                                                </button>
                                                <button
                                                    className="cancel-order-btn"
                                                    onClick={() =>
                                                        handleCancel(order.id)
                                                    }
                                                >
                                                    Cancel Order
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className="delete-order-btn"
                                                onClick={() =>
                                                    handleDelete(order.id)
                                                }
                                            >
                                                🗑️ Delete History
                                            </button>
                                        )}
                                    </div>
                                </div>

                            </section>

                        ))}

                </div>

            )}


            {/* =========================
                CANCEL MODAL
            ========================= */}

            {cancelOrderId && (

                <div className="cancel-modal-overlay">

                    <div className="cancel-modal">

                        <button
                            className="cancel-modal-close"
                            onClick={closeCancelModal}
                        >
                            ×
                        </button>


                        <div className="cancel-modal-icon">
                            ⚠️
                        </div>


                        <h2>
                            Cancel Order?
                        </h2>


                        <p>
                            Please tell us why you want
                            to cancel this order.
                        </p>


                        <div className="cancel-reasons">

                            {cancelReasons.map(
                                (reason) => (

                                    <label
                                        key={reason}
                                        className={
                                            cancelReason ===
                                                reason
                                                ? "selected"
                                                : ""
                                        }
                                    >

                                        <input
                                            type="radio"
                                            name="cancelReason"
                                            value={reason}
                                            checked={
                                                cancelReason ===
                                                reason
                                            }
                                            onChange={(e) =>
                                                setCancelReason(
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <span>
                                            {reason}
                                        </span>

                                    </label>

                                )
                            )}

                        </div>


                        {/* OTHER REASON */}

                        {cancelReason ===
                            "Other" && (

                                <textarea
                                    className="other-reason-input"
                                    placeholder="Please tell us your reason..."
                                    value={otherReason}
                                    onChange={(e) =>
                                        setOtherReason(
                                            e.target.value
                                        )
                                    }
                                    rows="3"
                                />

                            )}


                        <div className="cancel-modal-actions">

                            <button
                                className="keep-order-btn"
                                onClick={closeCancelModal}
                            >
                                Keep Order
                            </button>


                            <button
                                className="confirm-cancel-btn"
                                onClick={confirmCancel}
                            >
                                Cancel Order
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </main>
    );
}

export default MyOrders;