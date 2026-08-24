import { Link } from "react-router-dom";
import "../css/Footer.css";

function Footer() {
    return (
        <footer className="footer">

            {/* =========================
                FOOTER TOP
            ========================= */}

            <div className="footer-top">

                {/* ABOUT */}
                <div className="footer-column">
                    <h3>ABOUT NOVACART</h3>

                    <Link to="/about">
                        About NovaCart
                    </Link>

                    <Link to="/contact">
                        Contact Us
                    </Link>

                    <Link to="/careers">
                        Careers
                    </Link>

                    <Link to="/press">
                        Press
                    </Link>

                    <Link to="/corporate-information">
                        Corporate Information
                    </Link>
                </div>


                {/* HELP */}
                <div className="footer-column">
                    <h3>HELP & SUPPORT</h3>

                    <Link to="/payments">
                        Payments
                    </Link>

                    <Link to="/shipping">
                        Shipping
                    </Link>

                    <Link to="/cancellation-returns">
                        Cancellation & Returns
                    </Link>

                    <Link to="/faq">
                        FAQ
                    </Link>

                    <Link to="/support">
                        Help Center
                    </Link>
                </div>


                {/* POLICY */}
                <div className="footer-column">
                    <h3>CONSUMER POLICY</h3>

                    <Link to="/return-policy">
                        Return Policy
                    </Link>

                    <Link to="/terms">
                        Terms Of Use
                    </Link>

                    <Link to="/privacy">
                        Privacy Policy
                    </Link>

                    <Link to="/security">
                        Security
                    </Link>

                    <Link to="/sitemap">
                        Sitemap
                    </Link>
                </div>


                {/* SOCIAL */}
                <div className="footer-column">
                    <h3>SOCIAL</h3>

                    <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Instagram
                    </a>

                    <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Facebook
                    </a>

                    <a
                        href="https://x.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Twitter / X
                    </a>

                    <a
                        href="https://www.youtube.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        YouTube
                    </a>

                    <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        LinkedIn
                    </a>
                </div>


                {/* CONTACT */}
                <div className="footer-contact">
                    <h3>CONTACT US</h3>

                    <p>
                        NovaCart Customer Support
                    </p>

                    <p>
                        Email: support@novacart.com
                    </p>

                    <p>
                        Phone: +91 1800 123 4567
                    </p>

                    <p>
                        Mon - Sat: 9:00 AM - 6:00 PM
                    </p>
                </div>


                {/* OFFICE */}
                <div className="footer-contact">
                    <h3>REGISTERED OFFICE</h3>

                    <p>
                        NovaCart Technologies Pvt. Ltd.
                    </p>

                    <p>
                        Sector 62, Gurugram
                    </p>

                    <p>
                        Haryana - 122001
                    </p>

                    <p>
                        India
                    </p>
                </div>

            </div>


            {/* =========================
                FEATURES
            ========================= */}

            <div className="footer-features">

                <div>
                    <span>🚚</span>

                    <div>
                        <strong>
                            Fast Delivery
                        </strong>

                        <small>
                            Quick & reliable delivery
                        </small>
                    </div>
                </div>


                <div>
                    <span>🔒</span>

                    <div>
                        <strong>
                            Secure Payments
                        </strong>

                        <small>
                            Safe & secure checkout
                        </small>
                    </div>
                </div>


                <div>
                    <span>↩️</span>

                    <div>
                        <strong>
                            Easy Returns
                        </strong>

                        <small>
                            Simple return process
                        </small>
                    </div>
                </div>


                <div>
                    <span>💬</span>

                    <div>
                        <strong>
                            Customer Support
                        </strong>

                        <small>
                            We're here to help
                        </small>
                    </div>
                </div>

            </div>


            {/* =========================
                FOOTER BOTTOM
            ========================= */}

            <div className="footer-bottom">

                <Link
                    to="/"
                    className="footer-brand"
                >
                    <strong>Nova</strong>Cart
                </Link>


                <p>
                    © {new Date().getFullYear()} NovaCart.
                    All rights reserved.
                </p>


                <div className="payment-icons">
                    💳 &nbsp; UPI &nbsp; 🏦
                </div>

            </div>

        </footer>
    );
}

export default Footer;
