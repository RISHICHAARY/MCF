import Axios from 'axios';
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage';
import { storage } from '../../cloud'
import { useNavigate , useLocation } from 'react-router-dom';
import { useEffect , useState } from 'react';

import NavBar from '../../Components/NavBar/index';
import Footer from '../../Components/Footer/index';
import Loader from '../../Components/Loader/index';

function Upload_User(){

    const [ Captchaa , setCaptchaa ] = useState("");
    const [ OOTP , setOOTP ] = useState("");
    const [ Loading , setLoading ] = useState(false);
    const [ Resend , setResend ] = useState(false);

    const  Navigate = useNavigate();
    const Location = useLocation();
    const resend = () =>{
        setResend(false);
        Axios.post("http://localhost:3001/adminMailer" , {
                name : Location.state.name,
                otp : Location.state.otp,
                mail : Location.state.email,
            });
        setResend(true);
    }

    useEffect(
        ()=>{
            Axios.post("http://localhost:3001/adminMailer" , {
                name : Location.state.name,
                otp : Location.state.otp,
                mail : Location.state.email,
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        } , []
    );

    const Upload = () => {
        if (Location.state.file !== null){
        setLoading(true);
        const FileReference = ref(storage , `Admin_DP/${Location.state.file.name+Location.state.name+Location.state.email}`);
        uploadBytes(FileReference , Location.state.file).then((FileData) => {
            getDownloadURL(FileData.ref).then((url) => {
                Axios.put("http://localhost:3001/addAdmin" , 
                {
                    image_url : url,
                    name : Location.state.name,
                    email : Location.state.email,
                    mobile : Location.state.mobile,
                    house : Location.state.house,
                    street : Location.state.street,
                    area : Location.state.area,
                    city : Location.state.city,
                    state : Location.state.status,
                    pcode : Location.state.pincode,
                    password : Location.state.password
                }).then(()=>{
                    Axios.put("http://localhost:3001/Admin",{email:Location.state.email}).then((result)=>{
                        setLoading(false);
                        Navigate('/Dashboard',{state:{name:Location.state.name,user:Location.state.email,page:"H",type:"admin",status:"LoggedIn",id:result.data[0]._id}});
                    })
                })
            });
        });
        }
        else{
            setLoading(true);
            Axios.put("http://localhost:3001/addAdmin" , 
                {
                    image_url : "https://firebasestorage.googleapis.com/v0/b/codemath-99434.appspot.com/o/ProFo.png?alt=media&token=04fe1a30-816b-435c-8653-d14466b64fcb",
                    name : Location.state.name,
                    email : Location.state.email,
                    mobile : Location.state.mobile,
                    house : Location.state.house,
                    street : Location.state.street,
                    area : Location.state.area,
                    city : Location.state.city,
                    state : Location.state.status,
                    pcode : Location.state.pincode,
                    password : Location.state.password
                }).then(()=>{
                    Axios.put("http://localhost:3001/Admin",{email:Location.state.email}).then((result)=>{
                        setLoading(false);
                        Navigate('/Dashboard',{state:{name:Location.state.name,user:Location.state.email,page:"H",type:"admin",status:"LoggedIn",id:result.data[0]._id}});
                    })
                })
        }
    };

    const check = () => {
        if(Captchaa.toString() === Location.state.captcha.toString()){
            if(OOTP.toString() === Location.state.otp.toString()){
                Upload();
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
            <Loader/>
            :
            <div>
                    {
                        <NavBar Received={{page : "NO"}}/>
                    }
                <div className="row Main-Row">
                <div className="col-8 User-Verify col8">
                    <div id="Home" className="overall">
                        <div>
                        {(Resend)?<div className="Login-Header"><p>OTP Re-Sent to magiccornerin@gmail.com.</p></div>:<div className="Login-Header"><p>OTP Sent to magiccornerin@gmail.com.</p></div>}
                        </div>
                    </div>
                </div>
            <div className="col-4">
            <div id='Home'>
                <div className="overall">
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
                                        <p className="final-label">
                                        VERIFY
                                        <i className="fi fi-br-angle-right end-icons-err"></i>
                                        </p>
                                    </button>
                                    <div className='E-det'>
                                        <button className="resend-button general-button"
                                            onClick={resend} type="button">
                                            <p className="final-label">
                                            RESEND OTP
                                            <i className="fi fi-br-angle-right end-icons-err"></i>
                                            </p>
                                        </button>
                                    </div>
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
            {
                <Footer Received={null}/>
            }
            </div>
        }
        </>
    );
}

export default Upload_User;