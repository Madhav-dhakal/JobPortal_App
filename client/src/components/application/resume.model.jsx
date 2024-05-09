import React from "react";

const ResumeModel=({ imageUrl, onClose })=>{
     return(
          <>
          <div className="resume-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="resume" />
      </div>
    </div>
          </>
     )
}

   export default ResumeModel;