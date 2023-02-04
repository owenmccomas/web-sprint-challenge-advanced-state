import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Wheel(props) {
  const [active, setActive] = useState({
    isActive: "cog active",
    isntActive: "cog",
    isActiveB: "B",
    isntActiveB: ""
  })

  const divs = [0, 1, 2, 3, 4, 5].map((i) => (
    <div className={props.wheel === i ? `${active.isActive}` : `${active.isntActive}`} 
         style={{ "--i": i }} 
         key={i}>
          {props.wheel === i ? `${active.isActiveB}` : `${active.isntActiveB}`}
    </div>
  ));
  
  return (
    <div id="wrapper">
      <div id="wheel">
        {divs}
     </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={props.moveCounterClockwise}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={props.moveClockwise}>Clockwise</button>
      </div>
    </div>
  )
}
export default connect(st => st, actionCreators)(Wheel)
