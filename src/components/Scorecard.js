import React from 'react'
import './Scorecard.css'

export default function Scorecard(props) {
  return (
    <div className='sc'>
    <div id="sc1">
      <h3>{props.rs} <font color='green'>:</font> <font color='blue'>{props.bs}</font></h3>
      {/* <p>Red:Blue</p> */}
    </div>
    
  </div>
  )
}
