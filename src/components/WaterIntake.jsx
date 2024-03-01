import React from 'react'
import waterImg from "../assets/water.webp"

const WaterIntake = () => {
  return (
    
    <>
     <div> 
        <img
          src={waterImg}
          style={{ overflow: "hidden", width: "400px",height:"250px",marginTop: "10px" }}
          alt="Eye Relief Image"
        />
      </div>
    </>
  )
}

export default WaterIntake