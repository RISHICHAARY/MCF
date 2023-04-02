import React, { useRef } from 'react'
import './CheckoutConfirmation.css';
import { Link } from 'react-router-dom';

function Faqs({Received}) {
  const pageRef = useRef(null);

  function handleLinkClick() {
    pageRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="footer-items footer-right">
        <nav className="menu-footer-menu-container">
            <ul id="footer-menu" class="footer-menu nav-menu menu">
                <li id="menu-item-166" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-166"><Link className="nav-link" to="/privacy-policy" onClick={handleLinkClick} state={Received}>Privacy Policy</Link></li>
                <li id="menu-item-167" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-167"><Link className="nav-link" to="/terms-and-conditions" onClick={handleLinkClick} state={Received}>Terms and Conditions</Link></li>
                <li id="menu-item-168" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-168"><Link className="nav-link" to="/faq's" onClick={handleLinkClick} state={Received}>FAQs</Link></li>
                <li id="menu-item-168" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-169"><Link className="nav-link" to="/cancellation-policy" onClick={handleLinkClick} state={Received}>Cancellation Policy</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Faqs