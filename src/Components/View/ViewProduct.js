import {useEffect , useState} from 'react';
import Axios from 'axios';
import { useNavigate , useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

import './ViewProduct.css';
import '../../Styles/Product_Card.css';

import NavBar from '../NavBar';
import SideBar from '../SideBar';
import Footer from '../Footer/index';
import Loader from '../Loader/index';

function ProductView(){

    const Navigate = useNavigate();
    const Location = useLocation();
    const [ ActiveImage , setActiveImage ] = useState("")
    const [ NonActiveImage , setNonActiveImage ] = useState([])
    const [ Loading , setLoading ] = useState(true);
    const [ Item, setItem ] = useState([]);
    const [ Cuz , setCuz ] = useState(null);
    const [ Quant , setQuant ] = useState("1");
    const [ ActiveValue , setActiveValue ] = useState(0);
    const [ CartItems , setCartItems ] = useState([]);
    const [ OnPageCart , setOnPageCart ] = useState([]);
    const [touchPosition, setTouchPosition] = useState(null);
    const [ Realted , setRelated ] = useState([]);

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
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
		Axios.put("https://busy-lion-umbrella.cyclic.app/deleteWishList" , {id:Location.state.id , type : Location.state.type , file : CartItems}).then(()=>{
			Axios.put("https://busy-lion-umbrella.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setCartItems(response.data[0].wishlist);
                setLoading(false);
            })
		});
	};

    const InternalView = (Pid) =>{
        setLoading(true);
        Axios.put("https://busy-lion-umbrella.cyclic.app/getSelectedProductss" , {id:Pid}).then((response) => {
            setItem(response.data[0]);
            setActiveValue(0);
            setActiveImage(response.data[0].image[0]);
            setNonActiveImage(response.data[0].image);
            Axios.put("https://busy-lion-umbrella.cyclic.app/getAllRelatedProducts" , {id:Pid , Cata: response.data[0].category}).then((response) => {
                setRelated(response.data)
                setLoading(false);
            })
        })
    }

    useEffect( () => {
        setLoading(true);
        Axios.put("https://busy-lion-umbrella.cyclic.app/getSelectedProductss" , {id:Location.state.Product_id}).then((response) => {
            setItem(response.data[0]);
            setActiveValue(0);
            setActiveImage(response.data[0].image[0]);
            setNonActiveImage(response.data[0].image);
            Axios.put("https://busy-lion-umbrella.cyclic.app/getAllRelatedProducts" , {id:Location.state.Product_id , Cata: response.data[0].category}).then((response) => {
                setRelated(response.data)
                if(Location.state.check === "in"){
                    Axios.put("https://busy-lion-umbrella.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                        setCartItems(response.data[0].wishlist);
                        setLoading(false);
                    })
                }
                else{
                    setLoading(false);
                }
            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div id="Home">
        <div className="view-pop">
            {
                (Location.state === null)?<NavBar Received={{page : "J"}}/>:(Location.state.user === undefined)?<NavBar Received={{page : "J"}}/>:
                <NavBar Received={ {page : "H", status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Location.state === null)?<SideBar Received={null}/>:(Location.state.user === undefined)?<SideBar Received={null}/>:
                <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Loading)?
                <Loader/>
                :
                < >
                    <div className='SuperMain'>
                    <div className='container col-5  mt-2 first-container'>
                        <div className="col-12 active-image-div" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                            <img src={ActiveImage} alt="MainImage" className="active-image" />
                            <button className='next-button' onClick={()=>{
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
                            ><i class="fi fi-rr-angle-right"></i></button>
                            <button className='prev-button' onClick={()=>{
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
                            }}><i class="fi fi-rr-angle-left"></i></button>
                        </div>
                        <div className="row">
                            {NonActiveImage.map((value) => {
                                return(
                                    <>
                                        <img key={value} src={value} alt="SubImages" className='col-1 n-active-images' onClick={() => {
                                            setActiveImage(value)
                                            for(var i=0;i<NonActiveImage.length;i++){
                                                if(NonActiveImage[i] === value){
                                                    setActiveValue(i);
                                                }
                                            }
                                            }} />
                                    </>);
                            })}
                        </div>
                    </div>
                    <div className='container col-6 mt-2 content-div'>
                        <p className="view-product-name">{Item.name}</p>
                        <p className="product-description">{Item.description}</p>
                        <p className="product-description-dimen">Dimensions : {Item.length} x {Item.width} x {Item.height} CM(L x B x H)</p>
                        <textarea className='text-area' row="3" column="200%" placeholder='Tell us how you want to customize your product.' onChange={(e)=>{setCuz(e.target.value)}}></textarea>
                        <p className="quantity">Quantity :</p>
                        <input className='quantity-input' type="number" min="1" max="10" defaultValue="1" onChange={(e)=>{setQuant(e.target.value)}} />
                        <p className="product-extras">Seller Tell's:</p>
                        <p className='extra-desc'>{Item.extras}</p>
                        <p className="product-discount-price">{parseInt(((parseInt(Item.oldprice) - parseInt(Item.newprice))/parseInt(Item.oldprice))*100)}% off</p>
                        <s className="strike"><p className="slashed-price">Rs: {Item.oldprice}</p></s>
                        <p className="live-price">Rs: {Item.newprice}</p>
                        {(Location.state.check === "in")?
                        <>
                            <button className="cart-button" onClick={() =>{
                                setLoading(true);
                                Axios.put("https://busy-lion-umbrella.cyclic.app/addToCart" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:Item._id , cuz:Cuz , quant:Quant}).then(() =>{
                                    setLoading(false);
                                    Navigate("/cart" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} })
                                });
                            }}>ADD TO CART</button>
                            {(CartItems.includes(Item._id , 0) || OnPageCart.includes(Item._id))?
                                <button className='wish-button-vp'
                                onClick={() =>{
                                Delete(Item._id);
                            }}
                            ><i class="fi fi-ss-heart end-icons full-wish-icon"></i></button>:
                                <button className='wish-button-vp'
                                onClick={() =>{
                                setLoading(true);
                                Axios.put("https://busy-lion-umbrella.cyclic.app/addToWishList" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:Item._id}).then(() =>{
                                    setOnPageCart((p) => [...p , Item._id])
                                    setLoading(false);
                                });
                            }}><i class="fi fi-rs-heart end-icons wish-icon"></i></button>}
                        </>:
                        <>
                        <button className="cart-button" onClick={() =>{Navigate("/Login")}}>ADD TO CART</button>
                        <button className='wish-button' onClick={()=>{
                        Navigate("/Login")
                        }}><i class="fi fi-rs-heart end-icons"></i></button>
                        </>
                        }
                    </div>
                </div>
                    <br/>
                <div className='display-row tp'>
                <p className='D-header'>RELATED PRODUCTS</p>
                <div className="underline"></div>
                {
                    (Realted === undefined || Realted === [])?
                    <div className='SupDiv'>
                        <p className='product-price'>NO RELATED PRODUCTS</p>
                    </div>:
                    Realted.slice(0,5).map((value) => {
                    return(
                        // Product cart
                        <div className='display-column' key={value._id} >
                            <div className='image-div'>
                                {
                                    (Location.state === null || Location.state.user === undefined)?
                                    <img src={value.image[0]} onClick={()=>{InternalView(value._id);}} alt="Product" className='image'></img>
                                    :
                                    <img src={value.image[0]} onClick={()=>{InternalView(value._id);}} alt="Product" className='image'></img>
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
                                        onClick={()=>{InternalView(value._id);
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
                                            Axios.put("https://busy-lion-umbrella.cyclic.app/addToCart" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:value._id , cuz:null , quant:"1"}).then(() =>{
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
                                            Axios.put("https://busy-lion-umbrella.cyclic.app/addToWishList" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:value._id}).then(() =>{
                                                setOnPageCart((p) => [...p , value._id])
                                                setLoading(false);
                                            });
                                        }}
                                        ><i class="fi fi-rs-heart end-icons wish-icon"></i></button>}
                                        <button className='view-button'
                                        onClick={()=>{InternalView(value._id);
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
                </>
            }
        </div>
        {
            (Location.state === null)?<Footer Received={null}/>:(Location.state.user === undefined)?<Footer Received={null}/>:
            <Footer Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
        </div>
    )
}

export default ProductView;
