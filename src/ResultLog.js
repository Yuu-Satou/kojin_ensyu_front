import React, { useEffect, useState } from 'react'

function ResultLog() {
    const [data, setData] = useState();
    useEffect(()=>{
        fetch("http://localhost:8080", {method: "GET"})
        .then(res => {
            res.json()
        })
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, [])
  return (
    <div>
        {data}
    </div>
  )
}

export default ResultLog