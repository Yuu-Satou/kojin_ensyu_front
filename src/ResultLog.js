import React, { useEffect, useState } from 'react'

function ResultLog() {
    const [data, setData] = useState([]);

    //localhost:8080、スプリングブート側から手に入るデータをdataに格納
    useEffect(()=>{
        fetch("http://localhost:8080", {method: "GET"})
        .then(res => {
            res.json().then(data => {setData(data); console.log(data)})
        })
        .catch(err => console.log(err));
    }, []);

    const deleteItem = (onedata) => {
        fetch("http://localhost:8080/delete", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' 
              },
            body: JSON.stringify(onedata)
        }).then(res => {
            window.location.href = "/";
        })

    }
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
                    <th>削除</th>
                </tr>
            </thead>
            <tbody>
                {data.map(onedata => (
                <tr key={onedata.id} className={onedata.you > onedata.com ? "windata" : "losedata"}>
                    <td>{onedata.id}</td>
                    <td className={onedata.you > onedata.com ? "boldScore" : ""}>{onedata.you}</td>
                    <td className={onedata.you < onedata.com ? "boldScore" : ""}>{onedata.com}</td>
                    <td>{new Date(onedata.date).toLocaleDateString()}</td>
                    <td><button onClick={() => deleteItem(onedata)} className='deleteButton'>×</button></td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default ResultLog