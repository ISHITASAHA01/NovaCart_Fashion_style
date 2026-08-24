import { Link } from "react-router-dom";
import "../css/FooterPages.css";

const pageData = {
    about: {
        eyebrow: "ABOUT NOVACART",
        title: "Shopping made simple.",
        intro:
            "NovaCart is a modern online shopping platform designed to make everyday shopping simple, convenient and enjoyable.",
        sections: [
            {
                title: "Our Mission",
                text:
                    "Our mission is to bring a wide range of products together in one convenient place while keeping the shopping experience simple, transparent and reliable.",
            },
            {
                title: "What We Offer",
                text:
                    "From fashion and beauty to mobiles, laptops, furniture and everyday essentials, NovaCart helps you discover products across multiple categories.",
            },
            {
                title: "Why NovaCart?",
                text:
                    "We focus on easy navigation, competitive prices, secure checkout, convenient delivery and a straightforward returns experience.",
            },
        ],
    },

    contact: {
        eyebrow: "GET IN TOUCH",
        title: "We're here to help.",
        intro:
            "Have a question about an order, product, payment or return? Our support team is ready to help.",
        sections: [
            {
                title: "Customer Support",
                text:
                    "For order-related questions, delivery updates, returns and general assistance, contact our customer support team.",
            },
            {
                title: "Email",
                text:
                    "support@novacart.com",
            },
            {
                title: "Phone",
                text:
                    "+91 1800 123 4567\nMonday - Saturday, 9:00 AM - 6:00 PM",
            },
            {
                title: "Registered Office",
                text:
                    "NovaCart Technologies Pvt. Ltd.\nSector 62, Gurugram, Haryana - 122001\nIndia",
            },
        ],
    },

    careers: {
        eyebrow: "CAREERS",
        title: "Build the future of shopping with us.",
        intro:
            "We're building a customer-first shopping experience and looking for people who love solving real problems.",
        sections: [
            {
                title: "Why Work With NovaCart?",
                text:
                    "Work on products used by shoppers every day, collaborate with a growing team and help shape the future of online commerce.",
            },
            {
                title: "Technology",
                text:
                    "We work with modern web technologies and continuously improve our platform, performance and customer experience.",
            },
            {
                title: "Open Positions",
                text:
                    "For current opportunities, send your resume and area of interest to careers@novacart.com.",
            },
        ],
    },

    press: {
        eyebrow: "PRESS & MEDIA",
        title: "NovaCart in the spotlight.",
        intro:
            "For media enquiries, company information and official statements, our press team can help.",
        sections: [
            {
                title: "Media Enquiries",
                text:
                    "For interviews, press releases, partnerships and media requests, contact our communications team.",
            },
            {
                title: "Press Contact",
                text:
                    "press@novacart.com",
            },
            {
                title: "About NovaCart",
                text:
                    "NovaCart is an online shopping platform offering products across fashion, beauty, electronics, furniture and everyday essentials.",
            },
        ],
    },

    corporate: {
        eyebrow: "CORPORATE INFORMATION",
        title: "NovaCart Technologies",
        intro:
            "Information about the company behind NovaCart.",
        sections: [
            {
                title: "Company",
                text:
                    "NovaCart Technologies Pvt. Ltd. operates the NovaCart online shopping platform.",
            },
            {
                title: "Registered Office",
                text:
                    "Sector 62, Gurugram, Haryana - 122001, India.",
            },
            {
                title: "Business",
                text:
                    "Our platform connects customers with products across multiple shopping categories through a convenient online experience.",
            },
        ],
    },

    payments: {
        eyebrow: "PAYMENTS",
        title: "Simple and secure payments.",
        intro:
            "NovaCart supports convenient payment methods to make checkout easy.",
        sections: [
            {
                title: "Payment Methods",
                text:
                    "Depending on availability, customers may use cards, UPI, net banking and other supported payment methods during checkout.",
            },
            {
                title: "Payment Security",
                text:
                    "Payment information should always be entered only on the secure checkout experience provided by NovaCart and its authorized payment partners.",
            },
            {
                title: "Payment Issues",
                text:
                    "If your payment was successful but your order was not confirmed, please contact customer support with your transaction details.",
            },
        ],
    },

    shipping: {
        eyebrow: "SHIPPING",
        title: "Delivery that keeps you moving.",
        intro:
            "We aim to make delivery convenient and transparent from checkout to doorstep.",
        sections: [
            {
                title: "Delivery Time",
                text:
                    "Estimated delivery time can vary depending on the product, seller, delivery location and availability.",
            },
            {
                title: "Order Tracking",
                text:
                    "Once tracking information becomes available, customers can use their order details to follow the delivery status.",
            },
            {
                title: "Delivery Delays",
                text:
                    "Weather, logistics issues, public holidays and other unexpected circumstances may occasionally affect delivery timelines.",
            },
        ],
    },

    cancellation: {
        eyebrow: "CANCELLATION & RETURNS",
        title: "Plans changed? We've got you.",
        intro:
            "NovaCart aims to make cancellation and returns as simple as possible.",
        sections: [
            {
                title: "Order Cancellation",
                text:
                    "Orders may be cancelled before they enter the shipping or processing stage, subject to the applicable order status.",
            },
            {
                title: "Returns",
                text:
                    "Return eligibility can vary by product category and seller. Always check the applicable return information for your order.",
            },
            {
                title: "Refunds",
                text:
                    "Once an eligible return is processed, refunds are generally initiated according to the applicable payment and refund process.",
            },
        ],
    },

    faq: {
        eyebrow: "FREQUENTLY ASKED QUESTIONS",
        title: "How can we help?",
        intro:
            "Here are answers to some common NovaCart questions.",
        faqs: [
            {
                q: "How can I place an order?",
                a:
                    "Browse a product, add it to your cart and continue to checkout to complete your purchase.",
            },
            {
                q: "Can I cancel my order?",
                a:
                    "Cancellation depends on the current status of your order. Orders that have already entered processing or shipping may not be cancellable.",
            },
            {
                q: "How do I return a product?",
                a:
                    "Open your order details and check whether the product is eligible for return. Follow the return instructions shown for that order.",
            },
            {
                q: "How can I contact support?",
                a:
                    "You can contact NovaCart support at support@novacart.com or +91 1800 123 4567.",
            },
            {
                q: "Is online payment secure?",
                a:
                    "NovaCart uses secure checkout and authorized payment processing. Never share your OTP, password or payment PIN with anyone.",
            },
        ],
    },

    support: {
        eyebrow: "HELP CENTER",
        title: "How can we help you today?",
        intro:
            "Find quick help for orders, payments, delivery and returns.",
        cards: [
            {
                icon: "📦",
                title: "Orders",
                text: "Track your order or get help with an order issue.",
            },
            {
                icon: "💳",
                title: "Payments",
                text: "Get help with payment and checkout problems.",
            },
            {
                icon: "🚚",
                title: "Delivery",
                text: "Learn about delivery timelines and tracking.",
            },
            {
                icon: "↩️",
                title: "Returns",
                text: "Understand return and refund processes.",
            },
        ],
    },

    returns: {
        eyebrow: "RETURN POLICY",
        title: "Easy returns, clear policies.",
        intro:
            "Our return process is designed to be simple while following product-specific eligibility requirements.",
        sections: [
            {
                title: "Return Eligibility",
                text:
                    "Return eligibility depends on the product category, seller and condition of the item. Some products may be non-returnable.",
            },
            {
                title: "Product Condition",
                text:
                    "Returned products should generally be unused and include original packaging, accessories, tags and documentation where applicable.",
            },
            {
                title: "Refund",
                text:
                    "Eligible refunds are processed after the returned product is received and the applicable verification is completed.",
            },
        ],
    },

    terms: {
        eyebrow: "LEGAL",
        title: "Terms of Use",
        intro:
            "These terms describe the general rules for using the NovaCart platform.",
        sections: [
            {
                title: "Using NovaCart",
                text:
                    "By accessing or using NovaCart, you agree to use the platform lawfully and responsibly.",
            },
            {
                title: "Accounts",
                text:
                    "You are responsible for maintaining the confidentiality of your account credentials and for activity carried out through your account.",
            },
            {
                title: "Products & Pricing",
                text:
                    "Product information, availability, prices and offers may change from time to time. Errors may occasionally occur and may need correction.",
            },
            {
                title: "Changes",
                text:
                    "NovaCart may update these terms when necessary. Updated terms will apply from the date they are published.",
            },
        ],
    },

    privacy: {
        eyebrow: "YOUR PRIVACY",
        title: "Privacy Policy",
        intro:
            "We believe customers should understand how information is handled when using NovaCart.",
        sections: [
            {
                title: "Information We Collect",
                text:
                    "Depending on how you use the platform, information may include account details, contact information, order information and technical information required to operate the service.",
            },
            {
                title: "How Information Is Used",
                text:
                    "Information may be used to process orders, provide support, improve the platform, communicate important updates and help protect our services.",
            },
            {
                title: "Your Choices",
                text:
                    "You can contact NovaCart support regarding questions about your account information or privacy-related requests.",
            },
            {
                title: "Security",
                text:
                    "We use reasonable measures intended to protect information handled through the platform.",
            },
        ],
    },

    security: {
        eyebrow: "SECURITY",
        title: "Your security matters.",
        intro:
            "We work to keep your NovaCart experience safe and secure.",
        sections: [
            {
                title: "Account Security",
                text:
                    "Use a strong password and never share your password, OTP, PIN or authentication codes with anyone.",
            },
            {
                title: "Secure Shopping",
                text:
                    "Always access NovaCart through the official website or application and be cautious of suspicious messages or links.",
            },
            {
                title: "Report Suspicious Activity",
                text:
                    "If you believe your account has been compromised, contact NovaCart support as soon as possible.",
            },
        ],
    },

    sitemap: {
        eyebrow: "NOVACART",
        title: "Sitemap",
        intro:
            "Quickly find your way around NovaCart.",
        links: [
            { label: "Home", path: "/" },
            { label: "Fashion", path: "/fashion" },
            { label: "Beauty", path: "/beauty" },
            { label: "Mobiles", path: "/mobiles" },
            { label: "Laptops", path: "/laptops" },
            { label: "Furniture", path: "/furniture" },
            { label: "Grocery", path: "/grocery" },
            { label: "Cart", path: "/cart" },
            { label: "Wishlist", path: "/wishlist" },
            { label: "Profile", path: "/profile" },
            { label: "About NovaCart", path: "/about" },
            { label: "Contact Us", path: "/contact" },
            { label: "Help Center", path: "/support" },
            { label: "FAQ", path: "/faq" },
            { label: "Return Policy", path: "/return-policy" },
            { label: "Privacy Policy", path: "/privacy" },
            { label: "Terms of Use", path: "/terms" },
        ],
    },
};

function FooterPage({ type }) {
    const data = pageData[type];

    if (!data) {
        return (
            <div className="footer-page">
                <h1>Page not found</h1>
                <Link to="/">Go Home</Link>
            </div>
        );
    }

    return (
        <main className="footer-page">

            <section className="footer-page-hero">
                <span>{data.eyebrow}</span>

                <h1>{data.title}</h1>

                <p>{data.intro}</p>
            </section>

            {data.cards && (
                <section className="footer-page-cards">
                    {data.cards.map((card) => (
                        <div className="help-card" key={card.title}>
                            <div className="help-icon">
                                {card.icon}
                            </div>

                            <h3>{card.title}</h3>

                            <p>{card.text}</p>
                        </div>
                    ))}
                </section>
            )}

            {data.sections && (
                <section className="footer-page-content">
                    {data.sections.map((section) => (
                        <article key={section.title}>
                            <h2>{section.title}</h2>

                            <p>
                                {section.text}
                            </p>
                        </article>
                    ))}
                </section>
            )}

            {data.faqs && (
                <section className="footer-page-content faq-list">
                    {data.faqs.map((faq) => (
                        <article key={faq.q}>
                            <h2>{faq.q}</h2>

                            <p>{faq.a}</p>
                        </article>
                    ))}
                </section>
            )}

            {data.links && (
                <section className="sitemap-grid">
                    {data.links.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="sitemap-link"
                        >
                            <span>{link.label}</span>
                            <strong>→</strong>
                        </Link>
                    ))}
                </section>
            )}

            <section className="footer-page-cta">
                <div>
                    <span>NEED MORE HELP?</span>

                    <h2>
                        We're always happy to help.
                    </h2>

                    <p>
                        Contact our support team for assistance.
                    </p>
                </div>

                <Link to="/contact">
                    Contact Support →
                </Link>
            </section>

        </main>
    );
}

export default FooterPage;
