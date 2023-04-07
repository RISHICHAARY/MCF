import { useState , useEffect } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./Payment"

import './CheckoutConfirmation.css';

const stripeTestPromise = loadStripe("pk_test_51MUVB7SGIELCYthBUvl2BAFMhq5x8tZkYaRowWH4DhV2WcS88CfIcPpQ2oKvQ1gS4c6hnrXPhXWyDW2RggOwd87T00Um8DcX51");

function Confirmation(){
    const Location = useLocation();
    const Navigate = useNavigate();
    const [ Id , setId ] = useState(null)
    const [ Name , setName ] = useState(null)
    const [ Mobile , setMobile ] = useState(null)
    const [ Email , setEmail ] = useState(null)
    const [ House , setHouse ] = useState(null)
    const [ Street , setStreet ] = useState(null)
    const [ Area , setArea ] = useState(null)
    const [ City , setCity ] = useState(null)
    const [ State , setState ] = useState(null)
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

    const Calculation = ( Received , Offers ) => {
        var T =0;
        for(var z = 0; z< Received.length ; z++){
            if(Received[z].cod !== "YES"){
                setPayNowCheck(false);
            }
        }
        for(var j = 0; j< Received.length ; j++){
            T = T + parseInt(Received[j].newprice)*parseInt(Received[j].quant);
        }
        setSTotal(T);
        setTotal(T);
        for (var k = 0; k< Offers.length ; k++){
            if(Offers[k].method === "A"){
                if(T > parseInt( Offers[k].min_price)){
                    setDiscount("Rs "+String(Offers[k].discount))
                    T = T-Offers[k].discount;
                    setTotal(T);
                    break;
                }
            }
            else{
                if(T > parseInt( Offers[k].min_price)){
                    setDiscount(String(Offers[k].discount)+"%")
                    T = T-(parseFloat((Offers[k].discount)/100)*T);
                    setTotal(T);
                    break;
                }
            }
        }
        setLoading(false);
    }

    const HandleClick = () => {
        if(AddressConfirmation === false){
            alert("Agree our Conditions");
        }
        if(TCConfirmation === false){
            alert("Verify your address");
        }
        if(PaymentMode === "COD" && AddressConfirmation === true && TCConfirmation === true){
            setLoading(true);
            Axios.put("https://clear-slug-teddy.cyclic.app/addOrder" , { type : Location.state.type , sTotal : STotal , discount : Discount , id : Id , name : Name , mobile : Mobile , email : Email , address : House+", Street "+Street+","+City+","+State , products : OnCart , pm : "COD" , total : Total }).then(
                (response)=>{
                    setLoading(false);
                    Navigate("/Confirmed" , { state: {status: Location.state.status, name : Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id}})
                    alert("Your Order is placed successfully");
                }
            )
        }
        else if(PaymentMode === "PN" && AddressConfirmation === true && TCConfirmation === true){
            setPayNow(true);
        }
        else{
            alert("Select Payment Mode");
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
        Axios.get("https://clear-slug-teddy.cyclic.app/getOffers").then((response3)=>{
                        Calculation(rec , response3.data);
                    })
        setOnCart(rec);
    }

    useEffect(()=>{
            setLoading(true);
            Axios.put("https://clear-slug-teddy.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response)=>{
                setHouse(response.data[0].address.house_no);
                setStreet(response.data[0].address.street);
                setArea(response.data[0].address.area);
                setCity(response.data[0].address.city);
                setState(response.data[0].address.state);
                setName(response.data[0].full_name);
                setMobile(response.data[0].mobile_no);
                setEmail(response.data[0].email);
                setId(response.data[0]._id);
                Axios.put("https://clear-slug-teddy.cyclic.app/getSelectedProducts" , {id:response.data[0].on_cart}).then((response1) => {
                    setOnCart(response1.data);
                    add(response1.data , response.data[0].on_cart);
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
                    <p className='confirmation-text'>Deliver To:</p><br></br>
                    <input type="text" placeholder='House No' className='general-input' defaultValue={House} onChange={(e)=>{setHouse(e.target.value);}}></input>
                    <input type="text" placeholder='Street No' className='general-input' defaultValue={Street} onChange={(e)=>{setStreet(e.target.value);}}></input>
                    <input type="text" placeholder='Area' className='general-input' defaultValue={Area} onChange={(e)=>{setArea(e.target.value);}}></input>
                    <input type="text" placeholder='City' className='general-input' defaultValue={City} onChange={(e)=>{setCity(e.target.value);}}></input>
                    <input type="text" placeholder='State' className='general-input' defaultValue={State} onChange={(e)=>{setState(e.target.value);}}></input>
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
                                    <td className='p-td'>va
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
                            <td><b className='discount'><p>SUB TOTAL :</p></b></td>
                            <td className='text-center'><b><p>Rs {STotal}</p></b></td>
                        </tr>
                        <tr>
                            <td><b className='discount'><p>DISCOUNT :</p></b></td>
                            <td className='text-center'><b><p>{Discount}</p></b></td>
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
                    <input type="checkbox" onChange={()=>{setAddressConfirmation(true)}} /><p className='check-text'>By checking this you confirm your delivery address given above.</p>
                    <br></br>
                    <input type="checkbox" onChange={()=>{setTCConfirmation(true)}} /><p className='check-text'>By checking this you agree to our all terms and conditions.</p>
                    {
                        (PayNow)?
                        <Elements stripe={stripeTestPromise}>
                            <PaymentForm state={{ AddressConfirmation: AddressConfirmation , sTotal : STotal , discount : Discount , TcConfirmation : TCConfirmation , status : Location.state.status , type : Location.state.type , id : Id , name : Name , mobile : Mobile , email : Email , address : House+", Street "+Street+","+City+","+State , products : OnCart , total : Total }} />
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