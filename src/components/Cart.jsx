import { useNavigate } from "react-router-dom";
import "../css/Cart.css";

function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  placeOrder,
}) {
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const rupees = Math.round(total * 83).toLocaleString("en-IN");

  return (
    <main className="cart-page">

      {/* PAGE HEADER */}
      <div className="page-title">

        <div>
          <h1>My Cart</h1>

          <p>
            {cartCount(cart)} item
            {cartCount(cart) !== 1 ? "s" : ""}
          </p>
        </div>

        <button onClick={() => navigate("/")}>
          ← Continue Shopping
        </button>

      </div>


      {/* EMPTY CART */}

      {cart.length === 0 ? (

        <div className="empty-cart">

          <div>🛒</div>

          <h2>Your cart is empty</h2>

          <p>
            Add something you love and come back here.
          </p>

          <button onClick={() => navigate("/")}>
            Shop Now
          </button>

        </div>

      ) : (

        <div className="cart-layout">

          {/* CART PRODUCTS */}

          <section className="cart-list">

            {cart.map((item) => (

              <article
                className="cart-card"
                key={item.id}
              >

                <img
                  src={item.thumbnail}
                  alt={item.title}
                />

                <div className="cart-details">

                  <h3>{item.title}</h3>

                  <p>
                    {item.category.replaceAll("-", " ")}
                  </p>

                  <strong>
                    ₹
                    {Math.round(
                      item.price * 83
                    ).toLocaleString("en-IN")}
                  </strong>

                  <div className="qty">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <b>{item.quantity}</b>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </article>

            ))}

          </section>


          {/* PRICE DETAILS */}

          <aside className="price-card">

            <h3>PRICE DETAILS</h3>

            <div>

              <span>
                Price ({cartCount(cart)} items)
              </span>

              <b>
                ₹{rupees}
              </b>

            </div>

            <div>

              <span>Delivery</span>

              <b className="green">
                FREE
              </b>

            </div>

            <hr />

            <div className="total-row">

              <span>Total Amount</span>

              <b>
                ₹{rupees}
              </b>

            </div>

            <p className="safe">
              🔒 Safe and secure payments
            </p>


            {/* PLACE ORDER */}

            <button
              className="checkout-btn"
              onClick={placeOrder}
            >
              Place Order
            </button>

          </aside>

        </div>

      )}

    </main>
  );
}


const cartCount = (cart) =>
  cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );


export default Cart;