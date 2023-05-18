import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom';
import "../NavBar/navbar.css";

function icons({Received}) {
    return (
        <div className='floaticons'>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {
                    (Received !== null)?
                    <>
                        <li className="side-item">
                            <Link className="side-link" to="/Cart" state={Received}><i class="fi fi-ss-shopping-bag"></i></Link>
                        </li>
                        <li className="side-item">
                            <Link className="side-link" to="/WishList" state={Received}><i class="fi fi-ss-heart"></i></Link>
                        </li>
                        <li className="side-item">
                                <Link className="side-link" to="/Chat" state={Received}><i class="fi fi-sr-comment-alt"></i></Link>
                        </li>
                    </>:
                    <>
                        <li className="side-item">
                            <Link className="side-link" to="/Login" state={Received}><i class="fi fi-ss-shopping-bag"></i></Link>
                        </li>
                        <li className="side-item">
                            <Link className="side-link" to="/Login" state={Received}><i class="fi fi-ss-heart"></i></Link>
                        </li>
                        <li className="side-item">
                            <Link className="side-link" to="/ContactUS"><i class="fi fi-sr-comment-alt"></i></Link>
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}

export default icons;