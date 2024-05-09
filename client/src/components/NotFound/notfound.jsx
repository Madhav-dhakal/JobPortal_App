import React from "react";
import { Link } from 'react-router-dom';
import notfoud from '../../public/nf.png'

const NotFound=()=>{
     return(
          <>
          <div className='page notfound'>
          <div className="content">
            <img src={notfoud} alt="NotFound" />
            <Link to={'/'}>Return To Home Page</Link>
          </div>
        </div>
          </>
     )
}

   export default NotFound;