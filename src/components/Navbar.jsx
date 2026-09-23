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
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeChip, setActiveChip] = useState("All");

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
    // Electronics
    { name: "Electronics", path: "/electronics" },
    { name: "Smartphones", path: "/smartphones" },
    { name: "Mobile Accessories", path: "/mobile-accessories" },
    { name: "Laptops", path: "/laptops" },
    { name: "Tablets", path: "/tablets" },

    // Beauty
    { name: "Beauty", path: "/beauty" },
    { name: "Skin Care", path: "/beauty" },
    { name: "Fragrances", path: "/fragrances" },

    // Home
    { name: "Furniture", path: "/furniture" },
    { name: "Home Decoration", path: "/home-decoration" },

    // Fashion
    { name: "Fashion", path: "/fashion" },
    { name: "Mens Shirts", path: "/fashion?collection=shirts" },
    { name: "Mens Shoes", path: "/fashion?collection=shoes" },
    { name: "Mens Watches", path: "/fashion?collection=watches" },
    { name: "Womens Dresses", path: "/fashion?collection=dresses" },
    { name: "Womens Shoes", path: "/fashion?collection=shoes" },
    { name: "Womens Watches", path: "/fashion?collection=watches" },
    { name: "Womens Bags", path: "/fashion?collection=bags" },
    { name: "Jewellery", path: "/fashion?collection=jewellery" },
    { name: "Tops", path: "/fashion?collection=tops" },
    { name: "Sunglasses", path: "/fashion?collection=sunglasses" },

    // Grocery
    { name: "Grocery", path: "/grocery" },

    // Sports
    { name: "Sports Accessories", path: "/sports" },
  ];

  const categoryGroups = [
    {
      title: "Electronics", items: [
        ["Electronics", "/electronics"], ["Smartphones", "/smartphones"],
        ["Mobile Accessories", "/mobile-accessories"], ["Laptops", "/laptops"], ["Tablets", "/tablets"],
      ]
    },
    {
      title: "Beauty & Fragrances", items: [
        ["Beauty", "/beauty"], ["Skin Care", "/beauty"], ["Fragrances", "/fragrances"],
      ]
    },
    {
      title: "Home", items: [
        ["Furniture", "/furniture"], ["Home Decoration", "/home-decoration"],
      ]
    },
    {
      title: "Fashion", items: [
        ["Fashion", "/fashion"], ["Mens Shirts", "/fashion?collection=shirts"], ["Mens Shoes", "/fashion?collection=shoes"],
        ["Mens Watches", "/fashion?collection=watches"], ["Womens Dresses", "/fashion?collection=dresses"],
        ["Womens Shoes", "/fashion?collection=shoes"], ["Womens Watches", "/fashion?collection=watches"],
        ["Womens Bags", "/fashion?collection=bags"], ["Jewellery", "/fashion?collection=jewellery"],
        ["Tops", "/fashion?collection=tops"], ["Sunglasses", "/fashion?collection=sunglasses"],
      ]
    },
    {
      title: "Grocery & Sports", items: [
        ["Grocery", "/grocery"], ["Sports Accessories", "/sports"],
      ]
    },
  ];


  // =====================================================
  // HOME
  // =====================================================

  const goHome = () => {
    setCategory("All");
    setActiveChip("All");
    setShowAllCategories(false);
    navigate("/");
  };

  const handleCategoryClick = (label, path) => {
    setActiveChip(label);
    setShowAllCategories(false);
    navigate(path);
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

          {/* ALL CATEGORIES */}

          <button
            className={`all-category-btn ${showAllCategories ? "open" : ""}`}
            onClick={() => setShowAllCategories((value) => !value)}
            aria-expanded={showAllCategories}
          >
            <FiMenu />
            <span>All Categories</span>
            <span className="all-category-chevron">⌄</span>
          </button>

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
            onClick={() => handleCategoryClick("Beauty", "/beauty")}
          >
            💄 Beauty
          </button>


          {/* FRAGRANCES */}

          <button
            className="main-nav-item"
            onClick={() => handleCategoryClick("Fragrances", "/fragrances")}
          >
            🌸 Fragrances
          </button>


          {/* FURNITURE */}

          <button
            className="main-nav-item"
            onClick={() => handleCategoryClick("Furniture", "/furniture")}
          >
            🛋️ Furniture
          </button>


          {/* GROCERY */}

          <button
            className="main-nav-item"
            onClick={() => handleCategoryClick("Grocery", "/grocery")}
          >
            🛒 Grocery
          </button>


          {/* LAPTOPS */}

          <button
            className="main-nav-item"
            onClick={() => handleCategoryClick("Laptops", "/laptops")}
          >
            💻 Laptops
          </button>


          {/* FASHION */}

          <button
            className="main-nav-item"
            onClick={() => handleCategoryClick("Fashion", "/fashion")}
          >
            👗 Fashion
          </button>

          {/* MOBILES */}

          <button
            className="main-nav-item"
            onClick={() => handleCategoryClick("Mobiles", "/mobiles")}
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

          {/* <button
            className="admin-nav-btn"
            onClick={() => navigate("/admin")}
          >
            ⚙️ Admin
          </button> */}

        </div>

        {/* =====================================================
            ALL CATEGORIES DROPDOWN
        ===================================================== */}

        {showAllCategories && (
          <div className="all-category-menu">
            <div className="all-category-menu-inner">
              {categoryGroups.map((group) => (
                <div className="all-category-group" key={group.title}>
                  <h4>{group.title}</h4>
                  {group.items.map(([label, path]) => (
                    <button
                      key={`${group.title}-${label}`}
                      onClick={() => handleCategoryClick(label, path)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}


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
            className={`category-chip ${activeChip === "All" ? "active" : ""}`}
            onClick={goHome}
          >
            All
          </button>


          {/* ================= ELECTRONICS ================= */}

          <button
            className={`category-chip ${activeChip === "Electronics" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Electronics", "/electronics")}
          >
            💻 Electronics
          </button>

          <button
            className={`category-chip ${activeChip === "Smartphones" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Smartphones", "/smartphones")}
          >
            📱 Smartphones
          </button>

          <button
            className={`category-chip ${activeChip === "Mobile Accessories" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Mobile Accessories", "/mobile-accessories")}
          >
            🔌 Mobile Accessories
          </button>

          <button
            className={`category-chip ${activeChip === "Laptops" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Laptops", "/laptops")}
          >
            💻 Laptops
          </button>

          <button
            className={`category-chip ${activeChip === "Tablets" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Tablets", "/tablets")}
          >
            📲 Tablets
          </button>


          {/* ================= BEAUTY ================= */}

          <button
            className={`category-chip ${activeChip === "Beauty" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Beauty", "/beauty")}
          >
            💄 Beauty
          </button>


          {/* ================= FRAGRANCES ================= */}

          <button
            className={`category-chip ${activeChip === "Fragrances" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Fragrances", "/fragrances")}
          >
            🌸 Fragrances
          </button>


          {/* ================= HOME ================= */}

          <button
            className={`category-chip ${activeChip === "Furniture" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Furniture", "/furniture")}
          >
            🛋️ Furniture
          </button>

          <button
            className={`category-chip ${activeChip === "Home Decoration" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Home Decoration", "/home-decoration")}
          >
            🏠 Home Decoration
          </button>


          {/* ================= FASHION ================= */}

          <button
            className={`category-chip ${activeChip === "Fashion" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Fashion", "/fashion")}
          >
            👗 Fashion
          </button>

          <button
            className={`category-chip ${activeChip === "Mens Shirts" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Mens Shirts", "/fashion?collection=shirts")}
          >
            👔 Mens Shirts
          </button>

          <button
            className={`category-chip ${activeChip === "Mens Shoes" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Mens Shoes", "/fashion?collection=shoes")}
          >
            👟 Mens Shoes
          </button>

          <button
            className={`category-chip ${activeChip === "Watches" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Watches", "/fashion?collection=watches")}
          >
            ⌚ Watches
          </button>

          <button
            className={`category-chip ${activeChip === "Dresses" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Dresses", "/fashion?collection=dresses")}
          >
            👗 Dresses
          </button>

          <button
            className={`category-chip ${activeChip === "Bags" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Bags", "/fashion?collection=bags")}
          >
            👜 Bags
          </button>

          <button
            className={`category-chip ${activeChip === "Jewellery" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Jewellery", "/fashion?collection=jewellery")}
          >
            💎 Jewellery
          </button>

          <button
            className={`category-chip ${activeChip === "Tops" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Tops", "/fashion?collection=tops")}
          >
            👕 Tops
          </button>

          <button
            className={`category-chip ${activeChip === "Sunglasses" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Sunglasses", "/fashion?collection=sunglasses")}
          >
            🕶️ Sunglasses
          </button>


          {/* ================= GROCERY ================= */}

          <button
            className={`category-chip ${activeChip === "Grocery" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Grocery", "/grocery")}
          >
            🛒 Grocery
          </button>


          {/* ================= SPORTS ================= */}

          <button
            className={`category-chip ${activeChip === "Sports" ? "active" : ""}`}
            onClick={() => handleCategoryClick("Sports", "/sports")}
          >
            ⚽ Sports
          </button>

        </div>

      </div>


    </>
  );
}

export default Navbar;