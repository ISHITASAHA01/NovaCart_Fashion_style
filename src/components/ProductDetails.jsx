
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/ProductDetails.css";

function ProductDetails({
    products,
    addToCart,
    toggleWishlist,
    wishlist,
}) {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = products.find(
        (item) => item.id === Number(id)
    );

    // =========================
    // REVIEW STATES
    // =========================

    const [reviews, setReviews] = useState([]);

    const [selectedRating, setSelectedRating] =
        useState(0);

    const [reviewText, setReviewText] =
        useState("");

    const [reviewMessage, setReviewMessage] =
        useState("");

    // =========================
    // LOAD REVIEWS
    // =========================

    useEffect(() => {
        if (!product) return;

        const savedReviews =
            JSON.parse(
                localStorage.getItem("novaProductReviews")
            ) || {};

        setReviews(
            savedReviews[product.id] || []
        );
    }, [product]);

    // =========================
    // USER
    // =========================

    const user =
        JSON.parse(
            localStorage.getItem("novaUser")
        );

    // =========================
    // SUBMIT REVIEW
    // =========================

    const handleSubmitReview = () => {

        if (!user) {
            setReviewMessage(
                "Please login to write a review."
            );
            return;
        }

        if (selectedRating === 0) {
            setReviewMessage(
                "Please select a rating."
            );
            return;
        }

        if (!reviewText.trim()) {
            setReviewMessage(
                "Please write your review."
            );
            return;
        }

        const newReview = {
            id: Date.now(),
            userId: user.email,
            userName: user.name || "NovaCart User",
            rating: selectedRating,
            text: reviewText.trim(),
            date: new Date().toISOString(),
        };

        const savedReviews =
            JSON.parse(
                localStorage.getItem(
                    "novaProductReviews"
                )
            ) || {};

        const productReviews =
            savedReviews[product.id] || [];

        const updatedReviews = [
            ...productReviews,
            newReview,
        ];

        savedReviews[product.id] =
            updatedReviews;

        localStorage.setItem(
            "novaProductReviews",
            JSON.stringify(savedReviews)
        );

        setReviews(updatedReviews);

        setSelectedRating(0);
        setReviewText("");

        setReviewMessage(
            "Review submitted successfully! ⭐"
        );
    };

    // =========================
    // AVERAGE RATING
    // =========================

    const averageRating = reviews.length
        ? (
            reviews.reduce(
                (sum, review) =>
                    sum + review.rating,
                0
            ) / reviews.length
        ).toFixed(1)
        : product?.rating || 0;

    const totalReviews = reviews.length;

    // =========================
    // PRODUCT NOT FOUND
    // =========================

    if (!product) {
        return (
            <div className="product-details-empty">

                <h2>
                    Product not found 😕
                </h2>

                <button
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>

            </div>
        );
    }

    const isWishlisted =
        wishlist.some(
            (item) =>
                item.id === product.id
        );

    return (
        <main className="product-details-page">

            {/* BACK */}

            <button
                className="back-button"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>


            {/* =========================
                PRODUCT DETAILS
            ========================= */}

            <section className="product-details">

                {/* IMAGE */}

                <div className="product-details-image">

                    <img
                        src={product.thumbnail}
                        alt={product.title}
                    />

                </div>


                {/* INFO */}

                <div className="product-details-info">

                    <span className="product-category">
                        {product.category}
                    </span>

                    <h1>
                        {product.title}
                    </h1>

                    <p className="brand">
                        Brand:{" "}
                        <strong>
                            {product.brand ||
                                "NovaCart"}
                        </strong>
                    </p>


                    {/* RATING */}

                    <div className="rating-box">

                        ⭐ {averageRating}

                        <span>
                            {" "}
                            •{" "}
                            {totalReviews > 0
                                ? `${totalReviews} Customer Reviews`
                                : "Customer Rating"}
                        </span>

                    </div>


                    <h2 className="product-price">
                        ₹
                        {Math.round(
                            product.price * 83
                        ).toLocaleString(
                            "en-IN"
                        )}
                    </h2>


                    <p className="product-description">
                        {product.description}
                    </p>


                    <p className="stock">

                        {product.stock > 0
                            ? `✓ ${product.stock} items available`
                            : "✕ Out of stock"}

                    </p>


                    {/* ACTIONS */}

                    <div className="product-actions">

                        <button
                            className="add-cart-btn"
                            onClick={() =>
                                addToCart(product)
                            }
                        >
                            🛒 Add to Cart
                        </button>


                        <button
                            className={`wishlist-btn ${isWishlisted
                                ? "wishlisted"
                                : ""
                                }`}
                            onClick={() =>
                                toggleWishlist(
                                    product
                                )
                            }
                        >
                            {isWishlisted
                                ? "❤️ Wishlisted"
                                : "♡ Add to Wishlist"}
                        </button>

                    </div>


                    {/* EXTRA INFO */}

                    <div className="product-extra">

                        <div>
                            🚚
                            <strong>
                                {" "}
                                Free Delivery
                            </strong>

                            <small>
                                On selected orders
                            </small>
                        </div>


                        <div>
                            ↩️
                            <strong>
                                {" "}
                                Easy Returns
                            </strong>

                            <small>
                                Simple return process
                            </small>
                        </div>


                        <div>
                            🔒
                            <strong>
                                {" "}
                                Secure Payment
                            </strong>

                            <small>
                                100% protected
                            </small>
                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                REVIEWS
            ========================= */}

            <section className="reviews-section">

                <h2>
                    Customer Reviews & Feedback
                </h2>


                {/* REVIEW SUMMARY */}

                <div className="review-summary">

                    <div className="big-rating">

                        ⭐ {averageRating}

                        <span>
                            out of 5
                        </span>

                    </div>


                    <div>

                        <p>
                            ⭐⭐⭐⭐⭐ Excellent
                        </p>

                        <p>
                            ⭐⭐⭐⭐ Very Good
                        </p>

                        <p>
                            ⭐⭐⭐ Good
                        </p>

                    </div>

                </div>


                {/* =========================
                    WRITE REVIEW
                ========================= */}

                <div className="write-review">

                    <h3>
                        Write a Review
                    </h3>


                    {!user ? (

                        <div className="login-review">

                            <p>
                                Please login to give
                                a rating and review.
                            </p>

                            <button
                                onClick={() =>
                                    navigate(
                                        "/login"
                                    )
                                }
                            >
                                Login to Review
                            </button>

                        </div>

                    ) : (

                        <>

                            <p>
                                Rating
                            </p>


                            {/* STARS */}

                            <div className="rating-input">

                                {[1, 2, 3, 4, 5].map(
                                    (star) => (

                                        <button
                                            key={star}
                                            type="button"
                                            className={
                                                star <=
                                                    selectedRating
                                                    ? "selected"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setSelectedRating(
                                                    star
                                                )
                                            }
                                        >
                                            ★
                                        </button>

                                    )
                                )}

                            </div>


                            {/* TEXT */}

                            <textarea
                                value={reviewText}
                                onChange={(e) =>
                                    setReviewText(
                                        e.target.value
                                    )
                                }
                                placeholder="Share your experience with this product..."
                                rows="4"
                            />


                            {/* MESSAGE */}

                            {reviewMessage && (
                                <p className="review-message">
                                    {reviewMessage}
                                </p>
                            )}


                            {/* SUBMIT */}

                            <button
                                className="submit-review-btn"
                                onClick={
                                    handleSubmitReview
                                }
                            >
                                Submit Review
                            </button>

                        </>

                    )}

                </div>


                {/* =========================
                    USER REVIEWS
                ========================= */}

                <div className="reviews-list">

                    {reviews.length === 0 ? (

                        <p className="no-reviews">
                            No customer reviews yet.
                            Be the first to review
                            this product! ⭐
                        </p>

                    ) : (

                        reviews
                            .slice()
                            .reverse()
                            .map((review) => (

                                <div
                                    className="review-card"
                                    key={review.id}
                                >

                                    <strong>
                                        {review.userName}
                                    </strong>

                                    <span>
                                        {" "}
                                        {"⭐".repeat(
                                            review.rating
                                        )}
                                    </span>

                                    <small>
                                        {" "}
                                        {new Date(
                                            review.date
                                        ).toLocaleDateString(
                                            "en-IN"
                                        )}
                                    </small>

                                    <p>
                                        {review.text}
                                    </p>

                                </div>

                            ))

                    )}

                </div>

            </section>

        </main>
    );
}

export default ProductDetails;

