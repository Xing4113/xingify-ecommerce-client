import { useState } from "react";
import { Collapse } from "react-collapse";
import "./Footer.scss";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Footer = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const footerData = [
    {
      title: "SHOP",
      links: [
        { name: "Men's Shoes", href: "/shop/men" },
        { name: "Women's Shoes", href: "/shop/women" },
        { name: "Kid's Shoes", href: "/shop/kids" },
      ],
    },
    {
      title: "HELP",
      links: [
        { name: "Get Help", href: "#" },
        { name: "Order Status", href: "/orders" },
        { name: "Delivery", href: "#" },
        { name: "Returns", href: "#" },
        { name: "Payment Options", href: "#" },
        { name: "Contact Us", href: "#" },
      ],
    },
    {
      title: "ABOUT",
      links: [
        { name: "Our Story", href: "#" },
        { name: "News", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Sustainability", href: "#" },
      ],
    },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        {footerData.map((section, index) => (
          <div className="footer-section" key={index}>
            <div className="footer-link-desktop">
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} title={link.name}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-link-mobile">
              <button
                className="footer-toggle-btn"
                onClick={() => toggleSection(index)}
                aria-expanded={activeIndex === index}
              >
                <h3>{section.title}</h3>
                <span className="footer-toggle-icons">
                  {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </button>

              <Collapse
                isOpened={activeIndex === index}
                theme={{
                  collapse: "ReactCollapse--collapse",
                  content: "ReactCollapse--content",
                }}
              >
                <ul>
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} title={link.name}>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </Collapse>
            </div>
          </div>
        ))}
      </div>

      <div className="site-footer-bottom">
        <p>© 2025 Xingify, Inc. All Rights Reserved.</p>
        <ul>
          <li>
            <a href="#">Guides</a>
          </li>
          <li>
            <a href="#">Terms of Sale</a>
          </li>
          <li>
            <a href="#">Terms of Use</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Accessibility</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
