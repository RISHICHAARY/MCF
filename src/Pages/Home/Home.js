import { useEffect , useState , useRef} from 'react';
import {useLocation , useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import Axios from 'axios';

import NavBar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
import Footer from '../../Components/Footer/index';
import Loader from '../../Components/Loader/index';
import OurMission from '../../Components/Reviews/mission';
import banner1 from '../../Images/banner_1.png'
import banner2 from '../../Images/banner_2.png'
import banner3 from '../../Images/banner_3.png'
import '../../Styles/Product_Card.css';
import './Home.css';
import '../../Components/Reviews/review.css';

import NoProduct from '../../Images/NoProduct.png';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Display(){
    const Location = useLocation();
    const Navigate = useNavigate();
    const [ Loading , setLoading ] = useState(false);
    const [ Products , setProducts ] = useState([]);
    const [ ProductsUFH , setProductsUFH ] = useState([]);
    const [ CartItems , setCartItems ] = useState([]);
    const [ OnPageCart , setOnPageCart ] = useState([]);
    const [ people , setpeople ] = useState([]);
    const [ RName , setRName ] = useState(null);
    const [ RLoc , setRLoc ] = useState(null);
    const [ RReview , setRReview ] = useState(null);
    const [ RRating , setRRating ] = useState(null);
    const [ Length , setLength ] = useState(0);
    const [ Category , setCategory ] = useState([]);
    const [ ActiveImage , setActiveImage ] = useState("");
    const [ NonActiveImage , setNonActiveImage ] = useState([]);
    const [ ActiveValue , setActiveValue ] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null);
    const [ ActiveBanner , setActiveBanner ] = useState(0);

    const Banners = [banner1,banner2,banner3]

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const delay = 3500;

    const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setActiveBanner((prevActiveBanner) =>
          prevActiveBanner === Banners.length - 1 ? 0 : prevActiveBanner + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [ActiveBanner]);

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

    const Delete = (id) => {
		setLoading(true);
		for(var i=0;i<CartItems.length;i++){
			if(CartItems[i] === id){
				CartItems.splice(i,2);
			}
		}
        for(var j=0; j<OnPageCart.length ; j++){
            if(OnPageCart[j]=== id){
                OnPageCart.splice(j,1);
            }
        }
		Axios.put("https://bored-wasp-top-hat.cyclic.app/deleteWishList" , {id:Location.state.id , type : Location.state.type , file : CartItems}).then(()=>{
			Axios.put("https://bored-wasp-top-hat.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setCartItems(response.data[0].wishlist);
                setLoading(false);
            })
		});
	};

    useEffect( () => {
        setLoading(true);
        Axios.get('https://bored-wasp-top-hat.cyclic.app/getAllFeaturedProducts').then((response) => {
            setProducts(response.data);
            Axios.get('https://bored-wasp-top-hat.cyclic.app/getProductsUFH').then((response) => {
                setProductsUFH(response.data);
                Axios.get('https://bored-wasp-top-hat.cyclic.app/getCategory').then((response) => {
                    setCategory(response.data);
                    Axios.get('https://bored-wasp-top-hat.cyclic.app/getReview').then((response) => {
                        setpeople(response.data);
                        if(response.data.length !== 0){
                        setRName(response.data[0].name);
                        setRLoc(response.data[0].loc);
                        setRReview(response.data[0].rev);
                        setRRating(response.data[0].rating);
                        setActiveImage(response.data[0].image[0]);
                        setNonActiveImage(response.data[0].image);
                        setLength(response.data.length);}
                        if(Location.state !== null){
                            if(Location.state.user !== undefined){
                                Axios.put("https://bored-wasp-top-hat.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                                    setCartItems(response.data[0].wishlist);
                                    setLoading(false);
                                })
                            }
                            else{
                                setLoading(false);
                            }
                        }
                        else{
                            setLoading(false);
                        }
                    });
                });
            });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [] );




    //review

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
  };

    return(
        <div>
            {
                (Location.state === null)?<NavBar Received={{page : "H"}}/>:(Location.state.user === undefined)?<NavBar Received={{page : "H"}}/>:
                <NavBar Received={ {page : "H", status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Location.state === null)?<SideBar Received={null}/>:(Location.state.user === undefined)?<SideBar Received={null}/>:
                <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            <div className='HomeSlider'>
                <div className="slideshow">
                    <div
                        className="slideshowSlider"
                        style={{ transform: `translate3d(${-ActiveBanner * 100}%, 0, 0)` }}
                    >
                        {Banners.map((backgroundImage, index) => (
                            <div className="slide">
                                <img key={index} src={backgroundImage} className='banner'/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {
                (Loading)?
                <Loader/>
                :<>
            
            <div className='categories display-row'>
                <p className='D-header'>CATEGORIES</p>
                {
                    (Category.length === 0)?
                    <div className='SupDiv'>
                        <p>NO CATEGORIES</p>
                    </div>:
                    <>{
                    Category.map((value)=>{
                        return(
                            <>
                        {
                            (Location.state === null)?
                            <Link to="/Products" state={{page:"P" , Cata : value.name}}>
                                <div className='display-column-1' key={value._id} >
                                    <div className='image-div-1'>
                                        <img src={value.image} alt='Category' className='image-1'/>
                                    </div>
                                    <div className='product-discount-div-1'>
                                        <p className='Cate-text'>{value.name}</p>
                                    </div>
                                </div>
                            </Link>:(Location.state.user === undefined)?
                            <Link to="/Products" state={{page:"P" , Cata : value.name}}>
                                <div className='display-column-1' key={value._id} >
                                    <div className='image-div-1'>
                                        <img src={value.image} alt='Category' className='image-1'/>
                                    </div>
                                    <div className='product-discount-div-1'>
                                        <p className='Cate-text'>{value.name}</p>
                                    </div>
                                </div>
                            </Link>:
                            <Link to="/Products" state={{page : "P", status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id , Cata : value.name}}>
                                <div className='display-column-1' key={value._id} >
                                    <div className='image-div-1'>
                                        <img src={value.image} alt='Category' className='image-1'/>
                                    </div>
                                    <div className='product-discount-div-1'>
                                        <p className='Cate-text'>{value.name}</p>
                                    </div>
                                </div>
                            </Link>
                        }
                        </>
                        );
                    })}</>
                }
            </div>
            <div className='display-row tp'>
                <p className='D-header'>HOT DEALS</p>
                <div className="underline"></div>
                {
                    (Products.length === 0)?
                    <main class="nothing-content">
                        {/* <div class="nothing-loader"><h2 class="text text-center">No product found.</h2><br></br></div> */}
                        <img className='noprouduct-img' src={NoProduct} alt="no product" />
                        <p>NO PRODUCTS</p>
                    </main>
                    :
                    <>{
                    Products.slice(0,9).map((value) => {
                    return(
                        // Product cart
                        <>
                        <div className='display-column' key={value._id} >
                            <div className='image-div'>
                                {
                                    (Location.state === null || Location.state.user === undefined)?
                                    <img src={value.image[0]} onClick={()=>{Navigate("/ViewProduct" , 
                                        {state:{ check: "out" , Product_id : value._id}})}} alt="Product" className='image'></img>
                                    :
                                    <img src={value.image[0]} onClick={()=>{Navigate("/ViewProduct" , 
                                        {state:{ check: "in" , Product_id : value._id , status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})}} alt="Product" className='image'></img>
                                }
                                <div className='product-discount-div'>
                                    <p className='product-discount'>{parseInt(((parseInt(value.oldprice) - parseInt(value.newprice))/parseInt(value.oldprice))*100)}%</p>
                                    <p className='product-discount'>OFF</p>
                                </div>
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
                                        }}>ADD</button>
                                        <button className='wish-button' onClick={()=>{
                                            Navigate("/Login")
                                        }}><i class="fi fi-rs-heart end-icons wish-icon"></i></button>
                                        <button className='view-button'
                                        onClick={()=>{Navigate("/ViewProduct" , 
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
                                            setLoading(true);
                                            Axios.put("https://bored-wasp-top-hat.cyclic.app/addToCart" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:value._id , cuz:null , quant:"1"}).then(() =>{
                                                setLoading(false);
                                                Navigate("/cart" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} })
                                            });
                                        }}>ADD</button>
                                        {(CartItems.includes(value._id , 0) || OnPageCart.includes(value._id))?
                                            <button className='wish-button'
                                         onClick={() =>{
                                            Delete(value._id);
                                        }}
                                        ><i class="fi fi-ss-heart end-icons full-wish-icon"></i></button>:
                                            <button className='wish-button'
                                         onClick={() =>{
                                            setLoading(true);
                                            Axios.put("https://bored-wasp-top-hat.cyclic.app/addToWishList" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:value._id}).then(() =>{
                                                setOnPageCart((p) => [...p , value._id])
                                                setLoading(false);
                                            });
                                        }}
                                        ><i class="fi fi-rs-heart end-icons wish-icon"></i></button>}
                                        <button className='view-button'
                                        onClick={()=>{Navigate("/ViewProduct" , 
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
                        <div className='display-column see-more-div'>
                        <div className='contents-div'>
                            {
                                (Location.state === null)?<Link to="/Products" state={{page:"P" , HS : "Yes"}}><h2 className='see-more'>SEE MORE</h2></Link>:
                                (Location.state.user === undefined)?<Link to="/Products" state={{page:"P" , HS : "Yes"}}><h2 className='see-more'>SEE MORE</h2></Link>:
                                <Link to="/Products" state={{page : "P", status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id , HS : "Yes"}}><h2 className='see-more'>SEE MORE</h2></Link>
                            }
                        </div>
                        </div>
                        </>
                        );
                    }
                    )
                }</>}
            </div>


            <div className='display-row tp'>
                <p className='D-header'>UNDER 500</p>
                <div className="underline"></div>
                {
                    (ProductsUFH.length === 0)?
                    <main class="nothing-content">
                        {/* <div class="nothing-loader"><h2 class="text text-center">No product found.</h2><br></br></div> */}
                        <img className='noprouduct-img' src={NoProduct} alt="no product" />
                        <p>NO PRODUCTS</p>
                    </main>
                    :
                    <>{
                    ProductsUFH.slice(0,9).map((value) => {
                    return(
                        // Product cart
                        <>
                        <div className='display-column' key={value._id} >
                            <div className='image-div'>
                                {
                                    (Location.state === null || Location.state.user === undefined)?
                                    <img src={value.image[0]} onClick={()=>{Navigate("/ViewProduct" , 
                                        {state:{ check: "out" , Product_id : value._id}})}} alt="Product" className='image'></img>
                                    :
                                    <img src={value.image[0]} onClick={()=>{Navigate("/ViewProduct" , 
                                        {state:{ check: "in" , Product_id : value._id , status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})}} alt="Product" className='image'></img>
                                }
                                <div className='product-discount-div'>
                                    <p className='product-discount'>{parseInt(((parseInt(value.oldprice) - parseInt(value.newprice))/parseInt(value.oldprice))*100)}%</p>
                                    <p className='product-discount'>OFF</p>
                                </div>
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
                                        }}>ADD</button>
                                        <button className='wish-button' onClick={()=>{
                                            Navigate("/Login")
                                        }}><i class="fi fi-rs-heart end-icons wish-icon"></i></button>
                                        <button className='view-button'
                                        onClick={()=>{Navigate("/ViewProduct" , 
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
                                            setLoading(true);
                                            Axios.put("https://bored-wasp-top-hat.cyclic.app/addToCart" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:value._id , cuz:null , quant:"1"}).then(() =>{
                                                setLoading(false);
                                                Navigate("/cart" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} })
                                            });
                                        }}>ADD</button>
                                        {(CartItems.includes(value._id , 0) || OnPageCart.includes(value._id))?
                                            <button className='wish-button'
                                         onClick={() =>{
                                            Delete(value._id);
                                        }}
                                        ><i class="fi fi-ss-heart end-icons full-wish-icon"></i></button>:
                                            <button className='wish-button'
                                         onClick={() =>{
                                            setLoading(true);
                                            Axios.put("https://bored-wasp-top-hat.cyclic.app/addToWishList" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:value._id}).then(() =>{
                                                setOnPageCart((p) => [...p , value._id])
                                                setLoading(false);
                                            });
                                        }}
                                        ><i class="fi fi-rs-heart end-icons wish-icon"></i></button>}
                                        <button className='view-button'
                                        onClick={()=>{Navigate("/ViewProduct" , 
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
                        <div className='display-column see-more-div'>
                        <div className='contents-div'>
                            {
                                (Location.state === null)?<Link to="/Products" state={{page:"P" , HS : "Ye"}}><h2 className='see-more'>SEE MORE</h2></Link>:
                                (Location.state.user === undefined)?<Link to="/Products" state={{page:"P" , HS : "Ye"}}><h2 className='see-more'>SEE MORE</h2></Link>:
                                <Link to="/Products" state={{page : "P", status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id , HS : "Ye"}}><h2 className='see-more'>SEE MORE</h2></Link>
                            }
                        </div>
                        </div>
                        </>
                        );
                    }
                    )}
                    </>
                }
            </div>
            <OurMission/>
            <div className="main-review-div">
                <section className="review-div">
                    <div className="title">
                        <h2>REVIEWS</h2>
                        <div className="underline"></div>
                    </div>
                    {(people.length !== 0)?
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
                    </article>:
                    <div className='SupDiv'>
                    <p>NO REVIEWS</p>
                </div>}
                </section>
            </div>
            </>
}
            {
                (Location.state === null)?<Footer Received={null}/>:(Location.state.user === undefined)?<Footer Received={null}/>:
                <Footer Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
        </div>
    );
};

export default Display;
