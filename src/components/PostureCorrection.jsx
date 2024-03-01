import React from 'react'
import posture from "../assets/posture.jpg"

const PostureCorrection = () => {
  return (
    <div> 
        <img
          src={posture}
          style={{ overflow: "hidden", width: "400px",marginTop: "10px" }}
          alt="Eye Relief Image"
        />
      </div>
  )
}

export default PostureCorrection