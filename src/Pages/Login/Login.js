import { useState , useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
import Axios from 'axios';

import '../../Styles/Login_Register.css';
import Register from '../Register/Register'

import NavBar from '../../Components/NavBar/index';
import Footer from '../../Components/Footer/index';

function Login(){
    const [ Username , setUsername ] = useState (null );
    const [ Password , setPassword ] = useState( null );
    const Navigate = useNavigate();

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
            else if(Users_list.length !== 0){
                for(var j = 0 ; j <= Users_list.length ; j++){
                    if( Users_list[j].email.toString() === Username.toString() ){
                        if( Users_list[j].password.toString() === Password.toString() ){
                            Navigate('/' , {state:{id:Users_list[j]._id, name : Users_list[j].full_name ,user:Username , status:"LoggedIn" , type : "user" }});
                            break;
                        }
                        else{alert("Invalid Password");break;}
                    }
                    else if( j === Users_list.length-1 ){alert("Invalid Username!!");break;}
                }
            }
        }
        else{
            for(var i = 0; i < Admins_list.length ; i++){
                if( Admins_list[i].email.toString() === Username.toString() ){
                    if( Admins_list[i].password.toString() === Password.toString() ){
                        Navigate('/Dashboard' , {state:{id:Admins_list[i]._id , name : Admins_list[i].full_name ,user:Username ,status:"LoggedIn" , type : "admin" }});
                        break;
                    }
                    else{alert("Invalid Password");break;}
                }
                else if(i === Admins_list.length-1 && Users_list.length === 0){
                    alert("Invalid Username!!");
                    break;
                }
                else if( i === Admins_list.length-1 ){
                    for( j = 0 ; j <= Users_list.length ; j++){
                        if( Users_list[j].email.toString() === Username.toString() ){
                            if( Users_list[j].password.toString() === Password.toString() ){
                                Navigate('/' , {state:{id:Users_list[j]._id, name : Users_list[j].full_name,user:Username ,status:"LoggedIn" , type : "user" }});
                                break;
                            }
                            else{alert("Invalid Password");break}
                        }
                        else if( j === Users_list.length-1 ){alert("Invalid Username!!");break}
                    }
                }
            }
        }
    };
        
    return(
        <div>
            {
                <NavBar Received={{page : "NO"}}/>
            }
            <div className="row Main-Row w-100">
                <div className="col-4 " id="Home">
                <div className="overall signin-center">
                <div className="">
                    <div className="container">
                        <p className="Login-Header">SIGN IN</p>
                        <div>
                            <form>
                                <p className="label-log-attributes">
                                    USERNAME:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Email......" 
                                    className="input-log-attributes w-100"
                                    onChange={(event)=>{setUsername(event.target.value)}}>
                                </input>
                                <br></br>
                                <p className="label-log-attributes">
                                    PASSWORD:
                                </p>
                                <br></br>
                                <input type="password" placeholder="Password......" 
                                    className="input-log-attributes w-100"
                                    onChange={(event)=>{setPassword(event.target.value)}}>
                                </input>
                                <button className="final-button general-button"
                                    onClick={()=>{validate()}} type="button">
                                    GET IN
                                    <i className="fi fi-br-angle-right end-icons-err"></i>
                                </button>
                                <Link to="/ForgotPassword" className='forgot-password'>Forgot Password ?</Link>
                            </form>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
                </div>
                <div className="col-8 Register-Col min-input">
                    <Register/>
                </div>
            {
                <Footer Received={null}/>
            }
            <div className="clear"></div>
            </div>
        </div>
    );
}

export default Login;