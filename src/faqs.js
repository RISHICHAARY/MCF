import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css'
import { AiOutlineInstagram, AiOutlineFacebook, AiOutlineWhatsApp, AiOutlineMail } from 'react-icons/ai';

function Faqs({Received}) {

  return (
    <div className="footer">
      <div className="column">
        <h3>Contact Us</h3>
        <ul>
          <li><Link to="https://www.instagram.com/magic_._corner/"><AiOutlineInstagram/> magic_._corner</Link></li>
          <li><Link to="https://www.facebook.com/profile.php?id=100077511198592"><AiOutlineFacebook/> Magic corner</Link></li>
          <li><Link><AiOutlineMail/> magiccorner@gmail.com</Link></li>
          <li><Link><AiOutlineWhatsApp/> +91234567890</Link></li>
        </ul>
      </div>
      <div className="column">
        <h3>Policies</h3>
        <ul>
          <li><Link to="/privacy-policy"> Terms & Conditions</Link></li>
          <li><Link to="/terms-and-conditions"> Privacy & Policy</Link></li>
          <li><Link to="/cancellation-policy"> Cancellation Policy</Link></li>
          <li><Link to="/faq's"> FAQ'S</Link></li>
        </ul>
      </div>
      <div className="column">
        <h3><Link to="/about-us"> About Us</Link></h3>
        <ul>
          <li>&copy; 2023 Magiccorner. All rights reserved.</li>
          <li><Link to="https://magiccorner.in/">Magiccorner.in</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Faqs