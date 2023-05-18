import { useEffect , useState } from 'react';
import {useLocation , useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import Axios from 'axios';

import NavBar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
import Footer from '../../Components/Footer/index';
import Loader from '../../Components/Loader/index';
import OurMission from '../../Components/Reviews/mission';

import '../../Styles/Product_Card.css';
import './Home.css';
import '../../Components/Reviews/review.css'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Display(){
    const Location = useLocation();
    const Navigate = useNavigate();
    const [Loading , setLoading] = useState(false);
    const [ Products , setProducts ] = useState([]);
    const [ CartItems , setCartItems ] = useState([]);
    const [ OnPageCart , setOnPageCart ] = useState([]);
    const [ people , setpeople ] = useState([]);
    const [ RName , setRName ] = useState(null);
    const [ RLoc , setRLoc ] = useState(null);
    const [ RReview , setRReview ] = useState(null);
    const [ RRating , setRRating ] = useState(null);
    const [ Length , setLength ] = useState(0);
    const [ Category , setCategory ] = useState([]);

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
            Axios.get('https://bored-wasp-top-hat.cyclic.app/getCategory').then((response) => {
                setCategory(response.data);
                Axios.get('https://bored-wasp-top-hat.cyclic.app/getReview').then((response) => {
                    setpeople(response.data);
                    setRName(response.data[0].name);
                    setRLoc(response.data[0].loc);
                    setRReview(response.data[0].rev);
                    setRRating(response.data[0].rating);
                    setLength(response.data.length);
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
    }
    else{
        setIndex(0);
        setRName(people[0].name);
        setRLoc(people[0].loc);
        setRReview(people[0].rev);
        setRRating(people[0].rating);
    }
  };

  const prevPerson = () => {
    if(index-1>=0){
        setIndex(index-1);
        setRName(people[index-1].name);
        setRLoc(people[index-1].loc);
        setRReview(people[index-1].rev);
        setRRating(people[index-1].rating);
    }
    else{
        setIndex(Length-1);
        setRName(people[Length-1].name);
        setRLoc(people[Length-1].loc);
        setRReview(people[Length-1].rev);
        setRRating(people[Length-1].rating);
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
                <div className='HomeSlider-Main'>
                    <div  className='HomeSlider-Content-Main'>
                        <p className='HomeSlider-Content'>Magic Corner</p>
                        <p className='HomeSlider-SubContent'>Handmade with Love</p>
                    </div>
                </div>
                <div className='HomeSlider-Sub'>
                </div>
            </div>
            <div className='categories display-row'>
                <p className='D-header'>CATERGORIES</p>
                {
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
                    })
                }
            </div>
            <div className='display-row tp'>
                <p className='D-header'>HOT DEALS</p>
                <div className="underline"></div>
                {
                    (Loading)?
                    <Loader/>
                    :
                    Products.slice(0,9).map((value) => {
                    return(
                        // Product cart
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
                        );
                    }
                    )
                }
                <div className='display-column see-more-div'>
                <div className='contents-div'>
                    {
                        (Location.state === null)?<Link to="/Products" state={{page:"P" , HS : "Yes"}}><h2 className='see-more'>SEE MORE</h2></Link>:
                        (Location.state.user === undefined)?<Link to="/Products" state={{page:"P" , HS : "Yes"}}><h2 className='see-more'>SEE MORE</h2></Link>:
                        <Link to="/Products" state={{page : "P", status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id , HS : "Yes"}}><h2 className='see-more'>SEE MORE</h2></Link>
                    }
                </div>
                </div>
            </div>
            <OurMission/>
            

            <div className="main-review-div">
    <section className="review-div">
      <div className="title">
  <h2>REVIEWS</h2>
<div className="underline"></div>
    </div>
    <article className="review">
      {/* <div className="img-container">
        <img src={image} alt={name} className="person-img" />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div> */}
      <h4 className="author">{RName}</h4>
      <p className="job">{RLoc}</p>
      <p className="info">{RReview}</p>
      <div className="customer-review-card-rating">{stars}</div>
      <div className="button-container">
        <button className="prev-btn" onClick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>
      {/* <button className="random-btn" onClick={getRandomPerson}>Get Random Review</button> */}
    </article>
    </section>
    </div>


            {
                (Location.state === null)?<Footer Received={null}/>:(Location.state.user === undefined)?<Footer Received={null}/>:
                <Footer Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
        </div>
    );
};

export default Display;
