import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";


const Footer=()=>{
     const { isAuthorized } = useContext(Context);
     return(
          <>
          <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Madhav_Dhakal.</div>
      <div>
        <Link to={"https://www.facebook.com"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.youtube.com"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://github.com/Madhav-dhakal"} target="_blank">
          <FaGithub />
        </Link>
        <Link to={"https://www.linkedin.com/in/madhav-dhakal-3844a2293"} target="_blank">
          <FaLinkedin />
        </Link>
        
      </div>
    </footer>
          </>
     )
}

   export default Footer;