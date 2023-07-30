import { useEffect , useState } from 'react';
import { useLocation , useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import NavBar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
import Footer from '../../Components/Footer/index';
import Loader from '../../Components/Loader/index';

import './admin_dashboard.css';

function Account(){

    const Location = useLocation();
    const Navigate = useNavigate();

    const [ UserData , setUserData ] = useState([]);
    const [ Loading , setLoading ] = useState(false);
    const [ userOrders , setUserOrders ] = useState([]);
    const [ userWorkshops , setUserWorkshops ] = useState([]);
    const [ ExpandEnrolls , setExpandEnrolls ] = useState(false);
    const [ Expand , setExpand ] = useState("");
    const [ InProgress , setInProgress ] = useState("0");
    const [ QueryPercentage , setQueryPercentage ] = useState("0");

    const Calculations = (response1,response) => {
        var Sum = 0;
        setQueryPercentage(response1.orders.length);
        for(var j=0;j<response.length;j++){
            if(response[j].status !== "DELIVERED" && response[j].status !== "CLOSED"){
                Sum = Sum+1;
            }
        }
        if(response1.orders.length!==0){
            setInProgress(String(parseFloat(parseFloat(Sum)/parseFloat(response1.orders.length))*100));
        }
        else{
            setInProgress("0");
        }
    }
    useEffect(()=>{
        setLoading(true);
        Axios.put("https://busy-lion-umbrella.cyclic.app/getCart" , {type : Location.state.type , id:Location.state.id}).then((response1)=>{
            setUserData(response1.data[0]);
            Axios.put("https://busy-lion-umbrella.cyclic.app/userOrders" , {id : response1.data[0].orders}).then((response)=>{
                setUserOrders(response.data);
                Calculations(response1.data[0] , response.data)
                Axios.put("https://busy-lion-umbrella.cyclic.app/userWorkshops" , {id : response1.data[0].workshops}).then((response)=>{
                    setUserWorkshops(response.data);
                setLoading(false);
            })
            })
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [])
    return(
        <div id="Home">
            {
                (Location.state === null)?<NavBar Received={null}/>:
                <NavBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Location.state === null)?<SideBar Received={null}/>:
                <SideBar Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
            {
                (Loading)?
                <Loader/>
                :
                <>
                <div className='row data'>
                        <img src={UserData.image} alt="Profile" className='col-2 profile' />
                        <div className='col-5 personal-data'>
                            <p className='admin-name'>{UserData.full_name}</p>
                            {
                                (Location.state.type === "user")?
                                <p className='admin'>USER</p>
                                :
                                <p className='admin'>ADMIN</p>
                            }
                            <p className='admin-mail'>{UserData.email}</p>
                            <p className='admin-mobile'>{UserData.mobile_no}</p>
                            <p>{UserData._id}</p>
                            <button className='add-buttons' onClick={()=>{Navigate("/Login")}}>LOG OUT</button>
                        </div>
                        <div className='col-2 in-progress-div-one'>
                            <CircularProgressbar value={parseInt(InProgress)} text={`${parseInt(InProgress)}%`} 
                                styles={buildStyles({pathTransitionDuration: 1000, trailColor: '#d2b7d8',textColor: 'white', backgroundColor: 'white', pathColor: '#ff9b9b'})} 
                            />
                            <p className='progress-text'>Order's On Progress</p>
                        </div>
                        <div className='col-2 in-progress-div-two'>
                            <CircularProgressbar value={100} text={`${parseInt(QueryPercentage)}`} 
                                styles={buildStyles({pathTransitionDuration: 1000, trailColor: '#d2b7d8',textColor: 'white', backgroundColor: 'white', pathColor: '#ff9b9b'})} 
                            />
                            <p className='progress-text'>TOTAL ORDERS</p>
                        </div>
                    </div>
                    <div className='row main-orders-div'>
                        <h1>ORDER'S</h1>
                        {
                            (userOrders.length === 0)?
                            <p>No Orders</p>
                            :
                            userOrders.map((value)=>{
                                return(
                                    <div className='container w-100 row order-row'>
                                        <p className='col-4 order-column order-id'>Order Id : {value._id}</p>
                                        <p className='col-3 order-column'>Order Status : {value.status}</p>
                                        <p className='col-3 order-column'>Payment Status : {value.payment_mode}</p>
                                        {
                                            (Expand === value._id)?
                                            <>
                                                <p className='col-2 order-column'>
                                                    <button className='expand-button'
                                                        onClick={()=>{setExpand("")}}
                                                    >
                                                        <p className='button-text'>Hide Details</p>
                                                        <i class="fa-solid fa-chevron-up end-icon"></i>
                                                    </button>
                                                </p>
                                                <p className='col-12 order-column order-id'> Ordered Details :</p>
                                                {
                                                    value.products.map((test)=>{
                                                        return( 
                                                            <>
                                                                <p className='col-10 order-column order-details'>Name : {test.name}</p>
                                                                <p className='col-10 order-column order-details'>Quantity : {test.quant}</p>
                                                                {(test.cuz !== null)?<>
                                                                <p className='col-10 order-column order-details'>CUSTOMIZATION : {test.cuz}</p>
                                                                <p className='col-10 order-column order-details'>CHARGES MUST BE PAID DURING DELIVERY.</p></>
                                                                :<></>}
                                                                <p className='col-2  order-column order-total'>COST : Rs {test.newprice}/-</p>
                                                            </>
                                                        )
                                                    })
                                                }
                                                <p className='col-12 order-column order-total'> SUB TOTAL : Rs {value.stotal}/-</p>
                                                <p className='col-12 order-column order-total'> DISCOUNT : {value.discount}/-</p>
                                                <p className='col-12 order-column order-total'> TOTAL : Rs {value.total}/-</p>
                                                <p className='col-12 order-column order-id'> Ordered By :</p>
                                                <p className='col-12 order-column order-details'>Name : {value.name}</p>
                                                <p className='col-12 order-column order-details'>Email : {value.email}</p>
                                                <p className='col-12 order-column order-details'>Contact : {value.mobile}</p>
                                                <p className='col-12 order-column order-details'>Delivery Address : {value.address}</p>
                                            </>
                                            :
                                            <p className='col-2 order-column'>
                                                <button className='expand-button'
                                                    onClick={()=>{setExpand(value._id)}}
                                                >
                                                    <p className='button-text'>Show Details</p>
                                                    <i class="fa-solid fa-chevron-down end-icon"></i>
                                                </button>
                                            </p>
                                        }
                                        <div className='clear'></div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className='row main-orders-div'>
                        <h1>ENROLLMENT'S</h1>
                        {
                            (userWorkshops.length === 0)?
                            <p>No Enrollments</p>
                            :
                            userWorkshops.map((value)=>{
                                return(
                                    <div className='container w-100 row order-row'>
                                        <p className='col-6 order-column order-id first-order-id'>Order Id : {value._id}</p>
                                        <p className='col-4 order-column'>Order Course : {value.wn}</p>
                                        {
                                            (ExpandEnrolls === value._id)?
                                            <>
                                                <p className='col-2 order-column'>
                                                    <button className='expand-button'
                                                        onClick={()=>{setExpandEnrolls("")}}
                                                    >
                                                        <p className='button-text'>Hide Details</p>
                                                        <i class="fa-solid fa-chevron-up end-icon"></i>
                                                    </button>
                                                </p>
                                                <p className='col-12 order-column order-id'> Ordered By :</p>
                                                <p className='col-12 order-column order-details'>Name : {value.name}</p>
                                                <p className='col-12 order-column order-details'>Email : {value.email}</p>
                                                <p className='col-12 order-column order-details'>Contact : {value.mobile}</p>
                                            </>
                                            :
                                            <p className='col-2 order-column'>
                                                <button className='expand-button'
                                                    onClick={()=>{setExpandEnrolls(value._id)}}
                                                >
                                                    <p className='button-text'>Show Details</p>
                                                    <i class="fa-solid fa-chevron-down end-icon"></i>
                                                </button>
                                            </p>
                                        }
                                        <div className='clear'></div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    </>
            }
            {
                (Location.state === null)?<Footer Received={null}/>:(Location.state.user === undefined)?<Footer Received={null}/>:
                <Footer Received={ {status: Location.state.status, name: Location.state.name , user:Location.state.user , type:Location.state.type , id:Location.state.id} } />
            }
        </div>
    );
}

export default Account;