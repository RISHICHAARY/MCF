import { Link } from "react-router-dom";
import "./navbar.css";
import Logo from '../../Images/Logo.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar({Received}) {

  const [SearchThis , setSearchThis] = useState(null);
  const Navigate = useNavigate()

  return (
    <>
      <nav id="Navbar-Edit" class=" navbar navbar-expand-lg">
          <div class="container-fluid">
                <img src={Logo} alt="Logo.png" className="Navbar-Logo"/>
              <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarCollapse">
              {
                (Received.page === "P" || Received.page === "W")?<></>:
                <div class="navbar-nav ms-auto w-50 w_100">
                  <input type="text" width="300" onKeyDown={(e)=>{if(e.key === "Enter"){
                    (Received === null)?Navigate("/Products" , {state:{page : "P",search:SearchThis}}):(Received.name === undefined)?Navigate("/Products" , {state:{page : "P",search:SearchThis}}):
                    Navigate("/Products" , {state:{status: Received.status, name: Received.name , user:Received.user , type:Received.type , id:Received.id , search:SearchThis}})
                  }}}
                    onChange={(e)=>{setSearchThis(e.target.value)}} placeholder="Search....." className="Navbar-Link Navbar-Search ms-auto w-75"/>
                </div>
              }
                  <div class="navbar-nav ms-auto">
                  {(Received.user === undefined)?
                    <li>
                      {
                        (Received.page === "H")?
                        <Link className="Navbar-Link nav-link Active" to="/" state={Received}>Home</Link>
                        :
                        <Link className="Navbar-Link nav-link" to="/" state={Received}>Home</Link>
                      }
                    </li>:(Received.type === "user")?
                    <li>
                      {
                        (Received.page === "H")?
                        <Link className="Navbar-Link nav-link Active" to="/" state={Received}>Home</Link>
                        :
                        <Link className="Navbar-Link nav-link" to="/" state={Received}>Home</Link>
                      }
                    </li>:(Received.type === "admin")?
                    <li>
                      {
                        (Received.page === "D")?
                        <Link className="Navbar-Link nav-link Active" to="/Dashboard" state={Received} >Dash Board</Link>
                        :
                        <Link className="Navbar-Link nav-link" to="/Dashboard" state={Received} >Dash Board</Link>
                      }
                    </li>:<></>
                    }
                    {
                      (Object.keys(Received).length === 1 || Object.keys(Received).length === 2)?
                      <li>
                        {
                          (Received.page === "P")?
                          <Link className="Navbar-Link nav-link Active" to="/Products" state={Received}>Products</Link>
                          :
                          <Link className="Navbar-Link nav-link" to="/Products" state={Received}>Products</Link>
                        }
                      </li>:
                      <li>
                      {
                        (Received.page === "P")?
                        <Link className="Navbar-Link nav-link Active" to="/Products" state={Received}>Products</Link>
                        :
                        <Link className="Navbar-Link nav-link" to="/Products" state={Received}>Products</Link>
                      }
                      </li>
                    }
                    {
                      (Object.keys(Received).length === 1 || Received.name===undefined)?
                      <>
                        <li>
                          {
                            (Received.page === "W")?
                            <Link className="Navbar-Link nav-link Active" to="/Workshops" state={Received}>Workshops</Link>
                            :
                            <Link className="Navbar-Link nav-link" to="/Workshops" state={Received}>Workshops</Link>
                          }
                        </li>
                        <li className="nav-item">
                          {
                            (Received.page === "LG")?
                              <Link className="Navbar-Link nav-link Active Login" to="/Login" state={Received}>Login</Link>
                            :
                              <Link className="Navbar-Link nav-link Login" to="/Login" state={Received}>Login</Link>
                          }
                        </li>
                      </>
                      :
                      <>
                        <li>
                          {
                            (Received.page === "W")?
                            <Link className="Navbar-Link nav-link Active" to="/Workshops" state={Received}>Workshops</Link>
                            :
                            <Link className="Navbar-Link nav-link" to="/Workshops" state={Received}>Workshops</Link>
                          }
                        </li>
                        <li className="nav-item">
                          {
                            (Received.page === "LG")?
                              <Link className="Navbar-Link nav-link Active" to="/Account" state={Received}>
                              <div className="Navbar-Account-Main">
                                  <div className="Navbar-Account-Icon">
                                    <i className="fi fi-ss-user Navbar-Account-Icon-Tag"></i>
                                  </div>
                                  <div className="Navbar-Account-Info">
                                    <p className="Navbar-Account-UserName">{Received.name}</p>
                                    <p className="Navbar-Account-UserEmail">{Received.user}</p>
                                  </div>
                                  <div className="Clear"></div>
                                </div>
                              </Link>
                            :
                              <Link className="Navbar-Link nav-link account" to="/Account" state={Received}>
                                <p className="Navbar-Account-UserName">{Received.name}</p>
                              </Link>
                          }
                        </li>
                      </>
                    }
                  </div>
              </div>
          </div>
      </nav>
    </>
  );
}

export default NavBar;