import React, { useState } from 'react'

function Square(props) {
    const [id, setId] = useState(props.info.id);

    const click = () => {
      props.touchSquare(id)
    }

  return (
    <div className="Square" onClick={click}>
      <div className={props.info.state}></div>
    </div>
  )
}

export default Square