import { useEffect, useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import "./css/Toast.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Grocery from "./components/Grocery";
import CategoryPage from "./components/CategoryPage";
import Cart from "./components/Cart";
import Wishlist from "./components/Wishlist";

import Login from "./components/Login";
import Auth from "./components/Auth";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import FooterPage from "./components/FooterPages";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import ScrollToTop from "./components/ScrollToTop";

/* =========================
   HOME PAGE
========================= */

function Home({
  products,
  loading,
  error,
  search,
  category,
  sortBy,
  setCategory,
  setSortBy,
  addToCart,
  toggleWishlist,
  wishlist,
}) {
  // const [showCollections, setShowCollections] = useState(false);
  const categories = useMemo(() => {
    const homeCategories = products
      .map((product) => product.category)
      .filter((cat) => cat !== "groceries");

    return ["All", ...new Set(homeCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      // Grocery Home page par nahi dikhayega
      if (product.category === "groceries") {
        return false;
      }



      const text =
        `${product.title} ${product.category}`.toLowerCase();

      const searchMap = {
        "one piece": ["frock", "dress", "gown", "midi", "maxi"],
        "dress": ["frock", "one piece", "gown", "midi", "maxi"],
        "frock": ["dress", "one piece", "gown", "midi", "maxi"],

        "phone": ["mobile", "iphone", "smartphone", "android"],
        "mobile": ["phone", "iphone", "smartphone", "android"],

        "shoes": ["shoe", "sneakers", "sandals", "heels", "footwear"],

        "makeup": [
          "lipstick",
          "foundation",
          "mascara",
          "eyeliner",
          "beauty"
        ],

        "food": [
          "snacks",
          "biscuits",
          "chips",
          "beverages"
        ],
      };

      const searchText = search.toLowerCase().trim();

      const keywords = [
        searchText,
        ...(searchMap[searchText] || []),
      ];

      const matchesSearch =
        searchText === "" ||
        keywords.some((keyword) =>
          text.includes(keyword)
        );

      return (
        matchesSearch &&
        (category === "All" || product.category === category)
      );

    });




    if (sortBy === "low") {
      result.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "high") {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [products, search, category, sortBy]);

  return (
    <main className="home-page">
      {/* =========================
          HOME CATEGORIES
      ========================= */}

      <section className="category-strip">
        {categories.slice(0, 9).map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat.replaceAll("-", " ")}
          </button>
        ))}
      </section>

      {/* =========================
          HERO
      ========================= */}

      <section className="hero">
        <div>
          <span className="hero-tag">
            BIG SAVINGS • DAILY DEALS
          </span>

          <h1>
            Everything you need.
            <br />
            <strong>Great prices.</strong>
          </h1>

          <p>
            Explore electronics, fashion, beauty and more.
          </p>

          <button
            onClick={() => {
              onClose();
              navigate(slide.path);
            }}
          >
            Shop Now →
          </button>

        </div>

        <div className="hero-art">🛍️</div>
      </section>


      {/* =========================
          PRODUCTS HEADER
      ========================= */}

      <section
        className="section-heading"
        id="products"
      >
        <div>
          <h2>Best Deals</h2>
          <p>
            {filteredProducts.length} products found
          </p>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="low">
            Price: Low to High
          </option>
          <option value="high">
            Price: High to Low
          </option>
        </select>
      </section>

      {/* =========================
          LOADING
      ========================= */}

      {loading && (
        <div className="state-box">
          <div className="loader" />
          <h3>Loading products...</h3>
        </div>
      )}

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="state-box">
          <h3>{error}</h3>
        </div>
      )}

      {/* =========================
          EMPTY
      ========================= */}

      {!loading &&
        !error &&
        filteredProducts.length === 0 && (
          <div className="state-box">
            <h3>No products found 😕</h3>

            <button
              onClick={() => setCategory("All")}
            >
              Show all products
            </button>
          </div>
        )}

      {/* =========================
          PRODUCTS
      ========================= */}

      {!loading &&
        !error &&
        filteredProducts.length > 0 && (
          <section className="product-grid">
            {filteredProducts
              .slice(0, 8)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={() => addToCart(product)}
                  onWishlist={() =>
                    toggleWishlist(product)
                  }
                  isWishlisted={wishlist.some(
                    (item) =>
                      item.id === product.id
                  )}
                />
              ))}
          </section>
        )}
      {/* =========================
          TRUST
      ========================= */}

      <section className="trust-row">

        <div>
          <span>🚚</span>

          <div>
            <b>Free Delivery</b>
            <small>On selected orders</small>
          </div>
        </div>

        <div>
          <span>↩️</span>

          <div>
            <b>Easy Returns</b>
            <small>Simple return process</small>
          </div>
        </div>

        <div>
          <span>🔒</span>

          <div>
            <b>Secure Payments</b>
            <small>100% protected checkout</small>
          </div>
        </div>

        <div>
          <span>⭐</span>

          <div>
            <b>Top Rated</b>
            <small>Quality products</small>
          </div>
        </div>

      </section>
    </main>
  );
}
/* =========================
   APP
========================= */

function App() {
  const [showPromo, setShowPromo] = useState(true);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const [category, setCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("default");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =========================
     FETCH PRODUCTS
  ========================= */

  useEffect(() => {

    fetch(
      "https://dummyjson.com/products?limit=0"
    )
      .then((res) => {

        if (!res.ok) {
          throw new Error();
        }

        return res.json();
      })

      .then((data) => {
        setProducts(data.products);
      })

      .catch(() => {
        setError(
          "Products load nahi ho paaye."
        );
      })

      .finally(() => {
        setLoading(false);
      });

  }, []);


  /* =========================
     ADD TO CART
  ========================= */
  const addToCart = (product) => {
    if (product.stock <= 0) {
      setToast({
        type: "error",
        title: "Out of Stock",
        message: `${product.title} is currently unavailable.`,
      });

      setTimeout(() => {
        setToast(null);
      }, 2500);

      return;
    }

    setCart((current) => {
      const found = current.find(
        (item) => item.id === product.id
      );

      // Already in cart
      if (found) {
        setToast({
          type: "info",
          title: "Already in Cart",
          message: `${product.title} is already in your cart.`,
        });

        setTimeout(() => {
          setToast(null);
        }, 2500);

        return current;
      }

      // First time adding
      setToast({
        type: "success",
        title: "Added to Cart",
        message: `${product.title} has been added.`,
      });

      setTimeout(() => {
        setToast(null);
      }, 2500);

      return [
        ...current,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  /* =========================
     WISHLIST
  ========================= */

  const toggleWishlist = (product) => {

    setWishlist((current) => {

      const exists = current.some(
        (item) =>
          item.id === product.id
      );

      if (exists) {

        return current.filter(
          (item) =>
            item.id !== product.id
        );
      }

      return [
        ...current,
        product,
      ];

    });
  };


  const removeFromWishlist = (id) => {

    setWishlist((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );

  };


  /* =========================
     CART FUNCTIONS
  ========================= */

  const removeFromCart = (id) => {

    setCart((current) =>
      current.filter(
        (item) => item.id !== id
      )
    );

  };


  const increaseQuantity = (id) => {

    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity:
              item.quantity + 1,
          }
          : item
      )
    );

  };


  const decreaseQuantity = (id) => {

    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
              ...item,
              quantity:
                item.quantity - 1,
            }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );

  };


  /* =========================
     CART COUNT
  ========================= */

  const cartCount = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );







  /* =========================
     RETURN
  ========================= */

  return (
    <>
      {showPromo && (
        <PromoPopup
          onClose={() => setShowPromo(false)}
        />
      )}

      {/* ONLY ONE NAVBAR */}
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        search={search}
        setSearch={setSearch}
        setCategory={setCategory}
      />

      {/* TOAST */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          <div className="toast-icon">
            {toast.type === "success" && "✓"}
            {toast.type === "info" && "ℹ"}
            {toast.type === "error" && "!"}
          </div>

          <div className="toast-content">
            <strong>{toast.title}</strong>
            <span>{toast.message}</span>
          </div>

          <button
            className="toast-close"
            onClick={() => setToast(null)}
          >
            ×
          </button>
        </div>
      )}

      <ScrollToTop />

      {/* ROUTES */}
      <Routes>

        <Route
          path="/"
          element={
            <Home
              products={products}
              loading={loading}
              error={error}
              search={search}
              category={category}
              sortBy={sortBy}
              setCategory={setCategory}
              setSortBy={setSortBy}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/grocery"
          element={
            <Grocery
              search={search}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          }
        />

        <Route
          path="/beauty"
          element={
            <CategoryPage
              products={products}
              loading={loading}
              error={error}
              search={search}
              category="beauty"
              title="Beauty"
              emoji="💄"
              description="Discover beauty products for your everyday routine."
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          }
        />

        <Route
          path="/fragrances"
          element={
            <CategoryPage
              products={products}
              loading={loading}
              error={error}
              search={search}
              category="fragrances"
              title="Fragrances"
              emoji="🌸"
              description="Find your favourite fragrances at great prices."
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          }
        />

        <Route
          path="/furniture"
          element={
            <CategoryPage
              products={products}
              loading={loading}
              error={error}
              search={search}
              category="furniture"
              title="Furniture"
              emoji="🛋️"
              description="Upgrade your home with stylish and comfortable furniture."
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          }
        />

        <Route
          path="/laptops"
          element={
            <CategoryPage
              products={products}
              loading={loading}
              error={error}
              search={search}
              category="laptops"
              title="Laptops"
              emoji="💻"
              description="Powerful laptops for work, study and entertainment."
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          }
        />

        <Route
          path="/fashion"
          element={
            <CategoryPage
              products={products}
              loading={loading}
              error={error}
              search={search}
              category="fashion"
              title="Fashion"
              emoji="👗"
              description="Explore stylish fashion products at amazing prices."
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          }
        />

        <Route
          path="/mobiles"
          element={
            <CategoryPage
              products={products}
              loading={loading}
              error={error}
              search={search}
              category="mobiles"
              title="Mobiles"
              emoji="📱"
              description="Explore smartphones and mobile accessories."
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
              addToCart={addToCart}
            />
          }
        />


        {/* =========================
    NOVACART INFORMATION PAGES
========================= */}

        <Route
          path="/about"
          element={<FooterPage type="about" />}
        />

        <Route
          path="/contact"
          element={<FooterPage type="contact" />}
        />

        <Route
          path="/careers"
          element={<FooterPage type="careers" />}
        />

        <Route
          path="/press"
          element={<FooterPage type="press" />}
        />

        <Route
          path="/corporate-information"
          element={<FooterPage type="corporate" />}
        />

        <Route
          path="/payments"
          element={<FooterPage type="payments" />}
        />

        <Route
          path="/shipping"
          element={<FooterPage type="shipping" />}
        />

        <Route
          path="/cancellation-returns"
          element={<FooterPage type="cancellation" />}
        />

        <Route
          path="/faq"
          element={<FooterPage type="faq" />}
        />

        <Route
          path="/support"
          element={<FooterPage type="support" />}
        />

        <Route
          path="/return-policy"
          element={<FooterPage type="returns" />}
        />

        <Route
          path="/terms"
          element={<FooterPage type="terms" />}
        />

        <Route
          path="/privacy"
          element={<FooterPage type="privacy" />}
        />

        <Route
          path="/security"
          element={<FooterPage type="security" />}
        />

        <Route
          path="/sitemap"
          element={<FooterPage type="sitemap" />}
        />

        <Route
          path="/product/:id"
          element={
            <ProductDetails
              products={products}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          }
        />



      </Routes>

      <Footer />
    </>
  );
}
function PromoPopup({ onClose }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
      title: "FLAT 50% OFF",
      subtitle: "Trendy Shirts Collection",
      path: "/fashion?collection=shirts",
    },

    {
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      title: "FLAT 50% OFF",
      subtitle: "Step Into Style 👟",
      path: "/fashion?collection=shoes",
    },

    {
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600",
      title: "FLAT 50% OFF",
      subtitle: "Latest Dresses Collection",
      path: "/fashion?collection=dresses",
    },

    {
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
      title: "FLAT 50% OFF",
      subtitle: "Bags You'll Love 👜",
      path: "/fashion?collection=bags",
    },
  ];

  // // NEXT
  // const nextSlide = () => {
  //   setCurrent((prev) =>
  //     prev === slides.length - 1 ? 0 : prev + 1
  //   );
  // };

  // // PREVIOUS
  // const prevSlide = () => {
  //   setCurrent((prev) =>
  //     prev === 0 ? slides.length - 1 : prev - 1
  //   );
  // };

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(slider);
  }, [slides.length]);


  const slide = slides[current];

  // SHOP NOW
  const handleShopNow = () => {
    onClose();

    setTimeout(() => {
      navigate(slide.path);
    }, 100);
  };

  return (
    <div className="promo-overlay">
      <div className="promo-popup">

        {/* CLOSE */}
        <button
          className="promo-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="promo-content">

          <div className="promo-text">

            <span>
              ✨ NOVACART FASHION SALE
            </span>

            <h2>
              {slide.title}
            </h2>

            <p>
              {slide.subtitle}
            </p>

            <button onClick={handleShopNow}>
              Shop Now →
            </button>

          </div>

          {/* IMAGE */}
          <div className="promo-image">
            <img
              src={slide.image}
              alt={slide.subtitle}
            />
          </div>

        </div>

        {/* PREVIOUS */}
        {/* <button
          className="promo-arrow promo-prev"
          onClick={prevSlide}
        >
          ←
        </button> */}

        {/* NEXT */}
        {/* <button
          className="promo-arrow promo-next"
          onClick={nextSlide}
        >
          →
        </button> */}

        {/* DOTS */}
        <div className="promo-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={
                current === index ? "active" : ""
              }
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;