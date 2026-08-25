// import { useLocation, useNavigate } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import "../css/TrackOrder.css";

function TrackOrder() {
    const navigate = useNavigate();
    // const location = useLocation();
    // const order = location.state?.order;

    const { orderId } = useParams();
    const orders =
        JSON.parse(localStorage.getItem("novaOrders")) || [];
    const order = orders.find(
        (item) => item.id === orderId
    );

    if (!order) {
        return (
            <main className="track-page">
                <div className="track-empty">
                    <h2>Order not found</h2>
                    <p>Please open Track Order from your order details.</p>

                    <button onClick={() => navigate("/")}>
                        Continue Shopping
                    </button>
                </div>
            </main>
        );
    }

    const steps = [
        {
            status: "placed",
            label: "Order Placed",
            icon: "🛒",
        },
        {
            status: "confirmed",
            label: "Order Confirmed",
            icon: "✓",
        },
        {
            status: "shipped",
            label: "Shipped",
            icon: "📦",
        },
        {
            status: "out-for-delivery",
            label: "Out for Delivery",
            icon: "🚚",
        },
        {
            status: "delivered",
            label: "Delivered",
            icon: "🏠",
        },
    ];

    const currentIndex = steps.findIndex(
        (step) => step.status === order.status
    );

    return (
        <main className="track-page">

            <div className="track-header">
                <div>
                    <h1>Track Order</h1>
                    <p>Order ID: {order.id}</p>
                </div>

                <button
                    className="close-btn"
                    onClick={() => navigate("/")}
                >
                    ×
                </button>
            </div>

            {/* ORDER SUMMARY */}

            <section className="track-card">

                <div className="order-summary">
                    <div>
                        <span>Order Date</span>

                        <strong>
                            {new Date(order.createdAt).toLocaleString("en-IN")}
                        </strong>
                    </div>

                    <div>
                        <span>Total Amount</span>

                        <strong>
                            ₹{order.total.toLocaleString("en-IN")}
                        </strong>
                    </div>

                    <div>
                        <span>Items</span>

                        <strong>
                            {order.items.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                            )}
                        </strong>
                    </div>
                </div>

            </section>

            {/* TRACKING */}

            <section className="track-card">

                <h2>Delivery Status</h2>

                <div className="tracking">

                    {steps.map((step, index) => {

                        const completed =
                            index <= currentIndex;

                        return (
                            <div
                                className={`tracking-step ${completed ? "completed" : ""
                                    }`}
                                key={step.status}
                            >

                                <div className="tracking-icon">
                                    {step.icon}
                                </div>

                                <div className="tracking-info">

                                    <strong>
                                        {step.label}
                                    </strong>

                                    {completed && (
                                        <span>
                                            Completed
                                        </span>
                                    )}

                                </div>

                            </div>
                        );
                    })}

                </div>

            </section>

            {/* PRODUCTS */}

            <section className="track-card">

                <h2>Order Items</h2>

                {order.items.map((item) => (

                    <div
                        className="track-product"
                        key={item.id}
                    >

                        <img
                            src={item.thumbnail}
                            alt={item.title}
                        />

                        <div>
                            <h3>{item.title}</h3>

                            <p>
                                Quantity: {item.quantity}
                            </p>

                            <strong>
                                ₹
                                {Math.round(
                                    item.price * 83
                                ).toLocaleString("en-IN")}
                            </strong>
                        </div>

                    </div>

                ))}

            </section>

            <button
                className="continue-btn"
                onClick={() => navigate("/")}
            >
                Continue Shopping
            </button>

        </main>
    );
}

export default TrackOrder;