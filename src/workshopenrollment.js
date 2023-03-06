import { useState , useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./WorkshopPayment"

import './CheckoutConfirmation.css';

const stripeTestPromise = loadStripe("pk_test_51MUVB7SGIELCYthBUvl2BAFMhq5x8tZkYaRowWH4DhV2WcS88CfIcPpQ2oKvQ1gS4c6hnrXPhXWyDW2RggOwd87T00Um8DcX51");

function Confirmation(){
    const Location = useLocation();

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
            setPayNow(true);
        }
        else{
            alert("Select Payment Mode");
        }
    }

    useEffect(()=>{
            setLoading(true);
            Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setName(response.data[0].full_name);
                setMobile(response.data[0].mobile_no);
                setEmail(response.data[0].email);
                setId(response.data[0]._id);
                Axios.put("https://clear-slug-teddy.cyclic.app/getSelectedWorkShops" , {id:Location.state.Product_id}).then((response1) => {
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
            (Loading)?
            <div className='loader-main'>
                <div className="loader"></div>
                {/* <p className='loader-text'>Confirming Order</p> */}
            </div>
            :
            <>

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
                            <th className='name-th'>WORKSHOP NAME</th>
                            <th className='p-th'>ORIGINAL PRICE</th>
                            <th className='p-th'>ENROLLED PRICE</th>
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
                    <input type="checkbox" onChange={()=>{setAddressConfirmation(true)}} /><p className='check-box-text'>By checking this you confirm your delivery address given above.</p>
                    <br></br>
                    <input type="checkbox" onChange={()=>{setTCConfirmation(true)}} /><p className='check-box-text'>By checking this you agree to our all terms and conditions.</p>
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
            </>
        }
    </>
    );

}

export default Confirmation;