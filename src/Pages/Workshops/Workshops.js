import React from 'react';
import {useState , useEffect} from 'react';
import {useNavigate , useLocation } from 'react-router-dom';
import Axios from 'axios'; 
import "../../Styles/Products_Workshops.css"
import '../../Styles/Product_Card.css';
import './Workshops.css';
import banner from '../../Images/workshop.png'
import NavBar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
import Footer from '../../Components/Footer/index';
import Loader from '../../Components/Loader/index';

import NoProduct from '../../Images/NoProduct.png'

function Workshop() {
    const [ Loading , setLoading ] = useState(false);

    const Navigate = useNavigate();
    const Location = useLocation();

    const delete_product = (id) => {
        setLoading(true);
        Axios.put('https://bored-wasp-top-hat.cyclic.app/DeleteWorkshop' , {id : id}).then(() =>{
            Axios.get('https://bored-wasp-top-hat.cyclic.app/getAllWorkshops').then((response) => {
            setProducts(response.data);
            setLoading(false);
        });
        });
    };

    const [ Products , setProducts ] = useState([]);

    useEffect( () => {
        setLoading(true);
        Axios.get('https://bored-wasp-top-hat.cyclic.app/getAllWorkshops').then((response) => {
            setProducts(response.data);
            setLoading(false);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [] );

    return (
        <div id="W-Home">
        {
            (Location.state.user === undefined)?<NavBar Received={{page : "W"}}/>:
                <NavBar Received={ {page : "W",status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
        {
            (Location.state.user === undefined)?<SideBar Received={null}/>:
            <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
        <div className='WorkshopSlider'>
            <img src={banner} className='banner'>
            </img>
        </div>
        <div className='display-row'>
                {
                    (Loading)?
                    <Loader/>
                    :
                    (Products.length === 0)?
                    <main class="nothing-content">
                        {/* <div class="nothing-loader"><h2 class="text text-center">No product found.</h2><br></br></div> */}
                        <img className='noprouduct-img' src={NoProduct} alt="no product" />
                        <h2 className='noproduct-text'>No Workshops found</h2>
                        </main>
                    :
                    Products.map((value) => {
                    return(
                        <div className='display-column' key={value._id} >
                            <div className='image-div'>
                            {
                                    (Location.state.user === undefined)?
                                    <img src={value.image[0]} onClick={()=>{Navigate("/ViewWorkShop" , 
                                        {state:{ check: "out" , Product_id : value._id}})}} alt="Product" className='image'></img>
                                    :
                                    <img src={value.image[0]} onClick={()=>{Navigate("/ViewWorkShop" , 
                                        {state:{ check: "in" , Product_id : value._id , status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})}} alt="Product" className='image'></img>
                                }
                                <div className='product-discount-div'>
                                    <p className='product-discount'>{parseInt(((parseInt(value.oldprice) - parseInt(value.newprice))/parseInt(value.oldprice))*100)}%</p>
                                    <p className='product-discount'>OFF</p>
                                </div>
                                {(Location.state!== null && Location.state.type === "admin")?
                                    <>
                                    <button className='delete-button' onClick={() => {delete_product(value._id)}}><i class="fi fi-sr-trash"></i></button>
                                    <button className='edit-button' onClick={() => { 
                                        Navigate('/editWorkshops' , 
                                        {
                                            state:{id : value._id , name: value.name , 
                                            description : value.description , newprice : value.newprice , 
                                            oldprice : value.oldprice , wg : value.watsapp_grp,
                                            user_status: Location.state.status, user_name : Location.state.name , user:Location.state.user , Product_id : value._id , type:Location.state.type , user_id:Location.state.id}} 
                                            )}
                                        }
                                    >
                                    <i class="fi fi-sr-pencil"></i>
                                    </button>
                                    </>:
                                    <></>
                                }
                            </div>
                            <div className='contents-div'>
                                <div className='contents'>
                                    <p className='product-name'>{value.name}</p>
                                    <p className='product-price'><s className='strike'><span className='text-color'>Rs:{value.oldprice}</span></s> Rs:{value.newprice}</p>
                                </div>
                                <div className='buttons'>
                                    {(Location.state === null || Location.state.user === undefined)?
                                    <>
                                        <button className='add-button' onClick={()=>{
                                            Navigate("/Login")
                                        }}>ENROLL</button>
                                        <button className='view-button'
                                            onClick={()=>{
                                                Navigate("/ViewWorkShop" , 
                                        {state:{ check: "out" , Product_id : value._id}})
                                        
                                            }}
                                        >
                                            <i className="fi fi-rr-eye end-icons view-icon"></i>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button className='add-button'
                                        onClick={() =>{
                                            Navigate("/WorkshopConfirmation" , {state:{ Product_id : value._id , status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})
                                        }}>ENROLL</button>
                                        <button className='view-button'
                                            onClick={()=>{
                                                Navigate("/ViewWorkShop" , 
                                        {state:{ check: "in" , Product_id : value._id , status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})
                                        
                                            }}
                                        >
                                            <i className="fi fi-rr-eye end-icons view-icon"></i>
                                        </button>
                                    </>
                                    }
                                </div>
                            </div>
                            <div className='clear'></div>
                        </div>
                        );
                    }
                )
            }
            </div>
            {
                (Location.state === null)?<Footer Received={null}/>:(Location.state.user === undefined)?<Footer Received={null}/>:
                <Footer Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
        </div>
    )
}

export default Workshop;
