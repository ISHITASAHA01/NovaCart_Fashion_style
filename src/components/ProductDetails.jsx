import { useNavigate, useParams } from "react-router-dom";
import "../css/ProductDetails.css";

function ProductDetails({ products, addToCart, toggleWishlist, wishlist }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = products.find(
        (item) => item.id === Number(id)
    );
    if (!product) {
        return (
            <div className="product-details-empty">
                <h2>Product not found 😕</h2>
                <button onClick={() => navigate("/")}>
                    Back to Home
                </button>
            </div>
        );
    }
    const isWishlisted = wishlist.some(
        (item) => item.id === product.id
    );
    return (
        <main className="product-details-page">
            <button
                className="back-button"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

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
                    <h1>{product.title}</h1>
                    <p className="brand">
                        Brand: <strong>{product.brand || "NovaCart"}</strong>
                    </p>
                    <div className="rating-box">
                        ⭐ {product.rating}
                        <span> • Customer Rating</span>
                    </div>
                    <h2 className="product-price">
                        ${product.price}
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
                            onClick={() => addToCart(product)}
                        >
                            🛒 Add to Cart
                        </button>

                        <button
                            className={`wishlist-btn ${isWishlisted ? "wishlisted" : ""
                                }`}
                            onClick={() => toggleWishlist(product)}
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
                            <strong> Free Delivery</strong>
                            <small>On selected orders</small>
                        </div>

                        <div>
                            ↩️
                            <strong> Easy Returns</strong>
                            <small>Simple return process</small>
                        </div>

                        <div>
                            🔒
                            <strong> Secure Payment</strong>
                            <small>100% protected</small>
                        </div>

                    </div>

                </div>

            </section>

            {/* REVIEWS */}
            <section className="reviews-section">

                <h2>Customer Reviews & Feedback</h2>

                <div className="review-summary">

                    <div className="big-rating">
                        ⭐ {product.rating}
                        <span>out of 5</span>
                    </div>

                    <div>
                        <p>⭐⭐⭐⭐⭐ Excellent</p>
                        <p>⭐⭐⭐⭐ Very Good</p>
                        <p>⭐⭐⭐ Good</p>
                    </div>

                </div>

                <div className="review-card">
                    <strong>Rahul</strong>
                    <span> ⭐⭐⭐⭐⭐</span>
                    <p>
                        Really good product. Quality is nice and
                        delivery was fast.
                    </p>
                </div>

                <div className="review-card">
                    <strong>Priya</strong>
                    <span> ⭐⭐⭐⭐</span>
                    <p>
                        Product is good and exactly as shown.
                    </p>
                </div>

            </section>

        </main>
    );
}

export default ProductDetails;