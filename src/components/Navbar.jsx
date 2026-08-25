import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiTruck, FiSmartphone, FiMapPin, FiHeadphones, FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu, FiChevronDown, FiTag, FiPercent, FiHome,
} from "react-icons/fi";

import "../css/Navbar.css";

function Navbar({ cartCount, wishlistCount, search, setSearch, setCategory }) {
  const navigate = useNavigate();
  const [showOffers, setShowOffers] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("novaUser")
  );

  const goHome = () => {
    setCategory("All");
    navigate("/");
  };

  return (
    <>
      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div className="top-bar">
        <div className="top-bar-inner">

          <div className="top-left">
            <span>
              <FiTruck />
              Free Delivery on orders above ₹499
            </span>
          </div>

          <div className="top-right">

            {/* <button>
              <FiSmartphone />
              Download Our App
            </button> */}

            <button onClick={() => navigate("/track-order")}>
              <FiMapPin />
              Track Order
            </button>

            <button onClick={() => navigate("/support")}>
              <FiHeadphones />
              Help & Support
            </button>

          </div>

        </div>
      </div>


      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <header className="navbar">

        <div className="navbar-inner">

          {/* LOGO */}

          <button
            className="brand"
            onClick={goHome}
          >

            <div className="brand-logo">
              <span className="brand-cart">
                🛒
              </span>

              <span className="brand-name">
                Nova<span>Cart</span>
              </span>
            </div>

            <small>
              Smart Shopping
            </small>

          </button>


          {/* MOBILE MENU */}

          <button className="mobile-menu-btn">
            <FiMenu />
          </button>


          {/* SEARCH */}

          <div className="search-box">

            <button className="category-dropdown">
              All Categories
              <FiChevronDown />
            </button>

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search for products, brands and more..."
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}

            <button className="search-btn">
              <FiSearch />
            </button>

          </div>


          {/* ACCOUNT */}

          <button
            className="account-nav"
            onClick={() =>
              navigate(
                user ? "/profile" : "/login"
              )
            }
          >

            <FiUser />

            <span>
              {user
                ? `Hi, ${user.name || "User"}`
                : "Login"}
              <small>
                {user
                  ? "My Account"
                  : "My Account"}
              </small>
            </span>

          </button>


          {/* WISHLIST */}

          <button
            className="icon-nav"
            onClick={() =>
              navigate("/wishlist")
            }
          >

            <FiHeart />

            <span>
              Wishlist
              <b>{wishlistCount}</b>
            </span>

          </button>


          {/* CART */}

          <button
            className="icon-nav cart-nav"
            onClick={() =>
              navigate("/cart")
            }
          >

            <FiShoppingCart />

            <span>
              Cart
              <b>{cartCount}</b>

              <small>
                ₹0.00
              </small>
            </span>

          </button>

        </div>

      </header>


      {/* =====================================================
          MAIN CATEGORY NAV
      ===================================================== */}

      <nav className="main-nav">

        <div className="main-nav-inner">

          <button className="all-category-btn">
            <FiMenu />
            All Categories
          </button>


          <button
            className="main-nav-item active"
            onClick={goHome}
          >
            <FiHome />
            Home
          </button>


          <button
            className="main-nav-item"
            onClick={() => navigate("/beauty")}
          >
            💄 Beauty
          </button>


          <button
            className="main-nav-item"
            onClick={() =>
              navigate("/fragrances")
            }
          >
            🌸 Fragrances
          </button>


          <button
            className="main-nav-item"
            onClick={() =>
              navigate("/furniture")
            }
          >
            🛋️ Furniture
          </button>


          <button
            className="main-nav-item"
            onClick={() =>
              navigate("/grocery")
            }
          >
            🛒 Grocery
          </button>


          <button
            className="main-nav-item"
            onClick={() =>
              navigate("/laptops")
            }
          >
            💻 Laptops
          </button>


          <button
            className="main-nav-item"
            onClick={() =>
              navigate("/fashion")
            }
          >
            👗 Fashion
          </button>


          <button
            className="main-nav-item"
            onClick={() =>
              navigate("/mobiles")
            }
          >
            📱 Mobiles
          </button>

          <button
            className="deals-btn"
            onClick={() => navigate("/#products")}
          >
            <FiTag />
            Deals
          </button>

          <button
            className="offer-btn"
            onClick={() => setShowOffers(true)}
          >
            <FiPercent />
            Offer Zone
          </button>

        </div>
        {showOffers && (
          <div className="offer-overlay">
            <div className="offer-popup">

              <button
                className="offer-popup-close"
                onClick={() => setShowOffers(false)}
              >
                ×
              </button>

              <div className="offer-popup-content">

                <div className="offer-popup-text">

                  <span className="offer-label">
                    🔥 LIMITED TIME OFFER
                  </span>

                  <h2>
                    FLAT <strong>50% OFF</strong>
                  </h2>

                  <p>
                    Grab amazing deals on your
                    favourite products.
                  </p>

                  <div className="offer-highlights">
                    <span>👗 Fashion</span>
                    <span>💄 Beauty</span>
                    <span>📱 Mobiles</span>
                  </div>

                  <button
                    className="offer-shop-btn"
                    onClick={() => {
                      setShowOffers(false);
                      navigate("/fashion");
                    }}
                  >
                    Shop Offers →
                  </button>

                </div>

                <div className="offer-popup-art">
                  <div className="discount-circle">
                    <small>UP TO</small>
                    <strong>50%</strong>
                    <span>OFF</span>
                  </div>

                  <div className="offer-emoji">
                    🛍️
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}






      </nav>


      {/* =====================================================
          CATEGORY CHIPS
      ===================================================== */}

      <div className="category-chips-wrapper">

        <div className="category-chips">

          <button
            className="category-chip active"
            onClick={goHome}
          >
            All
          </button>


          <button
            className="category-chip"
            onClick={() => navigate("/beauty")}
          >
            Beauty
          </button>


          <button
            className="category-chip"
            onClick={() =>
              navigate("/fragrances")
            }
          >
            Fragrances
          </button>


          <button
            className="category-chip"
            onClick={() =>
              navigate("/furniture")
            }
          >
            Furniture
          </button>


          <button
            className="category-chip"
            onClick={() =>
              navigate("/furniture")
            }
          >
            Home Decoration
          </button>


          <button className="category-chip">
            Kitchen Accessories
          </button>


          <button
            className="category-chip"
            onClick={() =>
              navigate("/laptops")
            }
          >
            Laptops
          </button>


          <button
            className="category-chip"
            onClick={() =>
              navigate("/fashion?collection=shirts")
            }
          >
            Mens Shirts
          </button>


          <button
            className="category-chip"
            onClick={() =>
              navigate("/fashion?collection=shoes")
            }
          >
            Mens Shoes
          </button>


          <button
            className="view-all-categories"
            onClick={goHome}
          >
            View All Categories →
          </button>

        </div>

      </div>

    </>
  );
}

export default Navbar;