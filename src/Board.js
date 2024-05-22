import React, { useEffect, useState } from 'react'
import Square from './Square';
import Result from './Result';

function Board () {
    //マスごとの情報を格納する変数
    const [squareInfo, setSquareInfo] = useState([...Array(64)].map((_, index) => ({id: index, state: "none", track: false})));

    useEffect(() => {
        //石の初期配置
        setStone(27, "white");
        setStone(28, "black");
        setStone(35, "black");
        setStone(36, "white");
    }, []);

    const [playerTurn, setPlayerTurn] = useState(true);

    const [yourStones, setYourStones] = useState(0);

    const [comStones, setComStones] = useState(0);

    const [end, setEnd] = useState(false);

    //マスをタッチしたときの処理、オセロのメインロジック
    const touchSquare = (id) => {
        if(playerTurn === false) return;
        const arr = available("white");
        if(arr.length === 0){
            
        } else {
            if(arr.includes(id)){
            } else return;
            setStone(id, "white");
            changeStones(squareInfo[id]);
            setPlayerTurn(false);
            judge();    
        }

        setTimeout(() => {
            computerthink();
            setPlayerTurn(true);   
            judge();
            showTrack();
        }, 1000);

    }

    //石を置けるマスを返す
    const available = (color) => {
        const arr = [];
        for(let square of squareInfo){
            if(square.state !== "none") continue;
            squarelabel : for(let r = -1; r < 2; r++){
                    for(let l = -1; l < 2; l++){
                        for(let i = 1; i <= 8; i++){
                        const row = square.id % 8 + r * i;
                        const line = Math.floor(square.id / 8) + l * i;
                        if(line >= 8 || line < 0 || row >= 8 || row < 0) break;
                        const id = square.id + r * i + (l* i) * 8;
                        if(id < 0 || id > 63) break;
                        if(squareInfo[id].state !== color && squareInfo[id].state !== "none"){
                            continue;
                        } else if(squareInfo[id].state === color){
                            if(i !== 1){
                                arr.push(square.id);
                                break squarelabel;
                            } else break;
                        }else {
                            break;
                        }
                    }
                }
            }
        }
        return arr;
    }

    //挟まれた石をひっくり返す
    const changeStones = (square) => {
        for(let r = -1; r < 2; r++){
            for(let l = -1; l < 2; l++){
                for(let i = 1; i < 8; i++){
                    const row = square.id % 8 + r * i;
                    const line = Math.floor(square.id / 8) + l * i;
                    if(line >= 8 || line < 0 || row >= 8 || row < 0) break;
                    const id = square.id + r * i + (l * i) * 8;
                    if(id < 0 || id > 63) break;;
                    if(square.state === squareInfo[id].state){
                        if(i !== 1){
                            let row2 = id % 8;
                            let line2 = Math.floor(id / 8);
                            for(let c = 1; c < 8; c++){
                                row2 -= r;
                                line2 -= l;
                                if(row2 + line2 * 8 === square.id) break;
                                squareInfo[row2 + line2 * 8].state = square.state;
                            }
                            break;
                        } else break;
                    } else if(square.state !== squareInfo[id].state && squareInfo[id].state !== "none"){
                        continue;
                    } else {
                        break;
                    }
                }
            }
        }
    }

    //石を置く
    const setStone = (id, color) => {
        const copyInfo = [...squareInfo];
        copyInfo[id].state = color;
        setSquareInfo(copyInfo);
    }

    //コンピュータが考えて石を置く
    const computerthink = () => {
        const arr = available("black");
        if(arr.length === 0) return;
        const id = arr[Math.floor(Math.random() * arr.length)];
        
        setStone(id, "black");
        changeStones(squareInfo[id]);
    }

    //勝利判定
    const judge = () => {
        if(available("black").length === 0 && available("white").length === 0){
            setPlayerTurn(false);
            endGame();
        }
    }

    //ゲームを終える
    const endGame = () => {
        setEnd(true);
        setYourStones(squareInfo.filter(s => s.state === "white").length);
        setComStones(squareInfo.filter(s => s.state === "black").length);
    }

    //squareinfoのトラック情報にavailable関数を用いてtrackの有無を追記
    const showTrack = () => {
        const trackId = available("white");
        squareInfo.map(m => {
            if(trackId.includes(m.id)) m.track = true;
            else m.track = false;
        })
    }

  return (
    <div>
        <div className="Board">
            {squareInfo.map((info) => (
                <Square info={info} key={info.id} touchSquare={touchSquare} />
            ))}
        </div>
        {end?<Result you={yourStones} com={comStones} />: <></>}
    </div>
  )
}

export default Board;