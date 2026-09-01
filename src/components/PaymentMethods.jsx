import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/PaymentMethods.css";

function PaymentMethods() {
    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 1,
            type: "card",
            bankName: "HDFC Bank",
            last4: "4521",
            expiry: "08/28",
            isDefault: true,
        },
        {
            id: 2,
            type: "card",
            bankName: "SBI",
            last4: "7812",
            expiry: "11/27",
            isDefault: false,
        },
        {
            id: 3,
            type: "upi",
            upiId: "ishita@upi",
            isDefault: false,
        },
    ]);

    const [showModal, setShowModal] = useState(false);

    const [paymentType, setPaymentType] = useState("card");

    const [bankName, setBankName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [expiry, setExpiry] = useState("");
    const [upiId, setUpiId] = useState("");

    // =========================
    // SET DEFAULT
    // =========================

    const setDefaultPayment = (id) => {
        setPaymentMethods((prev) =>
            prev.map((payment) => ({
                ...payment,
                isDefault: payment.id === id,
            }))
        );
    };

    // =========================
    // REMOVE PAYMENT
    // =========================

    const removePayment = (id) => {
        const payment = paymentMethods.find(
            (item) => item.id === id
        );

        if (payment?.isDefault) {
            alert("Default payment method cannot be removed.");
            return;
        }

        setPaymentMethods((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    // =========================
    // ADD PAYMENT
    // =========================

    const handleAddPayment = (e) => {
        e.preventDefault();

        if (paymentType === "card") {
            if (
                !bankName ||
                !cardNumber ||
                !cardHolder ||
                !expiry
            ) {
                alert("Please fill all card details.");
                return;
            }

            const cleanCardNumber =
                cardNumber.replace(/\s/g, "");

            if (cleanCardNumber.length !== 16) {
                alert("Please enter a valid 16-digit card number.");
                return;
            }

            const newPayment = {
                id: Date.now(),
                type: "card",
                bankName: bankName,
                last4: cleanCardNumber.slice(-4),
                expiry: expiry,
                isDefault: paymentMethods.length === 0,
            };

            setPaymentMethods((prev) => [
                ...prev,
                newPayment,
            ]);
        } else {
            if (!upiId) {
                alert("Please enter your UPI ID.");
                return;
            }

            const newPayment = {
                id: Date.now(),
                type: "upi",
                upiId: upiId,
                isDefault: paymentMethods.length === 0,
            };

            setPaymentMethods((prev) => [
                ...prev,
                newPayment,
            ]);
        }

        // Reset
        setBankName("");
        setCardNumber("");
        setCardHolder("");
        setExpiry("");
        setUpiId("");
        setShowModal(false);

        alert("Payment method added successfully.");
    };

    return (
        <div className="payment-page">

            <div className="payment-container">

                {/* HEADER */}

                <div className="payment-header">

                    <div>
                        <Link
                            to="/profile"
                            className="back-link"
                        >
                            ← Back to Profile
                        </Link>

                        <h1>Payment Methods</h1>

                        <p>
                            Manage your saved payment methods
                        </p>
                    </div>

                    <button
                        className="add-payment-btn"
                        onClick={() => setShowModal(true)}
                    >
                        + Add New
                    </button>

                </div>


                {/* PAYMENT LIST */}

                <div className="payment-list">

                    {paymentMethods.length === 0 ? (
                        <div className="empty-payment">
                            <div>💳</div>
                            <h2>No Payment Methods</h2>
                            <p>
                                Add a card or UPI to make
                                checkout faster.
                            </p>

                            <button
                                onClick={() =>
                                    setShowModal(true)
                                }
                                className="add-payment-btn"
                            >
                                + Add Payment Method
                            </button>
                        </div>
                    ) : (
                        paymentMethods.map((payment) => (
                            <div
                                className={`payment-card ${payment.isDefault
                                    ? "default-card"
                                    : ""
                                    }`}
                                key={payment.id}
                            >

                                <div className="payment-icon">
                                    {payment.type === "upi"
                                        ? "🅿️"
                                        : "💳"}
                                </div>

                                <div className="payment-info">

                                    {payment.type === "card" ? (
                                        <>
                                            <h3>
                                                {payment.bankName}
                                            </h3>

                                            <p className="masked-card">
                                                •••• •••• ••••{" "}
                                                {payment.last4}
                                            </p>

                                            <p className="expiry">
                                                Expires{" "}
                                                {payment.expiry}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <h3>UPI</h3>

                                            <p>
                                                {payment.upiId}
                                            </p>
                                        </>
                                    )}

                                    {payment.isDefault && (
                                        <span className="default-badge">
                                            ✓ Default Payment Method
                                        </span>
                                    )}

                                </div>


                                <div className="payment-actions">

                                    {!payment.isDefault && (
                                        <button
                                            onClick={() =>
                                                setDefaultPayment(
                                                    payment.id
                                                )
                                            }
                                            className="default-btn"
                                        >
                                            Set as Default
                                        </button>
                                    )}

                                    {!payment.isDefault && (
                                        <button
                                            onClick={() =>
                                                removePayment(
                                                    payment.id
                                                )
                                            }
                                            className="remove-btn"
                                        >
                                            Remove
                                        </button>
                                    )}

                                </div>

                            </div>
                        ))
                    )}

                </div>

            </div>


            {/* ADD PAYMENT MODAL */}

            {showModal && (
                <div className="modal-overlay">

                    <div className="payment-modal">

                        <button
                            className="modal-close"
                            onClick={() =>
                                setShowModal(false)
                            }
                        >
                            ×
                        </button>

                        <h2>Add Payment Method</h2>

                        <div className="payment-tabs">

                            <button
                                className={
                                    paymentType === "card"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setPaymentType("card")
                                }
                            >
                                💳 Card
                            </button>

                            <button
                                className={
                                    paymentType === "upi"
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    setPaymentType("upi")
                                }
                            >
                                🅿️ UPI
                            </button>

                        </div>


                        <form onSubmit={handleAddPayment}>

                            {paymentType === "card" ? (
                                <>
                                    <label>
                                        Bank Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="HDFC Bank"
                                        value={bankName}
                                        onChange={(e) =>
                                            setBankName(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <label>
                                        Card Number
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                        value={cardNumber}
                                        onChange={(e) =>
                                            setCardNumber(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <label>
                                        Card Holder Name
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={cardHolder}
                                        onChange={(e) =>
                                            setCardHolder(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <label>
                                        Expiry Date
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        value={expiry}
                                        onChange={(e) =>
                                            setExpiry(
                                                e.target.value
                                            )
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <label>
                                        UPI ID
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="example@upi"
                                        value={upiId}
                                        onChange={(e) =>
                                            setUpiId(
                                                e.target.value
                                            )
                                        }
                                    />
                                </>
                            )}

                            <button
                                type="submit"
                                className="save-payment-btn"
                            >
                                Add Payment Method
                            </button>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

export default PaymentMethods;
