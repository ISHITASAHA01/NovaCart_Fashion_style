import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FiTruck,
  FiSmartphone,
  FiMapPin,
  FiHeadphones,
  FiSearch,
  FiUser,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiTag,
  FiPercent,
  FiHome,
} from "react-icons/fi";

import "../css/Navbar.css";

function Navbar({
  cartCount,
  wishlistCount,
  search,
  setSearch,
  setCategory,
}) {
  const navigate = useNavigate();

  const [showOffers, setShowOffers] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // =====================================================
  // LOGGED-IN USER
  // =====================================================

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("novaUser");

      if (token && savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Invalid user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    // Listen when localStorage changes
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  // =====================================================
  // FIRST NAME
  // =====================================================

  const getFirstName = () => {
    if (!user) return "User";

    const fullName =
      user.fullName ||
      user.name ||
      "User";

    return fullName.trim().split(" ")[0];
  };

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    { name: "Beauty", path: "/beauty" },
    { name: "Fragrances", path: "/fragrances" },
    { name: "Furniture", path: "/furniture" },
    { name: "Home Decoration", path: "/furniture" },
    { name: "Kitchen Accessories", path: "/kitchen" },
    { name: "Laptops", path: "/laptops" },
    { name: "Mens Shirts", path: "/fashion?collection=shirts" },
    { name: "Mens Shoes", path: "/fashion?collection=shoes" },
    { name: "Fashion", path: "/fashion" },
    { name: "Mobiles", path: "/mobiles" },
    { name: "Grocery", path: "/grocery" },
  ];

  // =====================================================
  // HOME
  // =====================================================

  const goHome = () => {
    setCategory("All");
    navigate("/");
  };

  // =====================================================
  // ACCOUNT CLICK
  // =====================================================

  const handleAccountClick = () => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("novaUser");

    if (token && savedUser) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
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

            <button
              onClick={() =>
                navigate("/track-order")
              }
            >
              <FiMapPin />
              Track Order
            </button>

            <button
              onClick={() =>
                navigate("/support")
              }
            >
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

          {/* =====================================================
              LOGO
          ===================================================== */}

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


          {/* =====================================================
              MOBILE MENU
          ===================================================== */}

          <button
            className="mobile-menu-btn"
            onClick={() =>
              setShowMobileMenu(
                !showMobileMenu
              )
            }
          >
            <FiMenu />
          </button>


          {/* =====================================================
              SEARCH
          ===================================================== */}

          <div className="search-box">

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
                onClick={() =>
                  setSearch("")
                }
              >
                ×
              </button>
            )}

            <button className="search-btn">
              <FiSearch />
            </button>

          </div>


          {/* =====================================================
              ACCOUNT
          ===================================================== */}

          <button
            className="account-nav"
            onClick={handleAccountClick}
          >

            <FiUser />

            <span>

              {user
                ? `Hi, ${getFirstName()}`
                : "Login"}

              <small>
                My Account
              </small>

            </span>

          </button>


          {/* =====================================================
              WISHLIST
          ===================================================== */}

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


          {/* =====================================================
              CART
          ===================================================== */}

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

          {/* HOME */}

          <button
            className="main-nav-item active"
            onClick={goHome}
          >
            <FiHome />
            Home
          </button>


          {/* BEAUTY */}

          <button
            className="main-nav-item"
            onClick={() =>
              navigate("/beauty")
            }
          >
            💄 Beauty
          </button>


          {/* FRAGRANCES */}

          <button
            className="main-nav-item"
            onClick={() =>
              navigate("/fragrances")
            }
          >
            🌸 Fragrances
          </button>


          {/* FURNITURE */}

          <button
            className="main-nav-item"
            onClick={() =>
              navigate("/furniture")
            }
          >
            🛋️ Furniture
          </button>


          {/* GROCERY */}

          <button
            className="main-nav-item"
            onClick={() =>
              navigate("/grocery")
            }
          >
            🛒 Grocery
          </button>


          {/* LAPTOPS */}

          <button
            className="main-nav-item"
            onClick={() =>
              navigate("/laptops")
            }
          >
            💻 Laptops
          </button>


          {/* FASHION */}

          <button
            className="main-nav-item"
            onClick={() =>
              navigate("/fashion")
            }
          >
            👗 Fashion
          </button>


          {/* MOBILES */}

          <button
            className="main-nav-item"
            onClick={() =>
              navigate("/mobiles")
            }
          >
            📱 Mobiles
          </button>


          {/* DEALS */}

          <button
            className="deals-btn"
            onClick={() =>
              navigate("/#products")
            }
          >
            <FiTag />
            Deals
          </button>


          {/* OFFER ZONE */}

          <button
            className="offer-btn"
            onClick={() =>
              setShowOffers(true)
            }
          >
            <FiPercent />
            Offer Zone
          </button>

        </div>


        {/* =====================================================
            OFFER POPUP
        ===================================================== */}

        {showOffers && (

          <div className="offer-overlay">

            <div className="offer-popup">

              <button
                className="offer-popup-close"
                onClick={() =>
                  setShowOffers(false)
                }
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

                    <span>
                      👗 Fashion
                    </span>

                    <span>
                      💄 Beauty
                    </span>

                    <span>
                      📱 Mobiles
                    </span>

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

                    <small>
                      UP TO
                    </small>

                    <strong>
                      50%
                    </strong>

                    <span>
                      OFF
                    </span>

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

          {/* ALL */}

          <button
            className="category-chip active"
            onClick={goHome}
          >
            All
          </button>


          {/* BEAUTY */}

          <button
            className="category-chip"
            onClick={() =>
              navigate("/beauty")
            }
          >
            Beauty
          </button>


          {/* FRAGRANCES */}

          <button
            className="category-chip"
            onClick={() =>
              navigate("/fragrances")
            }
          >
            Fragrances
          </button>


          {/* FURNITURE */}

          <button
            className="category-chip"
            onClick={() =>
              navigate("/furniture")
            }
          >
            Furniture
          </button>


          {/* HOME DECORATION */}

          <button
            className="category-chip"
            onClick={() =>
              navigate("/furniture")
            }
          >
            Home Decoration
          </button>


          {/* KITCHEN */}

          <button className="category-chip">
            Kitchen Accessories
          </button>


          {/* LAPTOPS */}

          <button
            className="category-chip"
            onClick={() =>
              navigate("/laptops")
            }
          >
            Laptops
          </button>


          {/* MENS SHIRTS */}

          <button
            className="category-chip"
            onClick={() =>
              navigate(
                "/fashion?collection=shirts"
              )
            }
          >
            Mens Shirts
          </button>


          {/* MENS SHOES */}

          <button
            className="category-chip"
            onClick={() =>
              navigate(
                "/fashion?collection=shoes"
              )
            }
          >
            Mens Shoes
          </button>


          {/* VIEW ALL */}

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