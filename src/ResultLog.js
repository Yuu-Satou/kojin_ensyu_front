import React, { useEffect, useState } from 'react'

function ResultLog() {
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:8080", {method: "GET"})
        .then(res => {
            res.json().then(data => {setData(data); console.log(data)})
        })
        .catch(err => console.log(err));
    }, []);
  return (
    <div>
        <table className='LogTable'>
            <caption>戦歴データ</caption>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>あなた</th>
                    <th>相手</th>
                    <th>戦闘日時</th>
                </tr>
            </thead>
            <tbody>
                {data.map(onedata => (
                <tr key={onedata.id} className={onedata.you < onedata.com ? "windata" : "losedata"}>
                    <td>{onedata.id}</td>
                    <td>{onedata.you}</td>
                    <td>{onedata.com}</td>
                    <td>{new Date(onedata.date).toLocaleDateString()}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ResultLog