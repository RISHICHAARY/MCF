import {useEffect , useState} from 'react';
import Axios from 'axios';
import { useNavigate , useLocation } from 'react-router-dom';
import './ViewProduct.css';
import './product_card.css';
import NavBar from './navbar';
import SideBar from './SideBar';

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
		Axios.put("https://clear-slug-teddy.cyclic.app/deleteWishList" , {id:Location.state.id , type : Location.state.type , file : CartItems}).then(()=>{
			Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setCartItems(response.data[0].wishlist);
                setLoading(false);
            })
		});
	};

    useEffect( () => {
        setLoading(true);
        Axios.put("https://clear-slug-teddy.cyclic.app/getSelectedProductss" , {id:Location.state.Product_id}).then((response) => {
            setItem(response.data[0]);
            setActiveValue(0);
            setActiveImage(response.data[0].image[0]);
            setNonActiveImage(response.data[0].image);
            if(Location.state.check === "in"){
                Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                    setCartItems(response.data[0].wishlist);
                    setLoading(false);
            })}
            else{
                setLoading(false);
                }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
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
                <div className='loader-main'>
                    <div className="loader"></div><br />
                    {/* <p className='loader-text'>Loading...</p> */}
                </div>
                :
                < >
                    <div className='container col-5  mt-2 first-container'>
                        <div className="col-12 active-image-div">
                            <img src={ActiveImage} alt="MainImage" className="active-image" />
                            <button className='next-button' onClick={()=>{
                                console.log("clicked");
                                if(ActiveValue < NonActiveImage.length-1){
                                    setActiveValue(ActiveValue+1);
                                    setActiveImage(NonActiveImage[ActiveValue]);
                                }
                                else{
                                    setActiveValue(0);
                                    setActiveImage(NonActiveImage[ActiveValue]);
                                }
                            }}
                            ><i class="fi fi-rr-angle-right"></i></button>
                            <button className='prev-button' onClick={()=>{
                                if(ActiveValue > 0){
                                    setActiveValue(ActiveValue-1);
                                    setActiveImage(NonActiveImage[ActiveValue]);
                                }
                                else{
                                    setActiveValue(NonActiveImage.length-1);
                                    setActiveImage(NonActiveImage[ActiveValue]);
                                }
                            }}><i class="fi fi-rr-angle-left"></i></button>
                        </div>
                        <div className="row">
                            {NonActiveImage.map((value) => {
                                return(
                                    <>
                                        <img key={value} src={value} alt="SubImages" className='col-1 n-active-images' onClick={() => {setActiveImage(value)}} />
                                    </>);
                            })}
                        </div>
                    </div>
                    <div className='container col-6 float-start mt-2 content-div'>
                        <p className="view-product-name">{Item.name}</p>
                        <p className="product-description">{Item.description}</p>
                        <p className="product-description">Dimensions : {Item.length} x {Item.width} x {Item.height} M(L x B x H)</p>
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
                                Axios.put("https://clear-slug-teddy.cyclic.app/addToCart" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:Item._id , cuz:Cuz , quant:Quant}).then(() =>{
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
                                Axios.put("https://clear-slug-teddy.cyclic.app/addToWishList" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:Item._id}).then(() =>{
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
                </>
            }
        </div>
    )
}

export default ProductView;
