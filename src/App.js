/* eslint-disable react/jsx-pascal-case */
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import Axios from 'axios';
import {useEffect,useState} from 'react';

import Modal from './popup';

import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.bundle";
import './home.css'
import './App.css';

// import homeimage from './home.jpg'
import Display from './display';
import Products from './products';
import Users from './users';
import ForgotPassword from './RetrivePassword';
import SendPassword from './SendPassword';
import Login from './Login';
import Workshops from './addWorkshops';
import EditProduct from './editProduct'
import EditWorkshop from './editWorkshops';
import Upload_User from './Upload_User';
import Upload_Admin from './Upload_Admin';
import Filter from './filter';
import Search from './searchbar';
import Workshop from './workshops';
import ProductView from './ViewProduct';
import ViewWorkShop from './ViewWorkshops';
import Cart from './cart';
import WishList from './WishList';
import AdminDashBoard from './admin_dashboard';
import Confirmation from './CheckoutConfirmation';
import WorkshopConfirmation from './workshopenrollment';
import Confirm from './confirmationpage';
import Chat from './chat';
import Account from './account';


function App() {

  const [ Offers , setOffers ]= useState([]);
  const [ PopUp , setPopUp ] = useState(true);

  if(PopUp){
    document.body.style.overflowY = "hidden";
  }
  else{
    document.body.style.overflowY = "scroll";
  }
  useEffect(()=>{
    Axios.get("https://clear-slug-teddy.cyclic.app/getOffers").then((response)=>{
      setOffers(response.data);
    })
  },[])

  return (
    <div>
      <div className='home' id='home'>
        <div className="home-section">
              {/* <img src={homeimage} alt="home" /> */}
              <div className="container content">
                <h2 className='magic-corner'>MAGIC CORNER</h2>
                <p className='home-description'>A complete spot to all your handmade products.</p>
                {
                  Offers.map((value)=>{
                    return(
                      <>
                        <p key={value.discount} >-{value.discount} off on Shopping {value.min_price} & Above.</p>
                      </>
                    );
                  })
                }
                <a href="/#App"><button>Shop Now</button></a>
              </div>
        </div>
      </div>
      <div className="App" id="App">
      <Modal open={PopUp} onClose={() => setPopUp(false)}></Modal>
        <Router>
          <Routes>
            <Route path='/' element={<Display />} />
            <Route path='/products' element={<Products />} />
            <Route path='/users' element={<Users />} />
            <Route path='/addWorkshops' element={<Workshops />} />
            <Route path='/editProducts' element={<EditProduct />} />
            <Route path='/editWorkshops' element={<EditWorkshop />} />
            <Route path='/adminVerification' element={<Upload_Admin/>}/>
            <Route path='/userVerification' element={<Upload_User/>}/>
            <Route path='/displayProducts' element={<Filter/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/displayWorkshops' element={<Workshop/>}/>
            <Route path="/ViewProduct" element={<ProductView/>}/>
            <Route path="/ViewWorkShop" element={<ViewWorkShop/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path="/Login" element={<Login/>} />
            <Route path="/WishList" element={<WishList/>} />
            <Route path="/Confirmation" element={<Confirmation/>} />
            <Route path="/WorkshopConfirmation" element={<WorkshopConfirmation/>} />
            <Route path="/ForgotPassword" element={<ForgotPassword/>} />
            <Route path="/SendPassword" element={<SendPassword/>} />
            <Route path="/Dashboard" element={<AdminDashBoard/>} />
            <Route path="/Confirmed" element={<Confirm/>} />
            <Route path="/Chat" element={<Chat/>} />
            <Route path="/Account" element={<Account/>} />
          </Routes>
        </Router>
      </div>
      <div className="footer h-20 mb-0">
        <footer className="bg-light text-center text-white">
          <div className="container ">
            <section className="mb-4">
              <a className="btn btn-primary btn-floating m-1"
                style={{background: "#3b5998"}}
                href="#!"
                role="button"
                ><i className="fab fa-facebook-f"></i></a>

              <a className="btn btn-primary btn-floating m-1"
                style={{background: "#55acee"}}
                href="#!"
                role="button"
                ><i className="fab fa-twitter"></i></a>

              <a className="btn btn-primary btn-floating m-1"
                style={{background: "#dd4b39"}}
                href="#!"
                role="button"
                ><i className="fab fa-google"></i></a>

              <a className="btn btn-primary btn-floating m-1"
                style={{background: "#ac2bac"}}
                href="#!"
                role="button"
                ><i className="fab fa-instagram"></i></a>

              <a className="btn btn-primary btn-floating m-1"
                style={{background: "#0082ca"}}
                href="#!"
                role="button"
                ><i className="fab fa-linkedin-in"></i></a>
            </section>
          </div>
          <div className="text-center p-3" style={{background: "rgba(0, 0, 0, 0.2)"}}>
            {/* © 2022 Copyright: */}
            <div className="notice tile-about">
                <div className="owner" data-block="owner">
                    <div className='information'>
                            <h2>FAQ's</h2>
                        <div className="author">
                                {/* -. */}
                        </div>
                        <div className="description">
                            <p></p><p><b><u>Disclaimer</u><br /></b></p><p>Our beautiful products are 100% hand made with love, so as a result of human manual involvement there might be slight irregularities in color, size and knots than portrayed in pictures. These irregularities are the hallmark of hand made product and make each exquisite piece one-of-its-kind.</p><p></p><p><b><u>IMPORTANT</u></b></p><p><b>1. </b><b>Spools below 50meter will be handmade. For machine made spools buy above 50meter.</b></p><p><b>2.Please make a video while opening your package to claim any damage or missing article.</b></p><p><b>3. Cancellation after booking an order will cost you Razorpay fee. </b><b>Remaining </b><b>balance</b><b> will be refunded.</b></p><p></p><p></p><p><u><b>SHIPPING</b></u></p><p>We now ship worldwide!!!</p><p>Macramé is a handmade product which is made to order. Please coordinate with us after placing the order. (For your estimate delivery date)</p><p>Kindly allow 5-20 days(as per product kind) for dispatch.&nbsp;</p><p>Bulk or custom orders might take longer to dispatch.&nbsp;</p><p>However, shipping time is completely dependent on the shipping vendor and your locations.</p><p></p><p></p><p><u><b>RETURN</b></u></p><p>We want you to be happy with your order from us. However, since we are a small business, we are unable to offer refunds if you change your mind about an order. We will happily replace any defective or broken product. Please contact us within 48 hours via Instagram with supporting pictures as a proof of damage. After 48 hours return of the damaged product will not be liable. After the approval of images the product need to be sent by the customer itself within 7 days. WE WILL NOT COVER RETURN SHIPPING FROM THE CUSTOMER'S END. We will then send a fresh piece of same defective product within the time limit mentioned above. Please take care when mailing any items back to us. We cannot be responsible for any further damage which occurs during transit.</p><p></p><p></p><p></p><p></p><p><u><b>DURABILITY</b></u></p><p>For better durability and color don’t hang in sunlight. As these are dyed ropes so there is No Guarantee of color longevity.</p><p></p><p><u><b>CITY OF ORIGIN</b></u> – INDIA</p><p></p>
                        </div>
                        <div className="cb"></div>
                    </div>
                </div>
            </div>
            <b><a href="#!" className="text-black">MagicCorner.com</a></b>
          </div>
        </footer>  
      </div>
    </div>
  );
}

export default App;
