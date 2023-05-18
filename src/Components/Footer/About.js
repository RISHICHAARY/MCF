import React from 'react';
import {useLocation} from 'react-router-dom';

import '../../Pages/Billing/CheckoutConfirmation.css';
// import Fa from './Faq';
import CP from './CP';
import Faqs from './index';
import NavBar from '../NavBar';
import SideBar from '../SideBar/index';

function About() {
    const Location = useLocation();
  return (
    <div className="notice tile-about" id="Home">
        {
            (Location.state === null)?<NavBar Received={{page : "Q"}}/>:(Location.state.user === undefined)?<NavBar Received={{page : "Q"}}/>:
            <NavBar Received={ {page : "H", status:Location.state.status, name:Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
        {
            (Location.state === null)?<SideBar Received={null}/>:(Location.state.user === undefined)?<SideBar Received={null}/>:
            <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
        <div className="owner" data-block="owner">
        <div className='information'>
            <h2>Magic Corner</h2>
        <div className="description">
            <br /><p>Magic corner provides you a vide range of handmade items. Every product is handmade with love by our skilled artists from all over India. Our aim is to help rural women to become financially independent and show their unique skills to the world. Every order on our site is helping a woman out there to make a living. We are grateful for every order you make, keep supporting.</p>
            <p>All products are handmade on order which makes them unique in their own way. And its customised according to your preferences. We at Magic corner offers you premium quality of handmade products and all our artist are trained in expert guidance. </p>
            <p>How we work:</p>
            <p>1. Your ordered is assigned to an artist and make your ordered product specially for you. </p>
            <p>2. Quality check is done by expert.</p>
            <p>3. nicely packed and shipped with our courier partners.</p>
            <p>4. Tracking id is shared on your number.</p>
            <p>5. Product is delivered.</p>
            <p>It takes 5-10 days to deliver your order. If its urgent or any Issue you can contact our support team from our website.</p>
        </div>
        </div>
        </div>
        {/* <Fa/> */}
        <CP/>
        {
            (Location.state === null)?<Faqs Received={null}/>:(Location.state.user === undefined)?<Faqs Received={null}/>:
            <Faqs Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
    </div>
  )
}

export default About