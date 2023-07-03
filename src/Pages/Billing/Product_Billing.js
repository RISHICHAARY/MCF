import { useState , useEffect } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "../Payment/CartPayment";
import Footer from '../../Components/Footer/index';
import NavBar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
import Loader from '../../Components/Loader/index';


import './CheckoutConfirmation.css';

const stripeTestPromise = loadStripe("pk_test_51MUVB7SGIELCYthBUvl2BAFMhq5x8tZkYaRowWH4DhV2WcS88CfIcPpQ2oKvQ1gS4c6hnrXPhXWyDW2RggOwd87T00Um8DcX51");

function Confirmation(){
    const Location = useLocation();
    const Navigate = useNavigate();
    const [ Id , setId ] = useState(null)
    const [ Name , setName ] = useState(null)
    const [ Mobile , setMobile ] = useState(null)
    const [ DName , setDName ] = useState(null)
    const [ DMobile , setDMobile ] = useState(null)
    const [ Email , setEmail ] = useState(null)
    const [ House , setHouse ] = useState(null)
    const [ Street , setStreet ] = useState(null)
    const [ Area , setArea ] = useState(null)
    const [ City , setCity ] = useState(null)
    const [ State , setState ] = useState(null)
    const [ Pin , setPin ] = useState(null)
    const [ OnCart , setOnCart ] = useState([])
    const [ Total , setTotal ] = useState(null)
    const [ STotal , setSTotal ] = useState(null)
    const [ Discount , setDiscount ] = useState("0")
    const [ AddressConfirmation , setAddressConfirmation ] = useState(false);
    const [ TCConfirmation , setTCConfirmation ] = useState(false);
    const [ PaymentMode , setPaymentMode ] = useState(null)
    const [ Loading , setLoading ] = useState(false)
    const [ PayNow , setPayNow ] = useState(false)
    const [ PayNowCheck , setPayNowCheck ] = useState(true);
    const [ Validity , setValidity ] = useState(true);
    const [ DChr , setDChr ] = useState(0);

    const Calculation = ( Received , Offers ) => {
        var T =0;
        for(var z = 0; z< Received.length ; z++){
            if(Received[z].cod !== "YES"){
                setPayNowCheck(false);
            }
        }
        var dch=0;
        for(var j = 0; j< Received.length ; j++){
            if(Received[j].dc>dch){
                dch=Received[j].dc;
            }
            T = T + parseInt(Received[j].newprice)*parseInt(Received[j].quant);
        }
        setDChr(dch);
        setSTotal(T);
        setTotal(T+dch);
        for (var k = 0; k< Offers.length ; k++){
            if(Offers[k].method === "A"){
                if(T > parseInt( Offers[k].min_price)){
                    setDiscount("Rs "+String(Offers[k].discount))
                    T = T-Offers[k].discount;
                    setTotal(T+dch);
                    break;
                }
            }
            else{
                if(T > parseInt( Offers[k].min_price)){
                    setDiscount(String(Offers[k].discount)+"%")
                    T = T-(parseFloat((Offers[k].discount)/100)*T);
                    setTotal(T+dch);
                    break;
                }
            }
        }
        setLoading(false);
    }

    const Verify = () =>{
        if(PaymentMode === null){
            alert("Select Payment Mode");
            setValidity(false);
            return;
        }
        if(TCConfirmation === false){
            alert("Agree our Conditions");
            setValidity(false);
            return
        }
        if(AddressConfirmation === false){
            alert("Verify your address");
            setValidity(false);
            return;
        }
        HandleClick()
    }

    const HandleClick = () => {
        if(Validity){
            if(PaymentMode === "COD"){
                setLoading(true);
                Axios.put("https://bored-wasp-top-hat.cyclic.app/addOrder" , { type : Location.state.type , sTotal : STotal , discount : Discount , id : Id , name : Name , mobile : Mobile , email : Email , address : DName+","+DMobile+","+House+", Street "+Street+","+City+","+State+","+Pin , products : OnCart , pm : "COD" , total : Total }).then(
                    (response)=>{
                        setLoading(false);
                        Navigate("/Confirmed" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})
                    }
                )
            }
            else if(PaymentMode === "PN"){
                var options = {
                    key: "rzp_test_ZQnRxxzCAfyRKT",
                    key_secret:"TaM9Gnwp1YgtQTdtszAu0jLj",
                    amount: Total *100,
                    currency:"INR",
                    name:Name,
                    description:"Id",
                    handler: function(response){
                        setLoading(true);
                        Axios.put("https://bored-wasp-top-hat.cyclic.app/addOrder" , { type : Location.state.type , sTotal : STotal , discount : Discount , id : Id , name : Name , mobile : Mobile , email : Email , address : DName+","+DMobile+","+House+", Street "+Street+","+City+","+State+","+Pin , products : OnCart , pm : "COD" , total : Total }).then(
                            (response)=>{
                                setLoading(false);
                                Navigate("/Confirmed" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})
                            }
                        )
                    },
                    prefill: {
                      name:Name,
                      email:Mobile,
                      contact:Email
                    },
                    notes:{
                      address:"Magiccorner Pvt.Ltd"
                    },
                    theme: {
                      color:"#3399cc"
                    }
                  };
                  var pay = new window.Razorpay(options);
                  pay.open();
            }
        }
    }

    const add = (rec , rec1) =>{
        for(var i=0 ; i< Object.keys(rec1.id).length ;i++){
            for(var j=0 ; j< rec.length ;j++){
                if(rec[j]._id === rec1.id[i]){
                    rec[j].quant = rec1.quant[i]
                    rec[j].cuz = rec1.cuz[i]
                }
            }
        }
        Axios.get("https://bored-wasp-top-hat.cyclic.app/getOffers").then((response3)=>{
                        Calculation(rec , response3.data);
                    })
        setOnCart(rec);
    }

    useEffect(()=>{
            setLoading(true);
            Axios.put("https://bored-wasp-top-hat.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setHouse(response.data[0].address.house_no);
                setStreet(response.data[0].address.street);
                setArea(response.data[0].address.area);
                setCity(response.data[0].address.city);
                setState(response.data[0].address.state);
                setName(response.data[0].full_name);
                setMobile(response.data[0].mobile_no);
                setEmail(response.data[0].email);
                setPin(response.data[0].address.pin_code);
                setId(response.data[0]._id);
                Axios.put("https://bored-wasp-top-hat.cyclic.app/getSelectedProducts" , {id:response.data[0].on_cart}).then((response1) => {
                    setOnCart(response1.data);
                    add(response1.data , response.data[0].on_cart);
                })
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [])

    return(
    <>
        {
            (Location.state === null)?<NavBar Received={{page : "CV"}}/>:(Location.state.user === undefined)?<NavBar Received={{page : "CV"}}/>:
            <NavBar Received={ {page : "CV", status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
        {
            (Location.state === null)?<SideBar Received={null}/>:(Location.state.user === undefined)?<SideBar Received={null}/>:
            <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
        {
            (Loading)?
            <Loader/>
            :
            <div id="Home">

                <div className='container'>
                    <p className='confirmation-text col-12'>Deliver To:</p>
                    <input type="text" placeholder='Name' className='general-input' defaultValue={Name} onChange={(e)=>{setDName(e.target.value);}}></input>
                    <input type="text" placeholder='Mobile' className='general-input' defaultValue={Mobile} onChange={(e)=>{setDMobile(e.target.value);}}></input>
                    <input type="text" placeholder='House No' className='general-input' defaultValue={House} onChange={(e)=>{setHouse(e.target.value);}}></input>
                    <input type="text" placeholder='Street No' className='general-input' defaultValue={Street} onChange={(e)=>{setStreet(e.target.value);}}></input>
                    <input type="text" placeholder='Area' className='general-input' defaultValue={Area} onChange={(e)=>{setArea(e.target.value);}}></input>
                    <input type="text" placeholder='City' className='general-input' defaultValue={City} onChange={(e)=>{setCity(e.target.value);}}></input>
                    <input type="text" placeholder='State' className='general-input' defaultValue={State} onChange={(e)=>{setState(e.target.value);}}></input>
                    <input type="text" placeholder='PinCode' className='general-input' defaultValue={Pin} onChange={(e)=>{setPin(e.target.value);}}></input>
                </div>

                <div className='container bill-box'>
                    <b><h4 className='bill'>Bill Details</h4></b>
                    <table className='w-100 bill-table'>
                        <tr>
                            <th className='name-th'>Product Name</th>
                            <th className='p-th'>Quantity</th>
                            <th className='p-th'>Original Price</th>
                            <th className='p-th'>Sold Price</th>
                        </tr>
                        {OnCart.map((value)=>{
                            return(
                                <tr key={value.name}>
                                    <td className='p-td'>
                                    {(value.cuz !== null && value.cod !== "YES")?value.name +" (NO CASH ON DELIVERY + CUSTOMIZATION CHARGES INCLUDE)":(value.cod !== "YES")?value.name +" (NO CASH ON DELIVERY)": (value.cuz !== null) ?value.name +" (CUSTOMIZATION CHARGES TO PAID AT DELIVERY)": value.name}
                                    </td>
                                    <td className='q'>{value.quant}</td>
                                    <td>Rs {value.oldprice}</td>
                                    <td>Rs {value.newprice}</td>
                                </tr>
                            );
                        })}
                        <tr><td><p> </p> </td></tr>
                        <tr>
                            <td><b className='discount'><p>Sub Total :</p></b></td>
                            <td className='text-center'><b><p>Rs {STotal}</p></b></td>
                        </tr>
                        <tr>
                            <td><b className='discount'><p>Discount :</p></b></td>
                            <td className='text-center'><b><p>{Discount}</p></b></td>
                        </tr>
                        <tr>
                            <td><b className='discount'><p>Delivery :</p></b></td>
                            <td className='text-center'><b><p>{DChr}</p></b></td>
                        </tr>
                        <tr>
                            <td><b className='discount'><p>TOTAL :</p></b></td>
                            <td className='text-center'><b><p>Rs {Total}</p></b></td>
                        </tr>
                    </table>
                    <div className='pay-now'>
                    {
                        (PayNowCheck)?
                        <>
                            <input type="radio" className='radio' name='payment' onChange={()=>{setPaymentMode("COD");}} /><p className='check-box-text'>Pay on Delivery</p>
                        </>
                        :<></>
                    }
                    <input type="radio" className='radio' name='payment' onChange={()=>{setPaymentMode("PN");}} /><p className='check-box-text'>Pay Now</p>
                    </div>
                    <div className='clear'></div>
                </div>

                <div className='container terms-conditions'>
                    <input type="checkbox" className='chck' onChange={()=>{setAddressConfirmation(true)}} /><p className='check-text'>By checking this you confirm your delivery address given above.</p>
                    <br></br>
                    <input type="checkbox" className='chck' onChange={()=>{setTCConfirmation(true)}} /><p className='check-text'>By checking this you agree to our all terms and conditions.</p>
                    {
                        (PayNow)?
                        <Elements stripe={stripeTestPromise}>
                            <PaymentForm state={{ AddressConfirmation: AddressConfirmation , sTotal : STotal , discount : Discount , TcConfirmation : TCConfirmation , status : Location.state.status , type : Location.state.type , id : Id , name : Name , mobile : Mobile , email : Email , address : House+", Street "+Street+","+City+","+State , products : OnCart , total : Total }} />
                        </Elements>
                        :
                        <>
                            <button className='final-button-cc' onClick={()=>{Verify()}}>PROCEED</button>
                        </>
                    }
                </div>
            </div>
        }
        {
            (Location.state === null)?<Footer Received={null}/>:(Location.state.user === undefined)?<Footer Received={null}/>:
            <Footer Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
    </>
    );

}

export default Confirmation;