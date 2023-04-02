import React from 'react';
import {useLocation} from 'react-router-dom';
import NavBar from './navbar';
import SideBar from './SideBar';
import Faqs from './faqs';

export default function CP(){

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
                                <h2>Cancellation Policy</h2>
                            <div className="author">
                                    {/* -. */}
                            </div>
                            <div className="description">
                                <br /><p>Hi there, you are our valued customer and we are always here to assist you. Our products are customised and handmade on order specially for you. So, once an order is placed, it can’t be cancelled / refunded. </p>
                                <p>All orders are packed carefully, however, if due to shipment a fragile product gets damaged or broke, you can apply for exchange. UNBOXING VIDEO IS NECESSARY FOR EXCHANGE. Please reach out to us within 48 hrs of delivery for an exchange with unboxing video. After 48 hrs of delivery, we are not answerable and no exchange application will be considered. Once your exchange gets approved, you have to ship the product to us as it is. After receiving damaged product, we will make a new product and we will ship it to you.</p>
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
