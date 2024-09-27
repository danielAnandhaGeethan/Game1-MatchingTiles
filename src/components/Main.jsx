import React, { useState, useEffect } from 'react'
import data from '../data/data.json';
import Tile from './Tile';

function Main() {
    const [bundle, setBundle] = useState([]);
    const [verses, setVerses] = useState([]);
    const [references, setReferences] = useState([]);

    useEffect(() => {
        setBundle(data);
        bundle.map((item) => {
            setVerses([...verses, item.text]);
            setReferences([...references, item.verse]);
        });
        setVerses(verses.sort());
        setReferences(references.sort());
    }, []);

    return (
    <div class='bg-[#BF964A] h-screen flex justify-center items-center'>
        <div class='bg-[#DAC295] p-10 rounded-lg shadow-2xl'>
            
        </div>
    </div>
  )
}

export default Main