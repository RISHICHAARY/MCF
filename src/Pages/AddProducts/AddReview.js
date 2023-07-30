import { useState , useEffect } from 'react';
import { useNavigate  , useLocation} from 'react-router-dom';
import Axios from 'axios';
import _ from 'lodash';
import { ref , uploadBytes , getDownloadURL } from 'firebase/storage';
import { storage } from '../../cloud';

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
    const [ Loc , setLoc ] = useState(null);
    const [ Review , setReview ] = useState(null);
    const [ Rating , setRating ] = useState(0);
    const [ File , setFile ] = useState([]);
    const [ FileUrls , setFileUrls ] = useState([]);

    const [ WName , setWName ] = useState(null);
    const [ WLoc , setWLoc ] = useState(null);
    const [ WReview , setWReview ] = useState(null);
    const [ WRating , setWRating ] = useState(0);
    const [ WFile , setWFile ] = useState([]);
    const [ WFileUrls , setWFileUrls ] = useState([]);

    const FileStorer = (e) =>{
        let { files } = e.target;

        _.forEach(files, file => {
            setFile((prevState) => [ ...prevState , file]);
        });
    }

    const filled = () =>{
        if(Name === null){alert("Fill Name");}
        if(Loc === null){alert("Fill Location");}
        if(Review === null){alert("Fill Review");}
        if(Rating === 0){alert("Fill Ratting");}
        upload()
    }

    const upload = () => {
        setLoading(true);
        if (File == null) return;
        for(var j=0 ; j<File.length ; j++){
            const FileReference = ref(storage , `Review_DP/${File[j].name+Name+j}`);
            uploadBytes(FileReference , File[j]).then((FileData) => {
                getDownloadURL(FileData.ref).then((url) => {
                    setFileUrls((prev)=>[...prev , url]);
                })
            });
        }
    }

    useEffect(() =>{
        if(FileUrls.length !== 0){
            if(FileUrls.length === File.length){
                setLoading(true);
                Axios.put("https://busy-lion-umbrella.cyclic.app/addReview" , 
                            {
                                image_url : FileUrls,
                                name : Name.toUpperCase(),
                                loc : Loc,
                                rev : Review,
                                rating : Rating
                            }).then(() => {
                                setLoading(false);
                                Navigate("/Dashboard" , {state:{check: "in" , status: Location.state.user_status, name : Location.state.user_name , user:Location.state.user , type:Location.state.type , id:Location.state.user_id}});
                            });}}
        }, [FileUrls])



        const WFileStorer = (e) =>{
            let { files } = e.target;
    
            _.forEach(files, file => {
                setWFile((prevState) => [ ...prevState , file]);
            });
        }
    
        const Wfilled = () =>{
            if(WName === null){alert("Fill Name");}
            if(WLoc === null){alert("Fill Location");}
            if(WReview === null){alert("Fill Review");}
            if(WRating === 0){alert("Fill Ratting");}
            Wupload()
        }
    
        const Wupload = () => {
            setLoading(true);
            if (WFile == null) return;
            for(var j=0 ; j<WFile.length ; j++){
                const FileReference = ref(storage , `WReview_DP/${WFile[j].name+WName+j}`);
                uploadBytes(FileReference , WFile[j]).then((FileData) => {
                    getDownloadURL(FileData.ref).then((url) => {
                        setWFileUrls((prev)=>[...prev , url]);
                    })
                });
            }
        }
    
        useEffect(() =>{
            if(WFileUrls.length !== 0){
                if(WFileUrls.length === WFile.length){
                    Axios.put("https://busy-lion-umbrella.cyclic.app/addWReview" , 
                                {
                                    image_url : WFileUrls,
                                    name : WName.toUpperCase(),
                                    loc : WLoc,
                                    rev : WReview,
                                    rating : WRating
                                }).then(() => {
                                    setLoading(false);
                                    Navigate("/Dashboard" , {state:{check: "in" , status: Location.state.user_status, name : Location.state.user_name , user:Location.state.user , type:Location.state.type , id:Location.state.user_id}});
                                });}
                            else{
                                alert("Unable1 to Update!!")
                                setLoading(false)
                            }}
                            else{
                                alert("Unable to Update!!")
                                setLoading(false)
                            }
            }, [WFileUrls])
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
                <>
                <div id="Home">
                <div className=''>
                    <div className="">
                        <div className="overall">
                            <div className="">
                                <div className="container row">
                                <p className="Login-Header">ADD REVIEW ( PRODUCTS )</p>
                                    <div className="col-12 float-start">
                                        <p className="label-attributes">
                                            REVIEWER NAME:
                                        </p>
                                        <br></br>
                                        <input type="text" placeholder="Eg: WalterWhite" 
                                            className="input-attributes w-100"
                                            onChange={(event)=>{setName(event.target.value)}} required>
                                        </input>
                                    </div>
                                    <div className="col-12 float-start">
                                        <p className="label-attributes">
                                            REVIEWER LOCATION:
                                        </p>
                                        <br></br>
                                        <input type="text" placeholder="Eg: Hariyana" 
                                            className="input-attributes w-100"
                                            onChange={(event)=>{setLoc(event.target.value)}} required>
                                        </input>
                                    </div>
                                    <div className="col-12 float-start">
                                        <p className="label-attributes">
                                            REVIEWER REVIEW:
                                        </p>
                                        <br></br>
                                        <input type="text" placeholder="Eg: Nice Product....." 
                                            className="input-attributes w-100"
                                            onChange={(event)=>{setReview(event.target.value)}} required>
                                        </input>
                                    </div>
                                    <div className="col-12 float-start">
                                        <p className="label-attributes">
                                            REVIEWER RATING:
                                        </p>
                                        <br></br>
                                        <input type="text" placeholder="Eg: Hariyana" 
                                            className="input-attributes w-100"
                                            onChange={(event)=>{setRating(parseInt(event.target.value))}} required>
                                        </input>
                                    </div>
                                    <div className="col-12">
                                        <p className="label-attributes">
                                            PRODUCT IMAGES:
                                        </p>
                                        <br></br>
                                        <input type="file" accept='image/*' 
                                            className="input-attributes w-100"
                                            multiple="multiple"
                                            id="files" name="files"
                                            onChange={(event) =>{FileStorer(event)}} required>
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
                <div id="Home">
                <div className=''>
                    <div className="">
                        <div className="overall">
                            <div className="">
                                <div className="container row">
                                <p className="Login-Header">ADD REVIEW ( WORKSHOPS )</p>
                                    <div className="col-12 float-start">
                                        <p className="label-attributes">
                                            REVIEWER NAME:
                                        </p>
                                        <br></br>
                                        <input type="text" placeholder="Eg: WalterWhite" 
                                            className="input-attributes w-100"
                                            onChange={(event)=>{setWName(event.target.value)}} required>
                                        </input>
                                    </div>
                                    <div className="col-12 float-start">
                                        <p className="label-attributes">
                                            REVIEWER LOCATION:
                                        </p>
                                        <br></br>
                                        <input type="text" placeholder="Eg: Hariyana" 
                                            className="input-attributes w-100"
                                            onChange={(event)=>{setWLoc(event.target.value)}} required>
                                        </input>
                                    </div>
                                    <div className="col-12 float-start">
                                        <p className="label-attributes">
                                            REVIEWER REVIEW:
                                        </p>
                                        <br></br>
                                        <input type="text" placeholder="Eg: Nice Product....." 
                                            className="input-attributes w-100"
                                            onChange={(event)=>{setWReview(event.target.value)}} required>
                                        </input>
                                    </div>
                                    <div className="col-12 float-start">
                                        <p className="label-attributes">
                                            REVIEWER RATING:
                                        </p>
                                        <br></br>
                                        <input type="text" placeholder="Eg: Hariyana" 
                                            className="input-attributes w-100"
                                            onChange={(event)=>{setWRating(parseInt(event.target.value))}} required>
                                        </input>
                                    </div>
                                    <div className="col-12">
                                        <p className="label-attributes">
                                            WORKSHOP IMAGES:
                                        </p>
                                        <br></br>
                                        <input type="file" accept='image/*' 
                                            className="input-attributes w-100"
                                            multiple="multiple"
                                            id="files" name="files"
                                            onChange={(event) =>{WFileStorer(event)}} required>
                                        </input>
                                    </div>
                                <button className="final-button-ap general-button" onClick={Wfilled}>
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
                </>
            }
            {
                (Location.state === null)?<Footer Received={null}/>:(Location.state.user === undefined)?<Footer Received={null}/>:
                <Footer Received={ {status: Location.state.user_status, name: Location.state.user_name , user:Location.state.user , type:Location.state.type , id:Location.state.user_id} } />
            }
        </>
    );
};

export default Products;