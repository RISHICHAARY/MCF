import { useState } from 'react';
import { useNavigate  , useLocation} from 'react-router-dom';
import Axios from 'axios';
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage';
import { storage } from '../../cloud'

import '../../Styles/Login_Register.css';

import NavBar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
import Footer from '../../Components/Footer/index';
import Loader from '../../Components/Loader/index';

function Modes(){

    const Navigate = useNavigate();
    const Location = useLocation();

    const [ Loading , setLoading ] = useState(false);
    const [ Name , setName ] = useState(null);
    const [ File , setFile ] = useState([]);
    const [ Verify , setVerify ] = useState(true);

    //const fileref = ref(storage, "Files/");

    const filled = () =>{
        if(Name === null){alert("Fill Name");setVerify(false)}
        if(File === null){alert("Select Image");setVerify(false)}
        upload()
    }

    const upload = () => {
            if(Verify){
            setLoading(true);
                const FileReference = ref(storage , `Mode_DP/${File.name+Name}`);
                uploadBytes(FileReference , File).then((FileData) => {
                    getDownloadURL(FileData.ref).then((url) => {
                        Axios.put("http://localhost:3001/addMode" , 
                            {
                                img : url,
                                name : Name.toUpperCase(),
                            }).then(() => {
                                setLoading(false);
                                Navigate("/Dashboard" , {state:{check: "in" , status: Location.state.user_status, name : Location.state.user_name , user:Location.state.user , type:Location.state.type , id:Location.state.user_id}});
                            });
                    })
                });
            }
    }

    return(
        <>
        {
                        (Location.state === null)?<NavBar Received={{page : "H"}}/>:(Location.state.user === undefined)?<NavBar Received={{page : "H"}}/>:
                        <NavBar Received={ {page : "H", status: Location.state.user_status, name: Location.state.user_name , user:Location.state.user , type:Location.state.type , id:Location.state.user_id} } />
                    }
                    {
                        (Location.state === null)?<SideBar Received={null}/>:(Location.state.user === undefined)?<SideBar Received={null}/>:
                        <SideBar Received={ {status: Location.state.user_status, name: Location.state.user_name , user:Location.state.user , type:Location.state.type , id:Location.state.user_id} } />
                    }
            {
                (Loading)?
                <>
                    <Loader/>
                </>
                :
                <div id="Home">
                <div className=''>
                    <div className="">
                        <div className="overall">
                            <div className="">
                                <div className="container row">
                                <p className="Login-Header">ADD MODE</p>
                                    <div className="col-12 float-start">
                                        <p className="label-attributes">
                                            MODE NAME:
                                        </p>
                                        <br></br>
                                        <input type="text" placeholder="Eg: Online" 
                                            className="input-attributes w-100"
                                            onChange={(event)=>{setName(event.target.value)}} required>
                                        </input>
                                    </div>
                                    <div className="col-12">
                                        <p className="label-attributes">
                                            MODE IMAGE:
                                        </p>
                                        <br></br>
                                        <input type="file" accept='image/*' 
                                            className="input-attributes w-100"
                                            onChange={(event) =>{setFile(event.target.files[0])}} required>
                                        </input>
                                    </div>
                                <button className="final-button-ap general-button" onClick={filled}>
                                        ADD
                                        <i className="fi fi-br-angle-right end-icons-err"></i>
                                </button>
                                </div>
                            </div>
                        </div>
                        <div className='clear'></div>
                    </div>
                    <div className='clear'></div>
                </div>
                </div>
            }
            {
                (Location.state === null)?<Footer Received={null}/>:(Location.state.user === undefined)?<Footer Received={null}/>:
                <Footer Received={ {status: Location.state.user_status, name: Location.state.user_name , user:Location.state.user , type:Location.state.type , id:Location.state.user_id} } />
            }
        </>
    );
};

export default Modes;