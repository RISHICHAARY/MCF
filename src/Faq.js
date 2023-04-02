import React from 'react';
import {useLocation} from 'react-router-dom';
import NavBar from './navbar';
import SideBar from './SideBar';
import Faqs from './faqs';

export default function Fa(){

    const Location = useLocation();

    return(
        <>
            {
                (Location.state === null)?<NavBar Received={{page : "Q"}}/>:(Location.state.user === undefined)?<NavBar Received={{page : "Q"}}/>:
                <NavBar Received={ {page : "H", status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Location.state === null)?<SideBar Received={null}/>:(Location.state.user === undefined)?<SideBar Received={null}/>:
                <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            <div className="notice tile-about">
                    <div className="owner" data-block="owner">
                        <div className='information'>
                                <h2>FAQ's</h2>
                            <div className="author">
                                    {/* -. */}
                            </div>
                            <div className="description">
                                <p></p><p><b><u>Disclaimer</u><br /></b></p><p>Our beautiful products are 100% hand made with love, so as a result of human manual involvement there might be slight irregularities in color, size and knots than portrayed in pictures. These irregularities are the hallmark of hand made product and make each exquisite piece one-of-its-kind.</p><p></p><p><b><u>IMPORTANT</u></b></p><p><b>1. </b><b>Spools below 50meter will be handmade. For machine made spools buy above 50meter.</b></p><p><b>2.Please make a video while opening your package to claim any damage or missing article.</b></p><p><b>3. Cancellation after booking an order will cost you Razorpay fee. </b><b>Remaining </b><b>balance</b><b> will be refunded.</b></p><p></p><p></p><p><u><b>SHIPPING</b></u></p><p>We now ship worldwide!!!</p><p>Macramé is a handmade product which is made to order. Please coordinate with us after placing the order. (For your estimate delivery date)</p><p>Kindly allow 5-20 days(as per product kind) for dispatch.&nbsp;</p><p>Bulk or custom orders might take longer to dispatch.&nbsp;</p><p>However, shipping time is completely dependent on the shipping vendor and your locations.</p><p></p><p></p><p><u><b>RETURN</b></u></p><p>We want you to be happy with your order from us. However, since we are a small business, we are unable to offer refunds if you change your mind about an order. We will happily replace any defective or broken product. Please contact us within 48 hours via Instagram with supporting pictures as a proof of damage. After 48 hours return of the damaged product will not be liable. After the approval of images the product need to be sent by the customer itself within 7 days. WE WILL NOT COVER RETURN SHIPPING FROM THE CUSTOMER'S END. We will then send a fresh piece of same defective product within the time limit mentioned above. Please take care when mailing any items back to us. We cannot be responsible for any further damage which occurs during transit.</p><p></p><p></p><p></p><p></p><p><u><b>DURABILITY</b></u></p><p>For better durability and color don’t hang in sunlight. As these are dyed ropes so there is No Guarantee of color longevity.</p><p></p><p><u><b>CITY OF ORIGIN</b></u> – INDIA</p><p></p>
                            </div>
                            <div className="cb"></div>
                        </div>
                    </div>
                </div>
        {
            (Location.state === null)?<Faqs Received={null}/>:(Location.state.user === undefined)?<Faqs Received={null}/>:
            <Faqs Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
        </>
    )
}
