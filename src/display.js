import { useEffect , useState } from 'react';
import {useLocation , useNavigate} from 'react-router-dom';
import Axios from 'axios';
import NavBar from './navbar';
import SideBar from './SideBar';
import './product_card.css';

function Display(){
    const Location = useLocation();
    const Navigate = useNavigate();
    const [Loading , setLoading] = useState(false);
    const [ Products , setProducts ] = useState([]);
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
        Axios.get('https://clear-slug-teddy.cyclic.app/getAllFeaturedProducts').then((response) => {
            setProducts(response.data);
            if(Location.state !== null){
                if(Location.state.user !== undefined){
                    Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [] );

    return(
        <div id="Home">
            {
                (Location.state === null)?<NavBar Received={{page : "H"}}/>:(Location.state.user === undefined)?<NavBar Received={{page : "H"}}/>:
                <NavBar Received={ {page : "H", status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Location.state === null)?<SideBar Received={null}/>:(Location.state.user === undefined)?<SideBar Received={null}/>:
                <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            <div className='display-row tp'>
                {
                    (Loading)?
                    <div className='loader-main'>
                        <div className="loader"></div>
                        <br></br>
                        {/* <p className='loader-text'>Loading...</p> */}
                    </div>
                    :
                    Products.map((value) => {
                    return(
                        // Product cart
                        <div className='display-column' key={value._id} >
                            <div className='image-div'>
                                {
                                    (Location.state === null || Location.state.user === undefined)?
                                    <img src={value.image[Math.floor((Math.random()*(value.image.length))+0)]} onClick={()=>{Navigate("/ViewProduct" , 
                                        {state:{ check: "out" , Product_id : value._id}})}} alt="Product" className='image'></img>
                                    :
                                    <img src={value.image[Math.floor((Math.random()*(value.image.length))+0)]} onClick={()=>{Navigate("/ViewProduct" , 
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
                                    {(Location.state === null)?
                                    <>
                                        <button className='add-button' onClick={()=>{
                                            Navigate("/Login")
                                        }}>Add to Cart</button>
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
                                            Axios.put("https://clear-slug-teddy.cyclic.app/addToCart" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:value._id , cuz:null , quant:"1"}).then(() =>{
                                                setLoading(false);
                                                Navigate("/cart" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} })
                                            });
                                        }}>ADD TO CART</button>
                                        {(CartItems.includes(value._id , 0) || OnPageCart.includes(value._id))?
                                            <button className='wish-button'
                                         onClick={() =>{
                                            Delete(value._id);
                                        }}
                                        ><i class="fi fi-ss-heart end-icons full-wish-icon"></i></button>:
                                            <button className='wish-button'
                                         onClick={() =>{
                                            setLoading(true);
                                            Axios.put("https://clear-slug-teddy.cyclic.app/addToWishList" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:value._id}).then(() =>{
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
            </div>
        </div>
    );
};

export default Display;
