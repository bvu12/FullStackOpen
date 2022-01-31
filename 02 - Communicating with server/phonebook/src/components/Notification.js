import React from "react";


const NotificationError = ({ message }) => {
    if (message === null) {
      return null
    }

    console.log(message)
  
    return (
      <div className={'error'+ ' ' + 'message'}>
        {message}
      </div>
    )
  }


  const NotificationConsole = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={'console'+ ' ' + 'message'}>
        {message}
      </div>
    )
  }

export {
    NotificationConsole,
    NotificationError
}