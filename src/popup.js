import {useState , useEffect} from 'react';
import Axios from 'axios';
import ReactDom from 'react-dom'

export default function Popup({ open,onClose }){
    const [ Offers , setOffers ]= useState([]);

    useEffect(()=>{
        Axios.get("https://clear-slug-teddy.cyclic.app/getOffers").then((response)=>{
          setOffers(response.data);
        })
      },[])

      if (!open) return null

    return ReactDom.createPortal(
        <div className="pb" id="pb">
        <div className="PopUp">
          <button onClick={onClose} className="close"><i class="fi fi-rr-cross"></i></button>
          <br></br>
          <h1 className="popup-h1">Magic Corner Offers</h1>
          {
            Offers.map((value)=>{
              return(
                <>
                  <p key={value} className="offers" >FLAT <p className='offer-rate'>{(value.method === "P")?value.discount+"%":"Rs "+value.discount} OFF <br /></p> ON MINIMUM PURCHASE OF {value.min_price} & ABOVE.</p>
                </>
              );
            })
          }
          <div className="shape1"></div>
        </div>
        </div>,
        document.getElementById('portal')
    )
}