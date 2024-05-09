import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const AllJobs=()=>{
     const [jobs, setJobs] = useState([]);
     const { isAuthorized } = useContext(Context);
     const navigate = useNavigate();
     useEffect(() => {
       try {
         axios
           .get(import.meta.env.VITE_API_ALL_JOBS, {
             withCredentials: true,
           })
           .then((res) => {
             setJobs(res.data);
           });
       } catch (error) {
         console.log(error);
       }
     }, []);
     if (!isAuthorized) {
       navigate("/");
     }
     return(
          <>
          <div className="jobs page">
      <div className="container">
        <h1>All Available Jobs</h1>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
          </>
     )
}

   export default AllJobs;