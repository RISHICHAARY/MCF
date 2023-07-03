import { useState } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import Axios from 'axios';

import '../../Styles/Login_Register.css';

import NavBar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
import Footer from '../../Components/Footer/index';
import Loader from '../../Components/Loader/index';

function EditProducts(){

    const Location = useLocation();
    const Navigate = useNavigate();

    const [ Loading , setLoading ] = useState(false);
    const [ Name , setName ] = useState(null);
    const [ Description , setDescription ] = useState(null);
    const [ MainCategory , setMainCategory ] = useState(null);
    const [ SubCategory , setSubCategory ] = useState(null);
    const [ NewPrice , setNewPrice ] = useState(0);
    const [ OldPrice , setOldPrice ] = useState(0);
    const [ State , setState ] = useState(null);
    const [ Infos , setInfos ] = useState(null);
    const [ Length , setLength ] = useState(null);
    const [ Breath , setBreath ] = useState(null);
    const [ Height , setHeight ] = useState(null);
    const [ COD , setCOD ] = useState(null);
    const [ DelChr , setDelchr ] = useState(0);

    //const fileref = ref(storage, "Files/");
    const Received = Location.state;

    const update = (id) => {
        setLoading(true);
            Axios.put("http://localhost:3001/updateProducts" , 
            {
                id : id,
                name : Name,
                description : Description,
                newprice : NewPrice,
                oldprice : OldPrice,
                category : MainCategory ,
                tags : SubCategory,
                state : State,
                infos : Infos,
                length : Length,
                breath : Breath,
                height : Height,
                cod : COD,
                DC : DelChr,
            }).then(() =>{
                setLoading(false);
                Navigate("/Products" , {state:{check: "in" , status: Location.state.user_status, name : Location.state.user_name , user:Location.state.user , type:Location.state.type , id:Location.state.user_id}});
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
                                <p className="Login-Header">EDIT PRODUCT</p>
                                <div className="col-12 float-start">
                                    <p className="label-attributes">
                                        PRODUCT NAME:
                                    </p>
                                    <br></br>
                                    <input type="text" placeholder="Eg: Window Curtain"
                                        className="input-attributes w-100"
                                        onChange={(event)=>{setName(event.target.value)}} 
                                        disabled
                                        defaultValue={Received.name} required>
                                    </input>
                                </div>
                                <div className="col-12 float-start">
                                    <p className="label-attributes">
                                        PRODUCT DESCRIPTION:
                                    </p>
                                    <br></br>
                                    <input type="text" placeholder="Eg: Makes Your Window Beautiful" 
                                        className="input-attributes w-100"
                                        defaultValue={Received.description}
                                        onChange={(event)=>{setDescription(event.target.value)}} required>
                                    </input>
                                </div>
                                <div className="col-4 float-start">
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
                                <div className="col-4 float-start">
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
                                <div className="col-4 float-start">
                                    <p className="label-attributes">
                                        DELIVERY CHARGE:
                                    </p>
                                    <br></br>
                                    <input type="text" placeholder="Eg: 999" 
                                        className="input-attributes w-100"
                                        defaultValue={Received.dc}
                                        onChange={(event)=>{setDelchr(event.target.value)}} required>
                                    </input>
                                </div>
                                <div className="col-6 min-input">
                                    <p className="label-attributes">
                                        CATEGORY:
                                    </p>
                                    <br></br>
                                    <select className="input-attributes w-100" defaultValue={Received.category} onChange={(event)=>{setMainCategory(event.target.value)}} required>
                                        <option className="option-attributes">SELECT</option>
                                        <option className="option-attributes">NYLON</option>
                                        <option className="option-attributes">HOME DECORS</option>
                                        <option className="option-attributes">WOOLEN</option>
                                        <option className="option-attributes">LINEN</option>
                                    </select>
                                </div>
                                <div className="col-6 min-input">
                                    <p className="label-attributes">
                                        TAGS:
                                    </p>
                                    <br></br>
                                    <select className="input-attributes w-100" defaultValue={Received.tags} onChange={(event)=>{setSubCategory(event.target.value)}} required>
                                        <option className="option-attributes">SELECT</option>
                                        <option className="option-attributes">CLOCKS</option>
                                        <option className="option-attributes">WALL HANGINGS</option>
                                    </select>
                                </div>
                                <div className="col-4 min-input">
                                    <p className="label-attributes">
                                        LENGTH(m):
                                    </p>
                                    <br></br>
                                    <input type="text" placeholder="3" 
                                        className="input-attributes w-100"
                                        defaultValue={Received.length}
                                        onChange={(event)=>{setLength(event.target.value)}} required>
                                    </input>
                                </div>
                                <div className="col-4 min-input">
                                    <p className="label-attributes">
                                        WIDTH(m):
                                    </p>
                                    <br></br>
                                    <input type="text" placeholder="3" 
                                        className="input-attributes w-100"
                                        defaultValue={Received.width}
                                        onChange={(event)=>{setBreath(event.target.value)}} required>
                                    </input>
                                </div>
                                <div className="col-4 min-input">
                                    <p className="label-attributes">
                                        HEIGHT(m):
                                    </p>
                                    <br></br>
                                    <input type="text" placeholder="3" 
                                        className="input-attributes w-100"
                                        defaultValue={Received.height}
                                        onChange={(event)=>{setHeight(event.target.value)}} required>
                                    </input>
                                </div>
                                <div className="col-6 min-input">
                                    <p className="label-attributes">
                                        COD STATUS:
                                    </p>
                                    <br></br>
                                    <select className="input-attributes w-100" defaultValue={Received.cod} onChange={(event)=>{setCOD(event.target.value)}} required>
                                        <option className="option-attributes">SELECT</option>
                                        <option className="option-attributes">YES</option>
                                        <option className="option-attributes">NO</option>
                                    </select>
                                </div>
                                <div className="col-6 min-input">
                                    <p className="label-attributes">
                                        HOME SCREEN DISPLAY:
                                    </p>
                                    <br></br>
                                    <select className="input-attributes w-100" defaultValue={Received.status} onChange={(event)=>{setState(event.target.value)}} required>
                                        <option className="option-attributes">SELECT</option>
                                        <option className="option-attributes">ON</option>
                                        <option className="option-attributes">OFF</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    ADDITIONAL INFORMATION'S:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Eg: Aged for 3+." 
                                    className="input-attributes w-100"
                                    defaultValue={Received.infos}
                                    onChange={(event)=>{setInfos(event.target.value)}} required>
                                </input>
                            </div>
                            <button className="final-button general-button" onClick={()=>{update(Received.id)}}>
                                <p className="final-label">
                                    UPDATE
                                    <i class="fi fi-br-rotate-right end-icons-err"></i>
                                </p>
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

export default EditProducts;