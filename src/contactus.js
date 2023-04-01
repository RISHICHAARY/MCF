import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import Axios from 'axios';
import NavBar from './navbar';
import SideBar from './SideBar';
import Faqs from './faqs';
import './contactus.css';

export default function ContactUs(){

    const Location = useLocation();

    const [UserMail , setUserMail] = useState(null);
    const [UserQuery , setUserQuery] = useState(null);
    const [Loading , setLoading] = useState(false);

    const Send = () =>{
        setLoading(true)
        Axios.put("https://clear-slug-teddy.cyclic.app/addContactQuery" , {user:UserMail , query : UserQuery}).then(()=>{
            setLoading(false)
        })
    }

    return(
        <>
            {
                (Location.state === null)?<NavBar Received={{page : "Q"}}/>:(Location.state.user === undefined)?<NavBar Received={{page : "Q"}}/>:
                <NavBar Received={ {page : "H", status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Location.state === null)?<SideBar Received={null}/>:(Location.state.user === undefined)?<SideBar Received={null}/>:
                <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Loading)?
                    <div className='loader-main'>
                        <div className="loader"></div>
                        {/* <p className='loader-text'>Loading...</p> */}
                    </div>
                :
                    <div className='container w-75 alignment py-5'>
                        <input type="email" className='MailId-Input' placeholder='MailID' onChange={(e)=>{setUserMail(e.target.value)}}/>
                        <textarea className='Query-Input' placeholder='Query' rows="6" onChange={(e)=>{setUserQuery(e.target.value)}} />
                        <p className='warning'>*We will reply to the mail given.</p>
                        <button className='Send-Button' onClick={Send}>SEND</button>
                    </div>
            }

            {
                (Location.state === null)?<Faqs Received={null}/>:(Location.state.user === undefined)?<SideBar Received={null}/>:
                <Faqs Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
        </>
    )
}