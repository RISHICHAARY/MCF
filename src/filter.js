import React from 'react';
import {useState , useEffect} from 'react';
import Axios from 'axios'; 
import "./filter.css"
import NavBar from './navbar';
import SideBar from './SideBar';
import './product_card.css';
import ProductView from './ViewProduct';
import {useNavigate , useLocation } from 'react-router-dom';
import noproduct from './noproduct.png'

function Filter() {
    const Navigate = useNavigate();
    const Location = useLocation();
    const Null = null;
    const [ Category , setCategory ] = useState( null );
    const [ Tag , setTag ] = useState( null );
    const [ Loading , setLoading ] = useState(false);
    const [ ActiveProduct , setActiveProduct ] = useState(null);
    const [ Expand , setExpand ] = useState(false);
    const [ CartItems , setCartItems ] = useState([]);
    const [ OnPageCart , setOnPageCart ] = useState([]);
    const [ ExpandFilter , setExpandFilter ] = useState(false);
    const [ ExpandSort , setExpandSort ] = useState(false);
    const [ SearchThis , setSearchThis ] = useState(null);
    const [ SortThis , setSortThis ] = useState(null);


    const Search = (event) => {
        event.preventDefault();
        if(SearchThis === null){return;}
        setLoading(true);
        Axios.put("https://clear-slug-teddy.cyclic.app/getSearch" , {name : SearchThis.toUpperCase()}).then((response)=> {
            setProducts(response.data);
            setLoading(false);
        })
    }

    const Sort = () => {
        if(SortThis === null){
            setLoading(true);
            Axios.put('https://clear-slug-teddy.cyclic.app/getProducts' , {Category : Category , Tag : Tag}).then((response) => {
                setProducts(response.data);
                    if(Location.state.user !== undefined){
                        Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                            setCartItems(response.data[0].wishlist);
                            setLoading(false);
                        })
                    }
                    else{
                        setLoading(false);
                    }
            })
        }
        else if(SortThis === "1"){
            setLoading(true);
            Axios.put('https://clear-slug-teddy.cyclic.app/getProductsSPA' , {Category : Category , Tag : Tag}).then((response) => {
                setProducts(response.data);
                    if(Location.state.user !== undefined){
                        Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                            setCartItems(response.data[0].wishlist);
                            setLoading(false);
                        })
                    }
                    else{
                        setLoading(false);
                    }
            })
        }
        else if(SortThis === "2"){
            setLoading(true);
            Axios.put('https://clear-slug-teddy.cyclic.app/getProductsSPD' , {Category : Category , Tag : Tag}).then((response) => {
                setProducts(response.data);
                    if(Location.state.user !== undefined){
                        Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                            setCartItems(response.data[0].wishlist);
                            setLoading(false);
                        })
                    }
                    else{
                        setLoading(false);
                    }
            })
        }
        else if(SortThis === "3"){
            setLoading(true);
            Axios.put('https://clear-slug-teddy.cyclic.app/getProductsSNA' , {Category : Category , Tag : Tag}).then((response) => {
                setProducts(response.data);
                    if(Location.state.user !== undefined){
                        Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                            setCartItems(response.data[0].wishlist);
                            setLoading(false);
                        })
                    }
                    else{
                        setLoading(false);
                    }
            })
        }
        else if(SortThis === "4"){
            setLoading(true);
            Axios.put('https://clear-slug-teddy.cyclic.app/getProductsSND' , {Category : Category , Tag : Tag}).then((response) => {
                setProducts(response.data);
                    if(Location.state.user !== undefined){
                        Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                            setCartItems(response.data[0].wishlist);
                            setLoading(false);
                        })
                    }
                    else{
                        setLoading(false);
                    }
            })
        }
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
		Axios.put("https://clear-slug-teddy.cyclic.app/deleteWishList" , {id:Location.state.id , type : Location.state.type , file : CartItems}).then(()=>{
			Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setCartItems(response.data[0].wishlist);
                setLoading(false);
            })
		});
	};

    const delete_product = (id) => {
        setLoading(true);
        Axios.put('https://clear-slug-teddy.cyclic.app/DeleteProduct' , {id : id}).then(() =>{
            alert("Product Deleted");
            Axios.put('https://clear-slug-teddy.cyclic.app/getProducts' , {Category : Category , Tag : Tag}).then((response) => {
            setProducts(response.data);
            setLoading(false);
        });
        });
    };

    const [ Products , setProducts ] = useState([]);

    const Filter = () => {
        setLoading(true);
        Axios.put('https://clear-slug-teddy.cyclic.app/getProducts' , {Category : Category , Tag : Tag}).then((response) => {
            setProducts(response.data);
            setLoading(false);
        });
    }

    useEffect( () => {
        setLoading(true);
        Axios.put('https://clear-slug-teddy.cyclic.app/getProducts' , {Category : Category , Tag : Tag}).then((response) => {
            setProducts(response.data);
                if(Location.state.user !== undefined){
                    Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                        setCartItems(response.data[0].wishlist);
                        setLoading(false);
                })}
                else{
                    setLoading(false);
                }
    })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
 , [] );

    return (
        <div id="Home">
        {
            (Location.state === null)?<NavBar Received={{page : "P"}}/>:
            <NavBar Received={ {page : "P",status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
        {
            (Location.state.user === undefined)?<SideBar Received={null}/>:
            <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
        {/* Search */}
        <div className='container top-bar w-50'>
            <button className='filter-button' onClick={()=>{setExpandFilter(true)}}><i class="fa-solid fa-filter"></i></button>
            <form className="search-div">
                <input
                    type="text"
                    className='search-input'
                    placeholder="Search..."
                    onKeyDown={(e)=>{if(e.key === "Enter"){Search(e);}}}
                    onChange={(e)=>{setSearchThis(e.target.value)}}
                />
            </form>
            <button className='sort-button' onClick={()=>{setExpandSort(true)}}><i class="fa-solid fa-arrow-up-wide-short"></i></button>
        </div>
        {
            (ExpandFilter)?
            <div className='container top-bar expanded'>
                <button className='filter-close-button' onClick={()=>{setExpandFilter(false)}}><i class="fi fi-rr-cross"></i></button>
                <select id="dropdown" className='filter-dropdown' onChange={(e) => {setCategory(e.target.value)}}>
                    <option value= {Null} >All</option>
                    <option>HOME DECORS</option>
                </select>
                <select id="dropdown" className='filter-dropdown' onChange={(e) => {setTag(e.target.value)}}>
                    <option value= {Null}>All</option>
                    <option>WALL HANGINGS</option>
                    <option>CLOCKS</option>
                </select>
                <button type='button' className='search-button first-apply-btn' onClick={Filter}>APPLY</button>
            </div>
            :<div></div>
        }
        {
            (ExpandSort)?
            <div className='container top-bar'>
                <button className='filter-close-button' onClick={()=>{setExpandSort(false)}}><i class="fi fi-rr-cross"></i></button>
                <select id="dropdown" className='filter-dropdown' onChange={(e) => {setSortThis(e.target.value)}}>
                    <option value= {Null} >CUSTOM</option>
                    <option value= "1">PRICE LOW-HIGH</option>
                    <option value= "2">PRICE HIGH-LOW</option>
                    <option value= "3">NAME A-Z</option>
                    <option value= "4">NAME Z-A</option>
                </select>
                <button type='button' className='search-button' onClick={Sort}>APPLY</button>
            </div>
            :<div></div>
        }
        <div className='display-row'>
                {
                    (Loading)?
                    <div className='loader-main'>
                        <div className="loader"></div>
                        {/* <p className='loader-text'>Loading...</p> */}
                    </div>
                    :
                    (Products.length === 0)?
                    <main class="nothing-content">
                        {/* <div class="nothing-loader"><h2 class="text text-center">No product found.</h2><br></br></div> */}
                        <img className='noprouduct-img' src={noproduct} alt="no product" />
                        <h2 className='noproduct-text'>No Products found</h2>
                        </main>
                    :
                    Products.map((value) => {
                    return(
                        <div className='display-column' key={value._id} >
                            <div className='image-div'>
                                <img src={value.image[Math.floor((Math.random()*(value.image.length))+0)]} onClick={()=>{setActiveProduct(value._id);setExpand(true);}} alt="Product" className='image'></img>
                                <div className='product-discount-div'>
                                    <p className='product-discount'>{parseInt(((parseInt(value.oldprice) - parseInt(value.newprice))/parseInt(value.oldprice))*100)}%</p>
                                    <p className='product-discount'>OFF</p>
                                </div>
                                {(Location.state!== null && Location.state.type === "admin")?
                                    <>
                                    <button className='delete-button' onClick={() => {delete_product(value._id)}}><i class="fi fi-sr-trash"></i></button>
                                    <button className='edit-button' onClick={() => {
                                        Axios.post("https://clear-slug-teddy.cyclic.app/getProducts",{id : value._id}); 
                                        Navigate('/editProducts' , 
                                        {
                                            state:{id : value._id , name: value.name , 
                                            description : value.description , newprice : value.newprice , 
                                            oldprice : value.oldprice , category : value.category , 
                                            tags : value.tags , status : value.status, infos : value.extras, length : value.length , 
                                            height : value.height , width : value.width, cod : value.cod,
                                            user_status: Location.state.status, user_name : Location.state.name , user:Location.state.user , 
                                            Product_id : value._id , type:Location.state.type , user_id:Location.state.id}} )}
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
                                    {(Location.state === null)?
                                    <>
                                        <button className='add-button' onClick={()=>{
                                            Navigate("/Login")
                                        }}>ADD TO CART</button>
                                        <button className='wish-button' onClick={()=>{
                                            Navigate("/Login")
                                        }}><i class="fi fi-rs-heart end-icons wish-icon"></i></button>
                                        <button className='view-button'
                                        onClick={()=>{
                                            setActiveProduct(value._id);
                                            setExpand(true);
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
                                            Axios.put("https://clear-slug-teddy.cyclic.app/addToCart" , {type : Location.state.type , id:Location.state.id , user:Location.state.user , product_id:value._id}).then(() =>{
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
                {
                    (Expand)?<>
                    {(Location.state.user !== undefined)?
                    <div className="pop w-100">
                    <button className='Terminator' onClick={()=>{
                    setExpand(false)
                    setLoading(true);
                    if(Location.state.user !== undefined){
                        Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                                setCartItems(response.data[0].wishlist);
                                setLoading(false);
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
                    if(Location.state.user !== undefined){
                        Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                                setCartItems(response.data[0].wishlist);
                                setLoading(false);
                        })}
                    else{
                        setLoading(false);}
                    }}><i class="fi fi-sr-cross"></i></button>
                    <ProductView Received={{ check: "out" , Product_id : ActiveProduct}}/>
                    </div>}
                    </>:<></>
                }
            </div>
        </div>
    )
}

export default Filter;
