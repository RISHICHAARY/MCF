import Axios from 'axios';
import { useNavigate , useLocation } from 'react-router-dom';
import { useEffect , useState } from 'react';

import NavBar from '../../Components/NavBar/index';
import Footer from '../../Components/Footer/index';

function Upload_User(){

    const [ Captchaa , setCaptchaa ] = useState("");
    const [ OOTP , setOOTP ] = useState("");
    const [ Loading , setLoading ] = useState(false);

    const  Navigate = useNavigate();
    const Location = useLocation();

    useEffect(
        ()=>{
            setLoading(true);
            if(Location.state.type === 'admin'){
                Axios.put("https://busy-lion-umbrella.cyclic.app/otpMailer" , {
                    name : Location.state.name,
                    otp : Location.state.otp,
                    mail : Location.state.email,
                });
                setLoading(false)
            }
            else{
                Axios.put("https://busy-lion-umbrella.cyclic.app/otpMailer" , {
                    name : Location.state.name,
                    otp : Location.state.otp,
                    mail : Location.state.email,
                });
                setLoading(false)
            }
            /*Axios.put("https://busy-lion-umbrella.cyclic.app/OtpMailer" , {
                type : Location.state.type,
                otp : Location.state.otp,
                email : Location.state.email,
            }).then(()=>{
                console.log("sent");
                setLoading(false);
            });*/
        // eslint-disable-next-line react-hooks/exhaustive-deps
        } , []
    );

    const check = () => {
        if(Captchaa.toString() === Location.state.captcha.toString()){
            if(OOTP.toString() === Location.state.otp.toString()){
                setLoading(true);
                Axios.put("https://busy-lion-umbrella.cyclic.app/PasswordMailer" , {type : Location.state.type,name : Location.state.name,pass:Location.state.pass,email : Location.state.email}).then(()=> {
                    setLoading(false)
                    Navigate("/Login");
                })
            }
            else{
                alert("OTP Miss Match");
            }
        }
        else{
            alert("Captcha Miss Match");
        }
    };

    return(
        <>
            {
                (Loading)?
                <div className='loader-main'>
                    <div className="loader"></div><br />
                    <p className='loader-text'>Sending Your Password...</p>
                </div>
                :
                <div>
                    {
                        <NavBar Received={{page : "NO"}}/>
                    }
                <div className="row Main-Row">
                <div className="col-8 User-Verify col8">
                    <div id="Home" className="overall">
                        <div>
                            <p className="Login-Header">STEPS TO RETRIVE PASSWORD</p>
                            <p>1. Enter your account's Email.</p>
                            <p><b>2. Enter the OTP sent to your Email {Location.state.email}.</b></p>
                            <p><b>3. Your PASSWORD will be sent to your Email {Location.state.email}.</b></p>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                <div className="overall" id="Home">
                    <div className="">
                        <div className="">
                            <div className="">
                                <form>
                                    <p className="label-log-attributes">
                                        CAPTCHA: <s>{Location.state.captcha}</s>
                                    </p>
                                    <br></br>
                                    <input type="text" placeholder="CAPTCHA" 
                                        className="input-log-attributes w-100"
                                        onChange={(event)=>{setCaptchaa(event.target.value)}}>
                                    </input>
                                    <br></br>
                                    <p className="label-log-attributes">
                                        OTP:
                                    </p>
                                    <br></br>
                                    <input type="text" placeholder="OTP" 
                                        className="input-log-attributes w-100"
                                        onChange={(event)=>{setOOTP(event.target.value)}}>
                                    </input>
                                    <button className="final-button general-button"
                                        onClick={check} type="button">
                                        VERIFY
                                        <i className="fi fi-br-angle-right end-icons-err"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="clear"></div>
                </div>
                </div>
                </div>
                </div>
            }
            {
                <Footer Received={null}/>
            }
        </>
    );
}

export default Upload_User;