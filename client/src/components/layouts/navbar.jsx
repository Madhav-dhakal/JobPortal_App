import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi";
import navbar from "../../public/nav.png";
import { FaHome, FaBriefcase, FaUser, FaEye,FaPen   } from "react-icons/fa"; 

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_LOGOUT_URL,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
    
  };

  return (
    <>
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
        <div className="container">
          <div className="logo">  
          <Link to={"/"}>
          <img src={navbar} alt="" /></Link>
          </div>
          
          <ul className={!show ? "menu" : "show-menu menu"}>
          {show && <h5>Dashboard</h5>}
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>
             {show &&<FaHome />}   Home
              </Link>
            </li>
            <li>
              <Link to={"/job/getall"} onClick={() => setShow(false)}>
              {show &&  <FaBriefcase />} All Jobs
              </Link>
            </li>
            <li>
              <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {show &&  <FaUser />} {" "}    {user && user.role === "Employer"
                  ? "Applicant's Applications"
                  : "My Applications"}
              </Link>
            </li>
            {user && user.role === "Employer" ? (
              <>
                <li>
                  <Link to={"/job/post"} onClick={() => setShow(false)}>
                  {show && <FaPen  /> }  Post New Job
                  </Link>
                </li>
                <li>
                  <Link to={"/job/me"} onClick={() => setShow(false)}>
                  {show && <FaEye />}  View Jobs
                  </Link>
                </li>
              </>
            ) : (
              <></>
            )}

            <button onClick={handleLogout}>Logout</button>
          </ul>
          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
