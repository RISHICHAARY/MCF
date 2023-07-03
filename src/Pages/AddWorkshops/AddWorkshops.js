import { useState , useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import Axios from 'axios';
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage';
import { storage } from '../../cloud';
import _ from 'lodash';

import '../../Styles/Login_Register.css';

import NavBar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
import Footer from '../../Components/Footer/index';
import Loader from '../../Components/Loader/index';

function Products(){

    const Navigate = useNavigate();
    const Location = useLocation();

    const [ Loading , setLoading ] = useState(false);
    const [ Name , setName ] = useState(null);
    const [ Description , setDescription ] = useState(null);
    const [ NewPrice , setNewPrice ] = useState(0);
    const [ OldPrice , setOldPrice ] = useState(0);
    const [ File , setFile ] = useState([]);
    const [ Watsapp_grp , setWatsapp_grp ] = useState([]);
    const [ FileUrls , setFileUrls ] = useState([]);
    const [ Mode , setMode ] = useState(null);
    const [ Modes , setModes ] = useState([]);

    const filled = () =>{
        if(Name === null){alert("Fill Name");return}
        if(Description === null){alert("Fill Description");return}
        if( NewPrice === null){alert("Fill NewPrice");return}
        if(File === null){alert("Select Image");return}
        if(Watsapp_grp === null){alert("Enter Watsapp group link");return}
        upload()
    }

    //const fileref = ref(storage, "Files/");
    const FileStorer = (e) =>{
        let { files } = e.target;

        _.forEach(files, file => {
            setFile((prevState) => [ ...prevState , file]);
        });
        /*for(var i=0 ; i<e.target.files.length ; i++){
            var file = e.target.files[i];
            // eslint-disable-next-line no-loop-func
            setFile((prevState) => [ ...prevState , file]);
        }*/
    }

    const upload = () => {
        setLoading(true);
        if (File == null) return;
        for(var j=0 ; j<File.length ; j++){
            const FileReference = ref(storage , `Workshop_DP/${File[j].name+Name}`);
            uploadBytes(FileReference , File[j]).then((FileData) => {
                getDownloadURL(FileData.ref).then((url) => {
                    setFileUrls((prev)=>[...prev , url]);
                })
            });
        }
    }

    useEffect(() => {
        if(FileUrls.length !== 0){
            if(FileUrls.length === File.length){
                Axios.put("http://localhost:3001/addWorkshop" , 
                    {
                        image_url : FileUrls,
                        name : Name,
                        description : Description,
                        newprice : NewPrice,
                        oldprice : OldPrice,
                        mode : Mode,
                        watsapp_grp : Watsapp_grp,
                    }).then(()=>{
                        setLoading(false);
                        Navigate("/Workshops" , {state:{check: "in" , status: Location.state.user_status, name : Location.state.user_name , user:Location.state.user , type:Location.state.type , id:Location.state.user_id}});
                    });
                }
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [FileUrls])

    useEffect(()=>{
        Axios.get('http://localhost:3001/getMode').then((response) => {
            setModes(response.data);
            setLoading(false);
        })
    },[])

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
            {/* <p className='header'>Magic Corner</p> */}
            <div className=" ">
                <div className="">
                    <div className="">
                        <div className="container row p-0">
                        <p className="Login-Header">ADD WORKSHOP</p>
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    WORKSHOP NAME:
                                </p>
                                <br></br>
                                <input type="text" placeholder="Eg: Tailoring Classes" 
                                    className="input-attributes w-100"
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
                                    onChange={(event)=>{setOldPrice(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-12 min-input-2">
                                        <p className="label-attributes">
                                            MODE:
                                        </p>
                                        <br></br>
                                        <select className="input-attributes w-100" onChange={(event)=>{setMode(event.target.value)}} required>
                                            <option className="option-attributes">SELECT</option>
                                            {
                                                Modes.map(value=>
                                                    <option>{value.name}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                            <div className="col-12 float-start">
                                <p className="label-attributes">
                                    WATSAPP GROUP LINK:
                                </p>
                                <br></br>
                                <input type="text" placeholder="grp link" 
                                    className="input-attributes w-100"
                                    onChange={(event)=>{setWatsapp_grp(event.target.value)}} required>
                                </input>
                            </div>
                            <div className="col-12">
                                <p className="label-attributes">
                                    WORKSHOP IMAGES:
                                </p>
                                <br></br>
                                <input type="file" accept='image/*' 
                                    className="input-attributes w-100" multiple
                                    onChange={(event)=>{FileStorer(event)}} required>
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
        </div>
            }
             {
                (Location.state === null)?<Footer Received={null}/>:(Location.state.user === undefined)?<Footer Received={null}/>:
                <Footer Received={ {status: Location.state.user_status, name: Location.state.user_name , user:Location.state.user , type:Location.state.type , id:Location.state.user_id} } />
            }
        </>
    );
};

export default Products;