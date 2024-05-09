import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import HeroSection from "./body.section";
import HowItWorks from "./how.it.works";
import PopularCategories from "./categories";
import PopularCompanies from "./popular.companies";

const Home=()=>{
     const navigate=useNavigate();
     const { isAuthorized } = useContext(Context);
     if (!isAuthorized) {
       return navigate("/login")
     }
     return(
          <>
           <div className="homePage page">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </div>
          </>
     )
}

   export default Home;