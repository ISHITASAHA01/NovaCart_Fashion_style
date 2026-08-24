import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

import "../App.css";
import "../css/Grocery.css";

// =========================
// GROCERY PRODUCTS
// =========================

const groceryProducts = [
    // FRUITS
    {
        id: "g1",
        title: "Fresh Apples",
        category: "Fruits",
        price: 120,
        discountPercentage: 10,
        rating: 4.5,
        stock: 25,
        thumbnail:
            "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500",
    },
    {
        id: "g2",
        title: "Fresh Bananas",
        category: "Fruits",
        price: 60,
        discountPercentage: 5,
        rating: 4.4,
        stock: 40,
        thumbnail:
            "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500",
    },
    {
        id: "g3",
        title: "Fresh Oranges",
        category: "Fruits",
        price: 90,
        discountPercentage: 8,
        rating: 4.3,
        stock: 30,
        thumbnail:
            "https://images.unsplash.com/photo-1547514701-42782101795e?w=500",
    },
    {
        id: "g4",
        title: "Fresh Mangoes",
        category: "Fruits",
        price: 150,
        discountPercentage: 12,
        rating: 4.6,
        stock: 20,
        thumbnail:
            "https://images.unsplash.com/photo-1553279768-865429fa0078?w=500",
    },

    // VEGETABLES
    {
        id: "g5",
        title: "Fresh Potatoes",
        category: "Vegetables",
        price: 45,
        discountPercentage: 5,
        rating: 4.2,
        stock: 50,
        thumbnail:
            "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500",
    },
    {
        id: "g6",
        title: "Fresh Tomatoes",
        category: "Vegetables",
        price: 55,
        discountPercentage: 10,
        rating: 4.4,
        stock: 35,
        thumbnail:
            "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=500",
    },
    {
        id: "g7",
        title: "Fresh Carrots",
        category: "Vegetables",
        price: 70,
        discountPercentage: 8,
        rating: 4.3,
        stock: 30,
        thumbnail:
            "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=500",
    },
    {
        id: "g8",
        title: "Fresh Onions",
        category: "Vegetables",
        price: 50,
        discountPercentage: 6,
        rating: 4.2,
        stock: 45,
        thumbnail:
            "https://images.unsplash.com/photo-1508747703725-719777637510?w=500",
    },

    // DAIRY & EGGS
    {
        id: "g9",
        title: "Fresh Milk",
        category: "Dairy & Eggs",
        price: 65,
        discountPercentage: 4,
        rating: 4.6,
        stock: 30,
        thumbnail:
            "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500",
    },
    {
        id: "g10",
        title: "Fresh Paneer",
        category: "Dairy & Eggs",
        price: 110,
        discountPercentage: 7,
        rating: 4.5,
        stock: 20,
        thumbnail:
            "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500",
    },
    {
        id: "g11",
        title: "Cheese",
        category: "Dairy & Eggs",
        price: 140,
        discountPercentage: 10,
        rating: 4.4,
        stock: 18,
        thumbnail:
            "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500",
    },
    {
        id: "g12",
        title: "Farm Fresh Eggs",
        category: "Dairy & Eggs",
        price: 90,
        discountPercentage: 5,
        rating: 4.5,
        stock: 35,
        thumbnail:
            "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=500",
    },

    // SNACKS
    {
        id: "g13",
        title: "Chocolate Biscuits",
        category: "Snacks",
        price: 40,
        discountPercentage: 10,
        rating: 4.4,
        stock: 40,
        thumbnail:
            "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500",
    },
    {
        id: "g14",
        title: "Potato Chips",
        category: "Snacks",
        price: 30,
        discountPercentage: 5,
        rating: 4.3,
        stock: 50,
        thumbnail:
            "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500",
    },
    {
        id: "g15",
        title: "Mixed Namkeen",
        category: "Snacks",
        price: 80,
        discountPercentage: 8,
        rating: 4.2,
        stock: 25,
        thumbnail:
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500",
    },
    {
        id: "g16",
        title: "Cookies",
        category: "Snacks",
        price: 75,
        discountPercentage: 12,
        rating: 4.5,
        stock: 30,
        thumbnail:
            "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500",
    },

    // BEVERAGES
    {
        id: "g17",
        title: "Orange Juice",
        category: "Beverages",
        price: 120,
        discountPercentage: 10,
        rating: 4.4,
        stock: 20,
        thumbnail:
            "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500",
    },
    {
        id: "g18",
        title: "Green Tea",
        category: "Beverages",
        price: 180,
        discountPercentage: 8,
        rating: 4.5,
        stock: 25,
        thumbnail:
            "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500",
    },
    {
        id: "g19",
        title: "Coffee",
        category: "Beverages",
        price: 220,
        discountPercentage: 12,
        rating: 4.6,
        stock: 18,
        thumbnail:
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    },
    {
        id: "g20",
        title: "Fresh Lemon Drink",
        category: "Beverages",
        price: 90,
        discountPercentage: 7,
        rating: 4.3,
        stock: 30,
        thumbnail:
            "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500",
    },
];


// =========================
// GROCERY COMPONENT
// =========================

function Grocery({
    search,
    addToCart,
    toggleWishlist,
    wishlist,
}) {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    // Grocery categories
    const categories = [
        "All",
        "Fruits",
        "Vegetables",
        "Dairy & Eggs",
        "Snacks",
        "Beverages",
    ];

    // =========================
    // FILTER + SEARCH + SORT
    // =========================

    const filteredProducts = useMemo(() => {
        let result = groceryProducts.filter((product) => {
            const searchText = search.toLowerCase().trim();

            const matchesSearch =
                product.title.toLowerCase().includes(searchText) ||
                product.category.toLowerCase().includes(searchText);

            const matchesCategory =
                selectedCategory === "All" ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        if (sortBy === "low") {
            result = [...result].sort((a, b) => a.price - b.price);
        }

        if (sortBy === "high") {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        return result;
    }, [search, selectedCategory, sortBy]);

    return (
        <main className="grocery-page">

            {/* =========================
          GROCERY HERO
      ========================= */}

            <section className="grocery-hero">
                <div className="grocery-hero-content">
                    <span className="grocery-tag">
                        FRESH • DAILY • ESSENTIALS
                    </span>

                    <h1>
                        Fresh groceries.
                        <br />
                        <strong>Delivered to you.</strong>
                    </h1>

                    <p>
                        Fruits, vegetables, dairy, snacks and more.
                    </p>

                    <button
                        onClick={() =>
                            document
                                .getElementById("grocery-products")
                                ?.scrollIntoView({
                                    behavior: "smooth",
                                })
                        }
                    >
                        Shop Grocery →
                    </button>
                </div>

                <div className="grocery-art">
                    🥦 🍎 🥛
                </div>
            </section>


            {/* =========================
          GROCERY CATEGORIES
      ========================= */}

            <section className="grocery-categories">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={
                            selectedCategory === category ? "active" : ""
                        }
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </section>


            {/* =========================
          PRODUCTS HEADER
      ========================= */}

            <section
                className="grocery-heading"
                id="grocery-products"
            >
                <div>
                    <h2>
                        {selectedCategory === "All"
                            ? "All Groceries"
                            : selectedCategory}
                    </h2>

                    <p>
                        {filteredProducts.length} products found
                    </p>
                </div>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="default">
                        Sort by
                    </option>

                    <option value="low">
                        Price: Low to High
                    </option>

                    <option value="high">
                        Price: High to Low
                    </option>
                </select>
            </section>


            {/* =========================
          PRODUCTS
      ========================= */}

            {filteredProducts.length === 0 ? (
                <div className="state-box">
                    <h3>
                        No grocery products found 😕
                    </h3>

                    <button
                        onClick={() => {
                            setSelectedCategory("All");
                        }}
                    >
                        Show All Groceries
                    </button>
                </div>
            ) : (
                <section className="product-grid grocery-grid">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={() => addToCart(product)}
                            onWishlist={() =>
                                toggleWishlist(product)
                            }
                            isWishlisted={wishlist.some(
                                (item) => item.id === product.id
                            )}
                        />
                    ))}
                </section>
            )}
        </main>
    );
}

export default Grocery;