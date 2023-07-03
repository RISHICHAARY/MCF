import { useState , useEffect } from "react";
import { useNavigate} from "react-router-dom";
import Axios from 'axios';
import '../../Styles/Login_Register.css';

import NavBar from '../../Components/NavBar/index';
import Footer from '../../Components/Footer/index';

function RetrivePassword(){
    const [ Username , setUsername ] = useState (null );
    const Navigate = useNavigate();

    let Captcha=0
    let OTP = 0

    const generator = () =>{
        Captcha = Math.floor((Math.random()*9999)+1000);
        OTP = Math.floor((Math.random()*9999)+1000);
    }

    useEffect(
        () =>{
            Axios.get("http://localhost:3001/allUsers").then((response) => {
                setUsers_list(response.data);
            });
            Axios.get("http://localhost:3001/allAdmins").then((response) => {
                setAdmins_list(response.data);
            });
        } , []
    );

    const [ Users_list , setUsers_list ] = useState([]);
    const [ Admins_list , setAdmins_list ] = useState([]);

    const validate = () => {
        if(Admins_list.length === 0){
            if(Users_list.length === 0){
                alert("Invalid Username!!");
            }
            if(Users_list.length !== 0){
                for(var j = 0 ; j <= Users_list.length ; j++){
                    if( Users_list[j].email.toString() === Username.toString() ){
                        generator()
                        Navigate("/SendPassword" , {state:{type : "user",pass:Users_list[j].password, name :Users_list[j].full_name, captcha:Captcha , otp:OTP , email : Username}});
                        break;
                    }
                    else if( j === Users_list.length-1 ){alert("Invalid Username!!");}
                }
            }
        }
        else{
            for(var i = 0; i < Admins_list.length ; i++){
                if( Admins_list[i].email.toString() === Username.toString() ){
                    generator();
                    Navigate("/SendPassword" , {state:{type : "admin",pass:Admins_list[i].password, name :Admins_list[i].full_name , captcha:Captcha , otp:OTP , email : Username}});
                    break;
                }
                else if(i === Admins_list.length-1 && Users_list.length === 0){
                    alert("Invalid Username!!");
                }
                else if( i === Admins_list.length-1 ){
                    for( j = 0 ; j <= Users_list.length ; j++){
                        if( Users_list[j].email.toString() === Username.toString() ){
                            generator();
                            Navigate("/SendPassword" , {state:{type : "user",pass:Users_list[j].password, name :Users_list[j].full_name , captcha:Captcha , otp:OTP , email : Username}});
                            break;
                        }
                        else if( j === Users_list.length-1 ){alert("Invalid Username!!");}
                    }
                }
            }
        }
    };
        
    const check = () => {
        validate();

    };

    return(
        <div>
            {
                <NavBar Received={{page : "NO"}}/>
            }
        <div className="row Main-Row">
        <div className="col-8 User-Verify col8">
            <div id="Home" className="overall">
                <div>
                    <p className="Login-Header">STEPS TO RETRIVE PASSWORD</p>
                    <p><b>1. Enter your account's Email.</b></p>
                    <p>2. Enter the OTP sent to your Email.</p>
                    <p>3. Your PASSWORD will be sent to your Email.</p>
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
                                        USERNAME:
                                    </p>
                                    <br></br>
                                    <input type="text" placeholder="Email......" 
                                        className="input-log-attributes w-100"
                                        onChange={(event)=>{setUsername(event.target.value)}}>
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
            </div>
        </div>
        {
            <Footer Received={null}/>
        }
        <div className="clear"></div>
                </div>
        </div>
    );
}

export default RetrivePassword;