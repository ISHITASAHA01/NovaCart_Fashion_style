import "../css/ProductCard.css";
import { useNavigate } from "react-router-dom";

function ProductCard({
  product,
  addToCart,
  onWishlist,
  isWishlisted,
}) {
  const navigate = useNavigate();

  const discount = Math.round(product.discountPercentage);

  const openProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <article
      className="product-card"
      onClick={openProduct}
    >

      {/* WISHLIST */}
      <button
        className={`heart ${isWishlisted ? "liked" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onWishlist();
        }}
        aria-label="Wishlist"
      >
        {isWishlisted ? "♥" : "♡"}
      </button>

      {/* IMAGE */}
      <div className="product-image-wrap">
        <img
          src={product.thumbnail}
          alt={product.title}
        />
      </div>

      {/* INFO */}
      <div className="product-info">

        <p className="product-category">
          {product.category.replaceAll("-", " ")}
        </p>

        <h3 title={product.title}>
          {product.title}
        </h3>

        <div className="rating-line">
          <span>★ {product.rating}</span>
          <small>{product.stock} left</small>
        </div>

        <div className="price-line">
          <strong>
            ₹
            {Math.round(
              product.price * 83
            ).toLocaleString("en-IN")}
          </strong>

          <del>
            ₹
            {Math.round(
              product.price * 83 * 1.25
            ).toLocaleString("en-IN")}
          </del>

          <em>{discount}% off</em>
        </div>

        <p className="delivery">
          Free delivery
        </p>

        {/* ADD TO CART */}
        {product.stock > 0 ? (
          <button
            className="cart-btn"
            onClick={(e) => {
              e.stopPropagation();
              addToCart();
            }}
          >
            Add to Cart
          </button>
        ) : (
          <button
            className="notify-btn"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Notify Me
          </button>
        )}

      </div>
    </article>
  );
}

export default ProductCard;