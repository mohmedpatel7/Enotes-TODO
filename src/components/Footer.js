import React from "react";
import "./style/style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h2>Contact Us</h2>
        <ul className="social-links">
          <li>
            <a
              href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJfsdbmDfVQZTvRxhSsdTLCZFPqvbzVQbRZvhJjlmSrTDZvvGXWZTSHzzNglJMcLczlBFGV"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-regular fa-envelope"></i>
            </a>
          </li>
          <li>
            <a
              href="https://x.com/MOHMED_PATEL_7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-x-twitter"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/mumu_7_7/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
