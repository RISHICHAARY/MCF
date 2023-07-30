import {useEffect , useState} from 'react';
import Axios from 'axios';
import { useNavigate , useLocation  } from 'react-router-dom';

import './ViewProduct.css';
import '../../Styles/Product_Card.css';

import NavBar from '../NavBar';
import SideBar from '../SideBar';
import Footer from '../Footer/index';
import Loader from '../Loader/index';

const ProductView = (Received) => {
    const Location = useLocation();
    const Navigate = useNavigate();
    const [ ActiveImage , setActiveImage ] = useState("")
    const [ ActiveValue , setActiveValue ] = useState(0);
    const [ NonActiveImage , setNonActiveImage ] = useState([])
    const [ Loading , setLoading ] = useState(true);
    const [ Item, setItem ] = useState([]);
    const [touchPosition, setTouchPosition] = useState(null)

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

    useEffect( () => {
        setLoading(true);
        Axios.put("https://busy-lion-umbrella.cyclic.app/getSelectedWorkShops" , {id:Location.state.Product_id}).then((response) => {
            setItem(response.data[0]);
            setActiveImage(response.data[0].image[0]);
            setNonActiveImage(response.data[0].image);
            setLoading(false);
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
                    <div className='container col-5 mt-2 first-container'>
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
                                        <img key={value} src={value} alt="SubImages" className='col-1 n-active-images' onClick={() => {setActiveImage(value)}} />
                                    </>);
                            })}
                        </div>
                    </div>
                    <div className='container col-6 float-start mt-2 content-div'>
                        <p className="view-product-name">{Item.name}</p>
                        <p className="product-description">{Item.description}</p>
                        <p className="product-description-dimen">Mode : {Item.mode}</p>
                        <p className="product-discount-price">{parseInt(((parseInt(Item.oldprice) - parseInt(Item.newprice))/parseInt(Item.oldprice))*100)}% off</p>
                        <s className="strike"><p className="slashed-price">Rs: {Item.oldprice}</p></s>
                        <p className="live-price">Rs: {Item.newprice}</p>
                        {(Location.state.check === "in")?
                        <>
                            <button className="cart-button" onClick={() =>{
                                Navigate("/WorkshopConfirmation" , {state:Location})
                            }}>ENROLL</button>
                        </>:
                        <>
                        <button className="cart-button" onClick={() =>{Navigate("/Login")}}>ENROLL</button>
                        </>
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