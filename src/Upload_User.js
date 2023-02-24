import Axios from 'axios';
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage';
import { storage } from './cloud'
import { useNavigate , useLocation } from 'react-router-dom';
import { useEffect , useState } from 'react';

function Upload_User(){

    const [ Captchaa , setCaptchaa ] = useState("");
    const [ OOTP , setOOTP ] = useState("");
    const [ Loading , setLoading ] = useState(false);

    const  Navigate = useNavigate();
    const Location = useLocation();

    useEffect(
        ()=>{
            Axios.post("http://localhost:3001/userMailer" , {
                name : Location.state.name,
                otp : Location.state.otp,
                mail : Location.state.email,
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        } , []
    );

    const Upload = () => {
        if (Location.state.file == null) return;
        setLoading(true);
        const FileReference = ref(storage , `User_DP/${Location.state.file.name+Location.state.name+Location.state.email}`);
        uploadBytes(FileReference , Location.state.file).then((FileData) => {
            getDownloadURL(FileData.ref).then((url) => {
                Axios.put("http://localhost:3001/addUser" , 
                {
                    image_url : url,
                    name : Location.state.name,
                    email : Location.state.email,
                    mobile : Location.state.mobile,
                    gender : Location.state.gender,
                    dob : Location.state.dob,
                    age : Location.state.age,
                    house : Location.state.house,
                    street : Location.state.street,
                    area : Location.state.area,
                    city : Location.state.city,
                    state : Location.state.status,
                    password : Location.state.password,
                    pincode : Location.state.pinCode,
                }).then(()=>{
                    setLoading(false);
                    Navigate('/Login');
                })
            });
        });
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
                <div className='loader-main'>
                    <div className="loader"></div>
                    <p className='loader-text'>Getting You In...</p>
                </div>
                :
                <div className="overall-log" id="Home">
                    <div className="main-container">
                        <div className="container">
                            <button className="float-start general-button disabled-button" disabled>
                                VERIFICATION
                                <i className="fi fi-ss-user end-icons" ></i>
                            </button>
                            <div className="container sub-container-1 float-start">
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
                                </form>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="clear"></div>
                </div>
            }
        </>
    );
}

export default Upload_User;