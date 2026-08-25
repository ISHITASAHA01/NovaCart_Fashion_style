import { useNavigate, useLocation } from "react-router-dom";
import "../css/OrderConfirmation.css";

function OrderConfirmation() {
    const navigate = useNavigate();
    const location = useLocation();

    const order = location.state?.order;

    if (!order) {
        return (
            <main className="order-confirm-page">
                <div className="order-confirm-card">
                    <h2>Order not found</h2>

                    <button
                        onClick={() => navigate("/")}
                    >
                        Continue Shopping
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="order-confirm-page">

            <div className="order-confirm-card">

                <button
                    className="order-close"
                    onClick={() => navigate("/")}
                >
                    ×
                </button>

                <div className="success-icon">
                    ✓
                </div>

                <h1>Order Confirmed!</h1>

                <p className="confirm-message">
                    Thank you for shopping with NovaCart.
                </p>

                <div className="order-number">
                    Order ID:
                    <strong>{order.id}</strong>
                </div>

                <div className="confirmation-details">

                    <div>
                        <span>Items</span>
                        <strong>
                            {order.items.reduce(
                                (sum, item) =>
                                    sum + item.quantity,
                                0
                            )}
                        </strong>
                    </div>

                    <div>
                        <span>Total Amount</span>
                        <strong>
                            ₹{order.total.toLocaleString("en-IN")}
                        </strong>
                    </div>

                    <div>
                        <span>Delivery</span>
                        <strong className="free">
                            FREE
                        </strong>
                    </div>

                </div>

                <div className="confirmation-buttons">

                    <button
                        className="track-btn"
                        onClick={() =>
                            navigate(`/orders/${order.id}`)
                        }
                    >
                        Track Order
                    </button>

                    <button
                        className="continue-btn"
                        onClick={() => navigate("/")}
                    >
                        Continue Shopping
                    </button>
                    

                </div>

            </div>

        </main>
    );
}

export default OrderConfirmation;