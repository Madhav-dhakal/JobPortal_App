import React from "react";
import {
     MdOutlineDesignServices,
     MdOutlineWebhook,
     MdAccountBalance,
     MdOutlineAnimation,
   } from "react-icons/md";
   import { IoPhonePortraitOutline,IoServerOutline  } from "react-icons/io5"
   import { FaReact } from "react-icons/fa";
   import { GiArtificialIntelligence } from "react-icons/gi";
   import { IoGameController } from "react-icons/io5";

const PopularCategories=()=>{
     const categories = [
          {
            id: 1,
            title: "Graphics & Design",
            subTitle: "100 Open Positions",
            icon: <MdOutlineDesignServices />,
          },
          {
            id: 2,
            title: "Mobile App Development",
            subTitle: "30 Open Positions",
            icon: <IoPhonePortraitOutline />,
          },
          {
            id: 3,
            title: "Frontend Web Development",
            subTitle: "200 Open Positions",
            icon: <MdOutlineWebhook />,
          },
          {
            id: 4,
            title: "MERN STACK Development",
            subTitle: "150 Open Postions",
            icon: <FaReact />,
          },
          {
            id: 5,
            title: "Account & Finance",
            subTitle: "60 Open Positions",
            icon: <MdAccountBalance />,
          },
          {
            id: 6,
            title: "Artificial Intelligence",
            subTitle: "170 Open Positions",
            icon: <GiArtificialIntelligence />,
          },
          {
            id: 7,
            title: "Video Animation",
            subTitle: "50 Open Positions",
            icon: <MdOutlineAnimation />,
          },
          {
            id: 8,
            title: "Game Development",
            subTitle: "80 Open Positions",
            icon: <IoGameController />,
          },
          {
               id: 9,
               title: "Database Administrator",
               subTitle: "50 Open Positions",
               icon: <IoServerOutline />,
             },
        ];

     return(
          <>
          <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div className="card" key={element.id}>
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
          </>
     )
}

   export default PopularCategories;