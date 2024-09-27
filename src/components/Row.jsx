import React, { useEffect } from 'react'

function Row({data}) {

    useEffect(() => {
        const x = () => {
            console.log("Data : ", data);
        }

        x();
    }, [data])

  return (
    <div>
        
    </div>
  )
}

export default Row;