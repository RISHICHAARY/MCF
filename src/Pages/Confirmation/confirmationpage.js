import React from 'react';
import './confirmpage.css';
import { useNavigate  , useLocation} from 'react-router-dom';
import SuccessImg from '../../Images/Success.png';

import Footer from '../../Components/Footer/index';
import NavBar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
function Confirm(){

    const Navigate = useNavigate();
    const Location = useLocation();
    return(
        <div id="Home">
            {
                (Location.state === null)?<NavBar Received={{page : "CV"}}/>:(Location.state.user === undefined)?<NavBar Received={{page : "H"}}/>:
                <NavBar Received={ {page : "CV", status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Location.state === null)?<SideBar Received={null}/>:(Location.state.user === undefined)?<SideBar Received={null}/>:
                <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            <div className='order-confirmed'>
                <b><h3 className='confirm-text'>Your order is confirmed successfully</h3></b>
                <img className='success-img' src={SuccessImg} alt="success" />
                <h4>Thanks for your purchase.</h4>
                <p>You will receive an order confirmation details for your order.</p>
                <button className='go-back-btn'
                    onClick={()=>{
                        (Location.state.type==="user")?
                        Navigate("/" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})
                        :
                        Navigate("/Dashboard" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})
                    }} 
                >GO BACK</button>
            </div>
            {
            (Location.state === null)?<Footer Received={null}/>:(Location.state.user === undefined)?<Footer Received={null}/>:
            <Footer Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
        </div>
    )

}

export default Confirm;