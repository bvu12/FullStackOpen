import React, { useEffect, useState } from "react"

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0, allClicks: []
  })

  const handleLeftClick = () => {
      // { ...clicks } creates a new object that has copies of all of the properties of the clicks object
      // {...clicks, right: ____} modifies the 'right' property
      setClicks({...clicks,
      left: clicks.left +1,
      allClicks: clicks.allClicks.concat('L')})
  }

  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right +1,
      allClicks: clicks.allClicks.concat('R')
    }
    setClicks(newClicks)
  }

  return (
    <div>
      {clicks.left}
      <Button handleClick = {handleLeftClick} text ='left'/>
      <Button handleClick = {handleRightClick} text ='right'/>
      {clicks.right}
      <History allClicks = {clicks.allClicks}/>
    </div>
  )
}

export default App