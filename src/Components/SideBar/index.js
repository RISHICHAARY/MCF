import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom';
import "../NavBar/navbar.css";

import { AiOutlineShoppingCart , AiOutlineHeart } from "react-icons/ai";
import { BsChatLeftDots } from "react-icons/bs";
import { HiOutlineShoppingCart , HiOutlineHeart , HiOutlineChatAlt } from "react-icons/hi";

function icons({Received}) {
    return (
        <div className='floaticons'>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {
                    (Received !== null)?
                    <>
                        <li className="side-item">
                            <Link className="side-link" to="/Cart" state={Received}><AiOutlineShoppingCart/></Link>
                        </li>
                        <li className="side-item">
                            <Link className="side-link" to="/WishList" state={Received}><AiOutlineHeart/></Link>
                        </li>
                        <li className="side-item">
                                <Link className="side-link" to="/Chat" state={Received}><BsChatLeftDots/></Link>
                        </li>
                    </>:
                    <>
                        <li className="side-item">
                            <Link className="side-link" to="/Login" state={Received}><HiOutlineShoppingCart/></Link>
                        </li>
                        <li className="side-item">
                            <Link className="side-link" to="/Login" state={Received}><HiOutlineHeart/></Link>
                        </li>
                        <li className="side-item">
                            <Link className="side-link" to="/ContactUS"><HiOutlineChatAlt/></Link>
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}

export default icons;