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
import NoProduct from '../../Images/NoProduct.png';

import '../../Components/Reviews/review.css'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


function Workshop() {
    const [ Loading , setLoading ] = useState(false);

    const [ ActiveImage , setActiveImage ] = useState("");
    const [ NonActiveImage , setNonActiveImage ] = useState([]);
    const [ ActiveValue , setActiveValue ] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null);
    const [ people , setpeople ] = useState([]);
    const [ RName , setRName ] = useState(null);
    const [ RLoc , setRLoc ] = useState(null);
    const [ RReview , setRReview ] = useState(null);
    const [ RRating , setRRating ] = useState(null);
    const [ Length , setLength ] = useState(0);

    const Navigate = useNavigate();
    const Location = useLocation();

    const delete_product = (id) => {
        setLoading(true);
        Axios.put('http://localhost:3001/DeleteWorkshop' , {id : id}).then(() =>{
            Axios.get('http://localhost:3001/getAllWorkshops').then((response) => {
            setProducts(response.data);
            setLoading(false);
        });
        });
    };

    const [ Products , setProducts ] = useState([]);
    const [ Modes , setModes ] = useState([]);

    const Filter2 = (Cata) => {
        setLoading(true);
        if(Cata === "All"){
            Axios.get('http://localhost:3001/getAllWorkshops').then((response) => {
            setProducts(response.data);
            Axios.get('http://localhost:3001/getMode').then((response) => {
                setModes(response.data);
                setLoading(false);
            })
        });
        }
        else{
        Axios.put('http://localhost:3001/getWs' , {Category : Cata}).then((response) => {
            setProducts(response.data);
            Axios.get('http://localhost:3001/getMode').then((response) => {
                setModes(response.data);
                setLoading(false);
            });
        });
    }
    }

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    useEffect( () => {
        setLoading(true);
        if(Location.state.Cata !== undefined){Filter2()}
        else{
        Axios.get('http://localhost:3001/getAllWorkshops').then((response) => {
            setProducts(response.data);
            Axios.get('http://localhost:3001/getMode').then((response) => {
                setModes(response.data);
                Axios.get('http://localhost:3001/getWReview').then((response) => {
                        setpeople(response.data);
                        setRName(response.data[0].name);
                        setRLoc(response.data[0].loc);
                        setRReview(response.data[0].rev);
                        setRRating(response.data[0].rating);
                        setActiveImage(response.data[0].image[0]);
                        setNonActiveImage(response.data[0].image);
                        setLength(response.data.length);
                        setLoading(false);
                    })
            })
        });}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [] );


    const [index, setIndex] = useState(0);

  const stars = Array.from({ length: 5 }, (_, i) =>
    i < RRating ? "★" : "☆"
  );

  const nextPerson = () => {
    if(index+1<Length){
        setIndex(index+1);
        setRName(people[index+1].name);
        setRLoc(people[index+1].loc);
        setRReview(people[index+1].rev);
        setRRating(people[index+1].rating);
        setActiveImage(people[index+1].image[0]);
        setNonActiveImage(people[index+1].image);
    }
    else{
        setIndex(0);
        setRName(people[0].name);
        setRLoc(people[0].loc);
        setRReview(people[0].rev);
        setRRating(people[0].rating);
        setActiveImage(people[0].image[0]);
        setNonActiveImage(people[0].image);
    }
  };

  const prevPerson = () => {
    if(index-1>=0){
        setIndex(index-1);
        setRName(people[index-1].name);
        setRLoc(people[index-1].loc);
        setRReview(people[index-1].rev);
        setRRating(people[index-1].rating);
        setActiveImage(people[index-1].image[0]);
        setNonActiveImage(people[index-1].image);
    }
    else{
        setIndex(Length-1);
        setRName(people[Length-1].name);
        setRLoc(people[Length-1].loc);
        setRReview(people[Length-1].rev);
        setRRating(people[Length-1].rating);
        setActiveImage(people[Length-1].image[0]);
        setNonActiveImage(people[Length-1].image);
    }
}
const handleTouchMove = (e) => {
    const touchDown = touchPosition

    if(touchDown === null) {
        return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    if (diff > 5) {
        var f11 = ActiveValue;
        if(ActiveValue > 0){
            setActiveValue(ActiveValue-1);
            f11=f11-1;
            setActiveImage(NonActiveImage[f11]);
        }
        else{
            setActiveValue(NonActiveImage.length-1);
            f11=NonActiveImage.length-1
            setActiveImage(NonActiveImage[f11]);
        }
        
    }

    if (diff < -5) {
        var f1 = ActiveValue;
        if(ActiveValue < NonActiveImage.length-1){
            setActiveValue(ActiveValue+1);
            f1=f1+1;
            setActiveImage(NonActiveImage[f1]);
        }
        else{
            setActiveValue(0);
            f1=0;
            setActiveImage(NonActiveImage[f1]);
        }
    }

    setTouchPosition(null)
}

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
        {
            (Loading)?
            <Loader/>
            :<>
            <div className='categories display-row'>
                <p className='D-header'>CATEGORIES</p>
                <button className='display-column-1-butt' onClick={()=>{Filter2("All")}} >
                    <div className='display-column-1'>
                        <div className='image-div-1'>
                        </div>
                        <div className='product-discount-div-1'>
                            <p className='Cate-text All'>ALL</p>
                        </div>
                    </div>
                </button>
                {
                    Modes.map((value)=>{
                        return(
                            <>                            
                            <button className='display-column-1-butt' onClick={()=>{Filter2(value.name)}}>
                                <div className='display-column-1' key={value._id} >
                                    <div className='image-div-1'>
                                        <img src={value.image} alt='Category' className='image-1'/>
                                    </div>
                                    <div className='product-discount-div-1'>
                                        <p className='Cate-text'>{value.name}</p>
                                    </div>
                                </div>
                            </button>
                        </>
                        );
                    })
                }
            </div>
        <div className='display-row'>
            <p className='D-header'>WORKSHOPS</p>
                {
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
            <div className="main-review-div">
                <section className="review-div">
                    <div className="title">
                        <h2>REVIEWS</h2>
                        <div className="underline"></div>
                    </div>
                    <article className="review">
                        <div className='flex-container'>
                            <div className='flex-child' onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                                {/*<button className='prev-button-rev' onClick={()=>{
                                    var f = ActiveValue;
                                    if(ActiveValue > 0){
                                    setActiveValue(ActiveValue-1);
                                    f=f-1;
                                    setActiveImage(NonActiveImage[f]);
                                    }
                                    else{
                                    setActiveValue(NonActiveImage.length-1);
                                    f=NonActiveImage.length-1
                                    setActiveImage(NonActiveImage[f]);
                                    }
                                    }}
                                >
                                        <i class="fi fi-rr-angle-left"></i>
                                </button>*/}
                                <img src={ActiveImage} alt="MainImage" className="active-image-rev" />
                                {/*<button className='next-button-rev' onClick={()=>{
                                    var f = ActiveValue;
                                    if(ActiveValue < NonActiveImage.length-1){
                                    setActiveValue(ActiveValue+1);
                                    f=f+1;
                                    setActiveImage(NonActiveImage[f]);
                                    }
                                    else{
                                    setActiveValue(0);
                                    f=0;
                                    setActiveImage(NonActiveImage[0]);
                                    }
                                    }}
                                >
                                        <i class="fi fi-rr-angle-right"></i>
                                </button>*/}
                            </div>
                            <div className='flex-child'>
                                <div className='inner-rev-det'>
                                    <h4 className="author">{RName}</h4>
                                    <p className="job">{RLoc}</p>
                                    <p className="info">{RReview}</p>
                                    <div className="customer-review-card-rating">{stars}</div>
                                </div>
                            </div>
                        </div>
                        <div className="button-container">
                            <button className="prev-btn" onClick={prevPerson}>
                            <FaChevronLeft />
                            </button>
                            <button className="next-btn" onClick={nextPerson}>
                            <FaChevronRight />
                            </button>
                        </div>
                    </article>
                </section>
            </div>
            </>
}
            {
                (Location.state === null)?<Footer Received={null}/>:(Location.state.user === undefined)?<Footer Received={null}/>:
                <Footer Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
        </div>
    )
}

export default Workshop;
