import React, { useState, useEffect } from 'react'
import Row from './Row';

function Game({ verses, photos, getRandomInt }) {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        const callConstructFunction = () => {
            let rowItems = [];
            for(let i=0;i<4;i++){
                rowItems.push(constructRowItems());
            }
            setRows(rowItems);
            console.log("FinaL : ", rowItems);
        }

        callConstructFunction();
    }, [verses, photos]);

    const constructRowItems = () => {
        let rowItems = [];
        let itemSide;
        let itemNumber;
        const usedVerses = [...verses];
        const usedPhotos = [...photos];

        for(let i=0;i<4;i++){
            if(usedVerses.length > 0 && usedPhotos.length > 0){
                itemSide = getRandomInt(0,1);
                if(itemSide === 0){
                    itemNumber = getRandomInt(0,usedVerses.length-1);
                    rowItems.push(usedVerses.splice(itemNumber, 1)[0]);
                } else{
                    itemNumber = getRandomInt(0, usedPhotos.length-1);
                    rowItems.push(usedPhotos.splice(itemNumber, 1)[0]);
                }
            } else if(usedVerses.length > 0){
                itemNumber = getRandomInt(0,usedVerses.length-1);
                rowItems.push(usedVerses.splice(itemNumber, 1)[0]);
            } else if(usedPhotos.length > 0){
                itemNumber = getRandomInt(0, usedPhotos.length-1);
                rowItems.push(usedPhotos.splice(itemNumber, 1)[0]);
            }
        }
        return rowItems;
    }

    return (
        <div>
            {
                rows.map((row, index) => (
                    <Row key={index} rowItems={row.length > 0 ? row : ["No items available"]}/>
                ))
            }
        </div>
    )
}

export default Game