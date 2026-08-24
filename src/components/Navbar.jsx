
import { useNavigate, useLocation } from "react-router-dom";
import "../css/Navbar.css";

function Navbar({
  cartCount,
  wishlistCount,
  search,
  setSearch,
  setCategory,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("novaUser")
  );

  const goHome = () => {
    setCategory("All");
    navigate("/");
  };

  return (
    <>
      {/* =========================
          MAIN NAVBAR
      ========================= */}

      <header className="navbar">

        <button
          className="brand"
          onClick={goHome}
        >
          <span className="brand-icon">✦</span>

          <span className="brand-name">
            Nova<span>Cart</span>
          </span>

          <small>
            Smart Shopping <b>✨</b>
          </small>
        </button>


        {/* SEARCH */}

        <div className="search-box">
          <span>⌕</span>

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search for products, brands and more"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}
        </div>


        {/* LOGIN */}
        {user ? (
          <button
            className="nav-action profile-btn"
            onClick={() => navigate("/profile")}
          >
            👤 {user.name || "Profile"}
          </button>
        ) : (
          <button
            className="nav-action login-btn"
            onClick={() => navigate("/login")}
          >
            👤 Login
          </button>
        )}

        {/* SELLER */}

        <button className="nav-action seller-btn">
          Become a Seller
        </button>


        {/* WISHLIST */}

        <button
          className="nav-action"
          onClick={() => navigate("/wishlist")}
        >
          ♡ Wishlist <b>{wishlistCount}</b>
        </button>


        {/* CART */}

        <button
          className="nav-action cart-link"
          onClick={() => navigate("/cart")}
        >
          🛒 Cart <b>{cartCount}</b>
        </button>

      </header>


      {/* =========================
          SECOND NAV
      ========================= */}

      <div className="subnav">

        {/* HOME */}

        <button onClick={goHome}>
          🏠 Home
        </button>


        {/* BEAUTY */}

        <button
          onClick={() => navigate("/beauty")}
        >
          💄 Beauty
        </button>


        {/* FRAGRANCES */}

        <button
          onClick={() => navigate("/fragrances")}
        >
          🌸 Fragrances
        </button>


        {/* FURNITURE */}

        <button
          onClick={() => navigate("/furniture")}
        >
          🛋️ Furniture
        </button>


        {/* GROCERY */}

        <button
          onClick={() => navigate("/grocery")}
        >
          🥦 Grocery
        </button>


        {/* LAPTOPS */}

        <button
          onClick={() => navigate("/laptops")}
        >
          💻 Laptops
        </button>


        {/* FASHION */}

        <button
          onClick={() => navigate("/fashion")}
        >
          👗 Fashion
        </button>


        {/* MOBILES */}

        <button
          onClick={() => navigate("/mobiles")}
        >
          📱 Mobiles
        </button>

      </div>
    </>
  );
}

export default Navbar;