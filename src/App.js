/* eslint-disable react/jsx-pascal-case */
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import Axios from 'axios';
import {useEffect,useState } from 'react';

import Modal from './popup';

import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.bundle";
import './home.css'
import './App.css';
import './Footer.css'

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
import Contact from './contactus';
import TC from './TC';
import CP from './CP';
import FA from './Faq';
import PP from './PP';
import ScrollToTop from './ScrollToTop';

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
    Axios.get("http://localhost:3001/getOffers").then((response)=>{
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
          <ScrollToTop/>
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
            <Route path="/terms-and-conditions" element={<TC/>} />
            <Route path="/cancellation-policy" element={<CP/>} />
            <Route path="/faq's" element={<FA/>} />
            <Route path="/privacy-policy" element={<PP/>} />
            <Route path="/ContactUS" element={<Contact/>} />
          </Routes>
        </Router>
      </div>
      <footer className="site-footer footer-main mb-0">
        <div className="bg-light text-center text-white">
          <div className="container ">
            <section className="mb-4">
              <a className="btn btn-primary btn-floating m-class"
                style={{background: "#3b5998"}}
                target="blank"
                href="https://www.facebook.com/profile.php?id=100077511198592"
                role="button"
                ><i className="fab fa-facebook-f"></i></a>

              {/* <a className="btn btn-primary btn-floating m-1"
                style={{background: "#55acee"}}
                href="#!"
                role="button"
                ><i className="fab fa-twitter"></i></a> */}

              {/*<a className="btn btn-primary btn-floating m-class"
                style={{background: "#dd4b39"}}
                href="https://www.magiccorner.in/"
                role="button"
                ><i className="fab fa-google"></i></a>*/}

              <a className="btn btn-primary btn-floating m-class"
                style={{background: "#ac2bac"}} 
                target="blank"
                href="https://www.instagram.com/magic_._corner/"
                role="button"
                ><i className="fab fa-instagram"></i></a>

              {/* <a className="btn btn-primary btn-floating m-1"
                style={{background: "#0082ca"}}
                href="#!"
                role="button"
                ><i className="fab fa-linkedin-in"></i></a> */}
            </section>
          </div>
          {/* <div className="text-center p-3" style={{background: "rgba(0, 0, 0, 0.1)"}}> */}
            {/* © 2022 Copyright: */}
           
            {/* <a href="magiccorner.in" className="text-black">Magiccorner.in</a> */}
          {/* </div> */}
          
        </div>  
      </footer>
    </div>
  );
}

export default App;
