import "../css/Wishlist.css";

function Wishlist({ wishlist, removeFromWishlist, addToCart }) {
    return (
        <div className="wishlist-page">

            <div className="wishlist-header">
                {/* <h1>❤️ My Wishlist</h1> */}
                {/* 
                <p>
                    {wishlist.length} product
                    {wishlist.length !== 1 ? "s" : ""} saved
                </p> */}
            </div>

            {wishlist.length === 0 ? (
                <div className="empty-wishlist">
                    <div className="empty-icon">💔</div>

                    <h2>Your Wishlist is Empty</h2>

                    <p>
                        Save your favorite products here
                        and find them easily later.
                    </p>
                </div>
            ) : (
                <div className="wishlist-grid">

                    {wishlist.map((product) => (

                        <div
                            className="wishlist-card"
                            key={product.id}
                        >

                            <img
                                src={product.thumbnail}
                                alt={product.title}
                            />

                            <div className="wishlist-info">

                                <h2>{product.title}</h2>

                                <p className="wishlist-category">
                                    {product.category}
                                </p>

                                <p className="wishlist-rating">
                                    ⭐ {product.rating}
                                </p>

                                <p className="wishlist-price">
                                    ₹{product.price}
                                </p>

                                {product.stock > 0 ? (
                                    <p className="wishlist-stock">
                                        ✅ In Stock
                                    </p>
                                ) : (
                                    <p className="wishlist-out-stock">
                                        ❌ Out of Stock
                                    </p>
                                )}

                                <div className="wishlist-actions">

                                    {product.stock > 0 && (
                                        <button
                                            className="wishlist-cart-btn"
                                            onClick={() => {
                                                console.log(
                                                    "🛒 Wishlist → Cart:",
                                                    product.title
                                                );

                                                addToCart(product);
                                            }}
                                        >
                                            🛒 Add to Cart
                                        </button>
                                    )}

                                    <button
                                        className="wishlist-remove-btn"
                                        onClick={() => {
                                            console.log(
                                                "💔 Removing Wishlist:",
                                                product.title
                                            );

                                            removeFromWishlist(product.id);
                                        }}
                                    >
                                        💔 Remove
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default Wishlist;