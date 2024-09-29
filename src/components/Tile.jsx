import React, { useEffect, useState } from 'react'
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

function Tile({ item, selected, setSelected, flippedCount, setFlippedCount, resetTiles, checkState, setPoints }) {

  const [isFlipped, setIsFlipped] = useState(item.flipped);

  useEffect(() => {
    setIsFlipped(item.flipped);
    setSelected([]);
  }, [item, setSelected]);

  const tileOnClick = () => {
    if(item.isMatched){
      return;
    }
    if(isFlipped){
      const updatedSelected = selected.filter(v => v !== item);
      setSelected(updatedSelected);
      setFlippedCount(flippedCount - 1);
    } else{
      if(flippedCount === 2){
        enqueueSnackbar("Cannot Flip more than 2 tiles at a time!!!", {"variant" : "error"})
        return;
      } else if(flippedCount === 1){
        const updatedSelected = [...selected, item];
        setSelected(updatedSelected);
        let state = checkState(updatedSelected);
        if(state === 1){
          setPoints((prev) => prev + 1);
          setFlippedCount(0);
        } else{
          setFlippedCount(flippedCount + 1);
          resetTiles({time : 1800});
        }
      } else{
        setSelected([...selected, item]);
        setFlippedCount(flippedCount + 1);
      }
    }
    setIsFlipped(!isFlipped);
  }

    return (
    <div>
      <SnackbarProvider />
      {
        isFlipped ?
          (
            <div className='bg-white w-full h-12 w-12 sm:h-20 sm:w-20 md:h-26 md:w-26 lg:h-32 lg:w-32 p-2 text-sm text-black rounded-xl flex justify-center items-center cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-200' onClick={tileOnClick}>
              {item.photo ? <img src={item.photo} alt={item.ref} className="w-full h-full object-cover rounded-xl" /> : item.ref}
            </div>
          ) :
          (
            <div className='bg-black w-full h-10 w-10 sm:h-15 sm:w-15 md:h-20 md:w-20 lg:h-32 lg:w-32 p-2 text-sm text-white rounded-xl flex justify-center items-center cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-200' onClick={tileOnClick}>
              
            </div>
          )
      }
    </div>
  )
}

export default Tile