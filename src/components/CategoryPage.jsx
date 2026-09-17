import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import "../App.css";
import "../css/CategoryPage.css";

const categoryGroups = {
    // =========================
    // ELECTRONICS
    // =========================
    electronics: [
        "smartphones",
        "mobile-accessories",
        "laptops",
        "tablets",
    ],

    smartphones: [
        "smartphones",
    ],

    "mobile-accessories": [
        "mobile-accessories",
    ],

    laptops: [
        "laptops",
    ],

    tablets: [
        "tablets",
    ],

    // =========================
    // BEAUTY
    // =========================
    beauty: [
        "beauty",
        "skin-care",
    ],

    "skin-care": [
        "skin-care",
    ],

    fragrances: [
        "fragrances",
    ],

    // =========================
    // HOME
    // =========================
    furniture: [
        "furniture",
    ],

    "home-decoration": [
        "home-decoration",
    ],

    // =========================
    // FASHION
    // =========================
    fashion: [
        "mens-shirts",
        "mens-shoes",
        "mens-watches",

        "womens-dresses",
        "womens-shoes",
        "womens-watches",

        "womens-bags",
        "womens-jewellery",

        "tops",
        "sunglasses",
    ],

    "mens-shirts": [
        "mens-shirts",
    ],

    "mens-shoes": [
        "mens-shoes",
    ],

    "mens-watches": [
        "mens-watches",
    ],

    "womens-dresses": [
        "womens-dresses",
    ],

    "womens-shoes": [
        "womens-shoes",
    ],

    "womens-watches": [
        "womens-watches",
    ],

    "womens-bags": [
        "womens-bags",
    ],

    "womens-jewellery": [
        "womens-jewellery",
    ],

    tops: [
        "tops",
    ],

    sunglasses: [
        "sunglasses",
    ],

    // =========================
    // GROCERY
    // =========================
    groceries: [
        "groceries",
    ],

    // =========================
    // SPORTS
    // =========================
    "sports-accessories": [
        "sports-accessories",
    ],

    // =========================
    // VEHICLES
    // =========================
    vehicles: [
        "vehicle",
    ],
};



/* =========================
   FASHION COLLECTIONS
========================= */

const collectionGroups = {

    shirts: [
        "mens-shirts",
    ],

    shoes: [
        "mens-shoes",
        "womens-shoes",
    ],

    dresses: [
        "womens-dresses",
    ],

    watches: [
        "mens-watches",
        "womens-watches",
    ],

    bags: [
        "mens-bags",
        "womens-bags",
    ],

    jewellery: [
        "womens-jewellery",
    ],

    tops: [
        "tops",
    ],

    sunglasses: [
        "sunglasses",
    ],

    mobiles: [
        "smartphones",
    ],

    accessories: [
        "mobile-accessories",
    ],

    laptops: [
        "laptops",
    ],

    tablets: [
        "tablets",
    ],

    electronics: [
        "smartphones",
        "mobile-accessories",
        "laptops",
        "tablets",
    ],

    beauty: [
        "beauty",
        "skin-care",
    ],

    fragrances: [
        "fragrances",
    ],

    furniture: [
        "furniture",
    ],

    sports: [
        "sports-accessories",
    ],

};



/* =========================
   COLLECTION TITLES
========================= */

const collectionTitles = {

    shirts: "Shirts",
    shoes: "Shoes",
    dresses: "Dresses",
    watches: "Watches",
    bags: "Bags",
    jewellery: "Jewellery",
    tops: "Tops",
    sunglasses: "Sunglasses",

    mobiles: "Mobiles",
    accessories: "Mobile Accessories",
    laptops: "Laptops",
    tablets: "Tablets",
    electronics: "Electronics",

    beauty: "Beauty",
    fragrances: "Fragrances",
    furniture: "Furniture",
    sports: "Sports Accessories",

};


function CategoryPage({
    products,
    loading,
    error,
    search,
    category,
    title,
    emoji,
    description,
    addToCart,
    toggleWishlist,
    wishlist,
}) {

    const [sortBy, setSortBy] =
        useState("default");

    const navigate = useNavigate();

    /* =========================
       URL COLLECTION
    ========================= */

    const [searchParams] =
        useSearchParams();

    const collection =
        searchParams.get("collection");


    /* =========================
       ALLOWED CATEGORY
    ========================= */

    const allowedCategories =
        collection &&
            collectionGroups[collection]
            ? collectionGroups[collection]
            : categoryGroups[category] || [category];


    /* =========================
       DISPLAY TITLE
    ========================= */

    const displayTitle =
        collection &&
            collectionTitles[collection]
            ? collectionTitles[collection]
            : title;


    /* =========================
       FILTER PRODUCTS
    ========================= */

    const filteredProducts = useMemo(() => {

        let result = products.filter((product) => {

            const matchesCategory =
                allowedCategories.includes(
                    product.category
                );

            const matchesSearch =
                product.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            return (
                matchesCategory &&
                matchesSearch
            );

        });


        /* PRICE LOW */

        if (sortBy === "low") {

            result = [...result].sort(
                (a, b) =>
                    a.price - b.price
            );

        }


        /* PRICE HIGH */

        if (sortBy === "high") {

            result = [...result].sort(
                (a, b) =>
                    b.price - a.price
            );

        }


        /* RATING */

        if (sortBy === "rating") {

            result = [...result].sort(
                (a, b) =>
                    b.rating - a.rating
            );

        }


        return result;

    }, [
        products,
        search,
        category,
        sortBy,
        collection,
        allowedCategories,
    ]);


    return (

        <main className="category-page">


            {/* =========================
                HERO
            ========================= */}

            <section className="category-hero">

                <div className="category-hero-content">

                    <span className="category-tag">
                        EXPLORE • SHOP • SAVE
                    </span>


                    <h1>

                        {displayTitle}

                        <br />

                        <strong>
                            Collection {emoji}
                        </strong>

                    </h1>


                    <p>
                        {collection
                            ? `Explore our ${displayTitle.toLowerCase()} collection at amazing prices.`
                            : description
                        }
                    </p>


                    {/* SHOP NOW */}

                    {/* <button
                        className="category-shop-btn"
                        onClick={() => {
                            const target = collection
                                ? `/fashion?collection=${collection}`
                                : `/${category}`;

                            navigate(target);
                        }}
                    >
                        Shop Now →
                    </button> */}
                    <button
                        className="category-shop-btn"
                        onClick={() => {
                            if (collection) {
                                navigate(`/fashion?collection=${collection}`);
                            } else {
                                navigate(`/${category}`);
                            }

                            setTimeout(() => {
                                document
                                    .getElementById("category-products")
                                    ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "start",
                                    });
                            }, 100);
                        }}
                    >
                        Shop Now →
                    </button>

                </div>


                <div className="category-art">

                    {emoji}

                </div>

            </section>



            {/* =========================
                HEADER
            ========================= */}

            <section
                className="category-heading"
                id="category-products"
            >

                <div>

                    <h2>

                        {displayTitle} Products

                    </h2>


                    <p>

                        {filteredProducts.length}
                        {" "}
                        products found

                    </p>

                </div>


                <select
                    value={sortBy}
                    onChange={(e) =>
                        setSortBy(
                            e.target.value
                        )
                    }
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

                    <option value="rating">
                        Top Rated
                    </option>

                </select>

            </section>



            {/* =========================
                LOADING
            ========================= */}

            {loading && (

                <div className="state-box">

                    <div className="loader" />

                    <h3>

                        Loading{" "}
                        {displayTitle.toLowerCase()}
                        ...

                    </h3>

                </div>

            )}



            {/* =========================
                ERROR
            ========================= */}

            {error && (

                <div className="state-box">

                    <h3>
                        {error}
                    </h3>

                </div>

            )}



            {/* =========================
                EMPTY
            ========================= */}

            {!loading &&
                !error &&
                filteredProducts.length === 0 && (

                    <div className="state-box">

                        <h3>

                            No{" "}
                            {displayTitle.toLowerCase()}
                            {" "}
                            products found 😕

                        </h3>

                        <p>
                            Try searching for another product.
                        </p>

                    </div>

                )}



            {/* =========================
                PRODUCTS
            ========================= */}

            {!loading &&
                !error &&
                filteredProducts.length > 0 && (

                    <section
                        className="product-grid category-product-grid"
                    >

                        {filteredProducts.map(
                            (product) => (

                                <ProductCard

                                    key={product.id}

                                    product={product}

                                    addToCart={() =>
                                        addToCart(
                                            product
                                        )
                                    }

                                    onWishlist={() =>
                                        toggleWishlist(
                                            product
                                        )
                                    }

                                    isWishlisted={wishlist.some(
                                        (item) =>
                                            item.id ===
                                            product.id
                                    )}

                                />

                            )
                        )}

                    </section>

                )}

        </main>

    );

}

export default CategoryPage;