import { useState , useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
import Axios from 'axios';
import './users.css';

function Login(){
    const [ Username , setUsername ] = useState (null );
    const [ Password , setPassword ] = useState( null );
    const Navigate = useNavigate();

    useEffect(
        () =>{
            Axios.get("https://clear-slug-teddy.cyclic.app/allUsers").then((response) => {
                setUsers_list(response.data);
            });
            Axios.get("https://clear-slug-teddy.cyclic.app/allAdmins").then((response) => {
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
        <div className="overall-log" id="Home">
            <div className="main-container">
                <div className="container">
                    <button className="float-start general-button disabled-button" disabled>
                        LOGIN
                        <i className="fi fi-ss-user end-icons" ></i>
                    </button>
                    <button className="float-end general-button active-button" 
                        onClick={()=>{Navigate("/users");}}>
                        REGISTER
                        <i className="fi fi-ss-user-add end-icons"></i>
                    </button>
                    <div className="container sub-container-1 float-start">
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
            <div className="clear"></div>
        </div>
    );
}

export default Login;