import React from 'react'
import Tile from './Tile';

function Row({ data, selected, setSelected, setFlippedCount, flippedCount, resetTiles, checkState, setPoints }) {

  return (
    <div className='flex flex-wrap justify-center gap-1'>
            {data.map((item, index) => (
                <div className="" key={index}>
                    <Tile 
                        item={item} 
                        selected={selected} 
                        setSelected={setSelected} 
                        flippedCount={flippedCount} 
                        setFlippedCount={setFlippedCount} 
                        resetTiles={resetTiles} 
                        checkState={checkState} 
                        setPoints={setPoints}
                    />       
                </div>
            ))}
        </div>
  )
}

export default Row;