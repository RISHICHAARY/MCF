import { useState , useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import Axios  from 'axios';
import NavBar from './navbar';
import ProductView from './ViewProduct';
import SideBar from './SideBar';
import Faqs from './faqs';
import './product_card.css';
import './cart.css';
import cartempty from './cartempty.png'

function Cart(){

    const [ Total , setTotal ] = useState(0);
    const [ ActiveProduct , setActiveProduct ] = useState(null);
    const [ Expand , setExpand ] = useState(false);

    const Calculation = ( Received ) => {
        var T =0;
        for(var j = 0; j< Received.length ; j++){
            T = T + parseInt(Received[j].newprice)*parseInt(Received[j].quant);
        }
        setTotal(T);
        setLoading(false);
    }

    const Delete = (id) => {
		setLoading(true);
		for(var i=0;i<OnCart.id.length;i++){
			if(OnCart.id[i] === id){
				OnCart.id.splice(i,1);
                OnCart.cuz.splice(i,1);
                OnCart.quant.splice(i,1);
			}
		}
		Axios.put("https://clear-slug-teddy.cyclic.app/deleteMe" , {id:Location.state.id , type : Location.state.type , file : OnCart}).then(()=>{
			Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setOnCart(response.data[0].on_cart);
                Axios.put("https://clear-slug-teddy.cyclic.app/getSelectedProducts" , {id:response.data[0].on_cart}).then((response1) => {
                    setCartItems(response1.data);
                    add(response1.data , response.data[0].on_cart);
                })
            })
		});
	};

    const Navigate = useNavigate();
    const Location = useLocation();

    const [ OnCart , setOnCart ] = useState([]);
    const [ CartItems , setCartItems ] = useState([]);
    const [ Loading , setLoading ] = useState(false);

    const [ WishList , setWishList ] = useState([]);
    const [ OnPageCart , setOnPageCart ] = useState([]);

    const add = (rec , rec1) =>{
        for(var i=0 ; i< Object.keys(rec1.id).length ;i++){
            for(var j=0 ; j< rec.length ;j++){
                if(rec[j]._id === rec1.id[i]){
                    rec[j].quant = rec1.quant[i]
                    rec[j].cuz = rec1.cuz[i]
                }
            }
        }
        Calculation(rec);
        setCartItems(rec);
    }

    const DeleteWishlist = (id) => {
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
                setWishList(response.data[0].wishlist);
                setLoading(false);
            })
		});
	};

    useEffect(() => {
        setLoading(true);
        Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
            setOnCart(response.data[0].on_cart);
            Axios.put("https://clear-slug-teddy.cyclic.app/getSelectedProducts" , {id:response.data[0].on_cart}).then((response1) => {
                setCartItems(response1.data);
                add(response1.data , response.data[0].on_cart);
                Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                        setWishList(response.data[0].wishlist);
                        setLoading(false);
                })
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[]);

    return(
        <div id="Home">
            {
                (Location.state === null)?<NavBar Received={null}/>:
                <NavBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Location.state === null)?<SideBar Received={null}/>:
                <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Loading)?
                <div className='loader-main'>
                    <div className="loader"></div>
                    {/* <p className='loader-text'>Loading...</p> */}
                </div>
                :
                <>
                {
                    (CartItems.length === 0)?
                    <main class="nothing-content"><div class="nothing-loader">
                        <img className='cartempty-img' src={cartempty} alt="Nothing here" />
                        <h2 class="text text-center noproduct-text">No products in cart</h2><br></br></div></main>
                    :
                        <div className='display-row'>
                    {
                        CartItems.map((value) => {
                        return(
                            <div className='display-column' key={value._id+Math.floor((Math.random()*(value.image.length))+0)} >
                            <div className='image-div'>
                                <img src={value.image[Math.floor((Math.random()*(value.image.length))+0)]} onClick={()=>{setActiveProduct(value._id);setExpand(true);}} alt="Product" className='image'></img>
                                <div className='product-discount-div'>
                                    <p className='product-discount'>{parseInt(((parseInt(value.oldprice) - parseInt(value.newprice))/parseInt(value.oldprice))*100)}%</p>
                                    <p className='product-discount'>OFF</p>
                                </div>
                                <div className='quant-div'>
                                    <p className='product-discount'>{value.quant}</p>
                                </div>
                                {
                                    (value.cuz !== null)?
                                        <div className='cuz-div'>
                                            <p className='product-discount'><i class="fi fi-rr-magic-wand"></i></p>
                                        </div>
                                    :<></>
                                }
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
                                        }}>REMOVE</button>
                                        <button className='wish-button' onClick={()=>{
                                            Navigate("/Login")
                                        }}><i class="fi fi-rs-heart end-icons"></i></button>
                                        <button className='view-button'
                                        onClick={()=>{
                                            setActiveProduct(value._id);
                                            setExpand(true);
                                        }}
                                        >
                                            <i className="fi fi-rr-eye end-icons"></i>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button className='remove-button'
                                        onClick={() =>{
                                            Delete(value._id);
                                        }}>REMOVE</button>
                                        {(WishList.includes(value._id , 0) || OnPageCart.includes(value._id))?
                                            <button className='wish-button'
                                         onClick={() =>{
                                            DeleteWishlist(value._id);
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
                                            onClick={()=>{
                                                setActiveProduct(value._id);
                                                setExpand(true);
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
                    <div className="checkout">
                        <div className="checkout-btn">
                            <button type="button" onClick={()=>{
                                Navigate("/Confirmation" , {state:{status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})
                            }}>Checkout</button>
                        </div>
                        <div className="show_price">
                            <h4 className='sub-total'>Sub Total : Rs <span className='price'>{Total} /-</span></h4>
                        </div>
                    </div>
                </div>
                }
                </>
            }
            {
                (Expand)?<>
                {(Location.state !== null)?
                <div className="pop w-100">
                <button className='Terminator' onClick={()=>{
                setExpand(false)
                setLoading(true);
                if(Location.state !== null){
                    Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                        setOnCart(response.data[0].on_cart);
                        Axios.put("https://clear-slug-teddy.cyclic.app/getSelectedProducts" , {id:response.data[0].on_cart}).then((response1) => {
                            setCartItems(response1.data);
                            Calculation(response1.data);
                            Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                                setWishList(response.data[0].wishlist);
                                setLoading(false);
                        })
                        })
                    })}
                else{
                    setLoading(false);}
                }}><i class="fi fi-sr-cross"></i></button>
                <ProductView Received={{ check: "in" , Product_id : ActiveProduct , status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}}/>
                </div>
                :
                <div className="pop w-100">
                <button className='Terminator' onClick={()=>{
                setExpand(false)
                setLoading(true);
                if(Location.state !== null){
                    Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                        setOnCart(response.data[0].on_cart);
                        Axios.put("https://clear-slug-teddy.cyclic.app/getSelectedProducts" , {id:response.data[0].on_cart}).then((response1) => {
                            setCartItems(response1.data);
                            Calculation(response1.data);
                            Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                                setWishList(response.data[0].wishlist);
                                setLoading(false);
                        })
                        })
                    })}
                else{
                    setLoading(false);}
                }}><i class="fi fi-sr-cross"></i></button>
                <ProductView Received={{ check: "out" , Product_id : ActiveProduct}}/>
                </div>}
                </>:<></>
            }
            {
                (Location.state === null)?<Faqs Received={null}/>:(Location.state.user === undefined)?<SideBar Received={null}/>:
                <Faqs Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
        </div>
    )
}

export default Cart;
