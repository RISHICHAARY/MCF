import { useState , useEffect } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "../Payment/WorkshopPayment";
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
    const [ Email , setEmail ] = useState(null)
    const [ OnCart , setOnCart ] = useState([])
    const [ AddressConfirmation , setAddressConfirmation ] = useState(false);
    const [ TCConfirmation , setTCConfirmation ] = useState(false);
    const [ PaymentMode , setPaymentMode ] = useState(null)
    const [ Loading , setLoading ] = useState(false)
    const [ PayNow , setPayNow ] = useState(false)
    const [ Total , setTotal ] = useState(null)
    const [ WN , setWN ] = useState(null)
    const [ WG , setWG ] = useState(null);

    const HandleClick = () => {
        if(AddressConfirmation === false){
            alert("Agree our Conditions");
        }
        if(TCConfirmation === false){
            alert("Verify your address");
        }
        if(PaymentMode === "PN"){
            var options = {
                key: "rzp_test_ZQnRxxzCAfyRKT",
                key_secret:"TaM9Gnwp1YgtQTdtszAu0jLj",
                amount: Total *100,
                currency:"INR",
                name:Name,
                description:"Id",
                handler: function(response){
                    setLoading(true);
                    Axios.put("http://localhost:3001/addEnrollment" , { wg : WG , wn : WN, type : Location.type , id :Id , name : Name , mobile : Mobile , email : Email , total : Total }).then(
                    ()=>{
                        setLoading(false);
                        Navigate("/Confirmed" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}});
                    })
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
        else{
            alert("Select Payment Mode");
        }
    }

    useEffect(()=>{
            setLoading(true);
            Axios.put("http://localhost:3001/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setName(response.data[0].full_name);
                setMobile(response.data[0].mobile_no);
                setEmail(response.data[0].email);
                setId(response.data[0]._id);
                Axios.put("http://localhost:3001/getSelectedWorkShops" , {id:Location.state.Product_id}).then((response1) => {
                    setOnCart(response1.data);
                    setTotal(response1.data[0].newprice);
                    setWN(response1.data[0].name);
                    setWG(response1.data[0].watsapp_grp)
                    setLoading(false);
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
            <>
                <div id="Home">
                <div className='container'>
                    <p className='confirmation-text'>Enroll To:</p><br></br>
                    <input type="text" placeholder='NAME' className='general-input' defaultValue={Name} onChange={(e)=>{setName(e.target.value);}}></input>
                    <input type="text" placeholder='EMAIL ID' className='general-input' defaultValue={Email} onChange={(e)=>{setEmail(e.target.value);}}></input>
                    <input type="text" placeholder='MOBILE NO' className='general-input' defaultValue={Mobile} onChange={(e)=>{setMobile(e.target.value);}}></input>
                </div>

                <div className='container bill-box'>
                    <b><p className='bill'>BILL</p></b>
                    <table className='w-100'>
                        <tr>
                            <th className='name-th'>Workshop Name</th>
                            <th className='p-th'>Original Price</th>
                            <th className='p-th'>Enrolled Price</th>
                        </tr>
                        {OnCart.map((value)=>{
                            return(
                                <>
                                    <tr key={value.name}>
                                        <td className='p-td'>
                                        {value.name}
                                        </td>
                                        <td>Rs {value.oldprice}</td>
                                        <td>Rs {value.newprice}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><b className='discount'><p>TOTAL :</p></b></td>
                                        <td><b><p>Rs {value.newprice}</p></b></td>
                                    </tr>
                                </>
                            );
                        })}
                        <tr><td><p> </p> </td></tr>
                    </table>
                    <div className='pay-now'>
                    <input type="radio" className='radio' name='payment' onChange={()=>{setPaymentMode("PN");}} /><p className='check-box-text'>Pay Now</p>
                    </div>
                    <div className='clear'></div>
                </div>

                <div className='container terms-conditions'>
                    <input type="checkbox" className='chck' onChange={()=>{setAddressConfirmation(true)}} /><p className='check-box-text'>By checking this you confirm your details given above.</p>
                    <br></br>
                    <input type="checkbox" className='chck' onChange={()=>{setTCConfirmation(true)}} /><p className='check-box-text'>By checking this you agree to our all terms and conditions.</p>
                    {
                        (PayNow)?
                        <Elements stripe={stripeTestPromise}>
                            <PaymentForm state={{ status : Location.state.status , type : Location.state.type , wg : WG, wn : WN , id : Id , name : Name , mobile : Mobile , email : Email , total : Total }} />
                        </Elements>
                        :
                        <>
                            <button className='final-button-cc' onClick={()=>{HandleClick()}}>PROCEED</button>
                        </>
                    }
                </div>
                </div>
            </>
        }
        {
            (Location.state === null)?<Footer Received={null}/>:(Location.state.user === undefined)?<Footer Received={null}/>:
            <Footer Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
        }
    </>
    );

}

export default Confirmation;