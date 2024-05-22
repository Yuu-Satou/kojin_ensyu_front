import React from 'react'
import { Navigate, useHref } from 'react-router-dom';

function Result(props) {

    const submitResult = () => {
      const data = {"you": props.you, "com": props.com}
      fetch("http://localhost:8080/add", {
        method : "POST",
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data) 
    }).then(res => {window.location.href = "/";});
  }

  return (
    <div>
        <div className='result'>{props.you} - {props.com}</div>
        <button onClick={submitResult} className='submitButton'>結果を送信してNewGame</button>
    </div>
  )
}

export default Result