import {useEffect , useState} from 'react';
import Axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import './ViewProduct.css';
import './product_card.css';

const ProductView = (Received) => {

    const Navigate = useNavigate();
    const [ ActiveImage , setActiveImage ] = useState("")
    const [ NonActiveImage , setNonActiveImage ] = useState([])
    const [ Loading , setLoading ] = useState(true);
    const [ Item, setItem ] = useState([]);
    const Location = Received.Received;

    useEffect( () => {

        setLoading(true);
        Axios.put("https://clear-slug-teddy.cyclic.app/getSelectedWorkShops" , {id:Received.Received.Product_id}).then((response) => {
            setItem(response.data[0]);
            setActiveImage(response.data[0].image[0]);
            setNonActiveImage(response.data[0].image);
            setLoading(false);
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <div className="view-pop">
            {
                (Loading)?
                <div className='loader-main'>
                    <div className="loader"></div>
                    <p className='loader-text'>Loading...</p>
                </div>
                :
                < >
                    <div className='container col-6 float-start mt-2 first-container'>
                        <div className="col-12 active-image-div">
                            <img src={ActiveImage} alt="MainImage" className="active-image" />
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
                        <p className="product-discount-price">{parseInt(((parseInt(Item.oldprice) - parseInt(Item.newprice))/parseInt(Item.oldprice))*100)}% off</p>
                        <s className="strike"><p className="slashed-price">Rs: {Item.oldprice}</p></s>
                        <p className="live-price">Rs: {Item.newprice}</p>
                        {(Received.Received.check === "in")?
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
    )
}

export default ProductView;