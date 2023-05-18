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
        {(Received === null)?
        <ul>
        <li><Link to="/Terms-and-conditions" state={Received}> Terms & Conditions</Link></li>
          <li><Link to="/Privacy-policy" state={Received}> Privacy & Policy</Link></li>
          <li><Link to="/AboutUs#cp" state={Received}> Cancellation Policy</Link></li>
          </ul>:(Received.user === undefined)?
          <ul>
          <li><Link to="/Terms-and-conditions" state={Received}> Terms & Conditions</Link></li>
            <li><Link to="/Privacy-policy" state={Received}> Privacy & Policy</Link></li>
            <li><Link to="/AboutUs#cp" state={Received}> Cancellation Policy</Link></li></ul>:
          <ul>
          <li><Link to="/Terms-and-conditions" state={ {status: Received.status, name: Received.name , user:Received.user , type:Received.type , id:Received.id} }> Terms & Conditions</Link></li>
          <li><Link to="/Privacy-policy" state={ {status: Received.status, name: Received.name , user:Received.user , type:Received.type , id:Received.id} }> Privacy & Policy</Link></li>
          <li><Link to="/AboutUs#cp" state={ {status: Received.status, name: Received.name , user:Received.user , type:Received.type , id:Received.id} }> Cancellation Policy</Link></li>
          </ul>
        }
      </div>
      <div className="column">
        <h3>{(Received === null)?<Link to="/AboutUs" state={Received}> About Us</Link>:(Received.user === undefined)?<Link to="/AboutUs" state={Received}> About Us</Link>:<Link to="/AboutUs" state={ {status:Received.status, name: Received.name , user:Received.user , type:Received.type , id:Received.id} }> About Us</Link>}</h3>
        <ul>
          <li>&copy; 2023 Magiccorner. All rights reserved.</li>
          <li><Link to="https://magiccorner.in/">Magiccorner.in</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Faqs;