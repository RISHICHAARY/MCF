import { useState } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import Axios from 'axios';

import '../../Styles/Login_Register.css';

import NavBar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
import Footer from '../../Components/Footer/index';
import Loader from '../../Components/Loader/index';

function EditWorkshops(){

    const Navigate = useNavigate();
    const Location = useLocation();

    const [ Name , setName ] = useState(null);
    const [ Description , setDescription ] = useState(null);
    const [ NewPrice , setNewPrice ] = useState(0);
    const [ OldPrice , setOldPrice ] = useState(0);
    const [ Loading , setLoading ] = useState(false);
    const [ WG , setWG ] =useState(null);

    //const fileref = ref(storage, "Files/");
    const Received = Location.state;

    const update = (id) => {
        setLoading(true);
        Axios.put("https://bored-wasp-top-hat.cyclic.app/UpdateWorkshops" , 
        {
            id : id,
            name : Name,
            description : Description,
            newprice : NewPrice,
            oldprice : OldPrice,
            wg : WG,
        }).then(() =>{
            setLoading(false);
            Navigate("/displayWorkshops" , {state:{check: "in" , status: Location.state.user_status, name : Location.state.user_name , user:Location.state.user , type:Location.state.type , id:Location.state.user_id}});
        });
    };

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
        <div className='overall' id='Home'>
            <div className="">
                <div className="">
                    <div className="">
                        <div className="container row">
                            <p className="Login-Header">EDIT WORKSHOP</p>
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    WORKSHOP NAME:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Eg: Tailoring Classes" 
                                    className="input-attributes w-100"
                                    defaultValue={Received.name} disabled
                                    onChange={(event)=>{setName(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    WORKSHOP DESCRIPTION:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Eg: Get trained to bring your dream clothes live!!" 
                                    className="input-attributes w-100"
                                    defaultValue={Received.description}
                                    onChange={(event)=>{setDescription(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    NEW PRICE:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Eg: 499" 
                                    className="input-attributes w-100"
                                    defaultValue={Received.newprice}
                                    onChange={(event)=>{setNewPrice(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    OLD PRICE:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Eg: 999" 
                                    className="input-attributes w-100"
                                    defaultValue={Received.oldprice}
                                    onChange={(event)=>{setOldPrice(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    WATSAPP GROUP LINK:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Watsapp Group Link" 
                                    className="input-attributes w-100"
                                    defaultValue={Received.wg}
                                    onChange={(event)=>{setWG(event.target.value)}} required>
                                </input>
                            </div>
                        </div>
                        <button className="final-button general-button" onClick={() => {update(Received.id)}}>
                                UPDATE
                                <i className="fi fi-br-angle-right end-icons-err"></i>
                        </button>
                    </div>
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

export default EditWorkshops;