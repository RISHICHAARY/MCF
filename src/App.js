/* eslint-disable react/jsx-pascal-case */
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import { useState } from 'react';

import Modal from './Components/PopUp/index';

import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.bundle";
//import '../../Styles/Login_Register.css';
import './App.css';
import './Components/Footer/Footer.css'

import Home from './Pages/Home/Home';
import AddProducts from './Pages/AddProducts/AddProducts';
import Register from './Pages/Register/Register';
import ForgotPassword from './Pages/Password/RetrivePassword';
import SendPassword from './Pages/Password/SendPassword';
import Login from './Pages/Login/Login';
import AddWorkshops from './Pages/AddWorkshops/AddWorkshops';
import EditProduct from './Pages/Edit/editProduct'
import EditWorkshop from './Pages/Edit/editWorkshops';
import Upload_User from './Pages/Register/Upload_User';
import Upload_Admin from './Pages/Register/Upload_Admin';
import Products from './Pages/Products/Products';
import Search from './Pages/Products/searchbar';
import Workshops from './Pages/Workshops/Workshops';
import ProductView from './Components/View/ViewProduct';
import ViewWorkShop from './Components/View/ViewWorkshops';
import Cart from './Pages/Cart/cart';
import WishList from './Pages/Wishlist/WishList';
import AdminDashBoard from './Pages/Accounts/admin_dashboard';
import Confirmation from './Pages/Billing/Product_Billing';
import WorkshopConfirmation from './Pages/Billing/Workshop_Billing';
import Confirm from './Pages/Confirmation/confirmationpage';
import Chat from './Pages/Chat/chat';
import Account from './Pages/Accounts/account';
import Contact from './Pages/ContactUs/contactus';
import TC from './Components/Footer/TC';
import AboutUs from './Components/Footer/About';
import PP from './Components/Footer/PP';
import Category from './Pages/AddProducts/AddCategory';
import Tag from './Pages/AddProducts/AddTag';
import Review from './Pages/AddProducts/AddReview';
import ScrollToTop from './Components/Footer/ScrollToTop';

function App() {

  const [ PopUp , setPopUp ] = useState(true);

  if(PopUp){
    document.body.style.overflowY = "hidden";
  }
  else{
    document.body.style.overflowY = "scroll";
  }

  return (
    <div>
      <div className="App" id="App">
      <Modal open={PopUp} onClose={() => setPopUp(false)}></Modal>
        <Router>
          <ScrollToTop/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/AddProducts' element={<AddProducts />} />
            <Route path='/Register' element={<Register />} />
            <Route path='/AddWorkshops' element={<AddWorkshops />} />
            <Route path='/editProducts' element={<EditProduct />} />
            <Route path='/editWorkshops' element={<EditWorkshop />} />
            <Route path='/adminVerification' element={<Upload_Admin/>}/>
            <Route path='/userVerification' element={<Upload_User/>}/>
            <Route path='/Products' element={<Products/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/Workshops' element={<Workshops/>}/>
            <Route path="/ViewProduct" element={<ProductView/>}/>
            <Route path="/ViewWorkShop" element={<ViewWorkShop/>}/>
            <Route path='/Cart' element={<Cart/>}/>
            <Route path="/Login" element={<Login/>} />
            <Route path="/WishList" element={<WishList/>} />
            <Route path="/CartConfirmation" element={<Confirmation/>} />
            <Route path="/WorkshopConfirmation" element={<WorkshopConfirmation/>} />
            <Route path="/ForgotPassword" element={<ForgotPassword/>} />
            <Route path="/SendPassword" element={<SendPassword/>} />
            <Route path="/Dashboard" element={<AdminDashBoard/>} />
            <Route path="/Confirmed" element={<Confirm/>} />
            <Route path="/Chat" element={<Chat/>} />
            <Route path="/Account" element={<Account/>} />
            <Route path="/Terms-and-conditions" element={<TC/>} />
            <Route path="/AboutUs" element={<AboutUs/>} />
            <Route path="/Privacy-policy" element={<PP/>} />
            <Route path="/ContactUS" element={<Contact/>} />
            <Route path="/AddCategory" element={<Category/>} />
            <Route path="/AddTag" element={<Tag/>} />
            <Route path="/AddReview" element={<Review/>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
