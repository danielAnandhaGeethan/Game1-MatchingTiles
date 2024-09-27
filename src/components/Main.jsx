import React, { useState, useEffect } from 'react'
import data from '../data/data.json';
import Game from './Game';

function Main() {
    const [bundle, setBundle] = useState([]);
    const [verses, setVerses] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [code, setCode] = useState(1001);

    useEffect(() => {
        const handleReload = () => {
            const shuffledData = shuffleArray(data);
            setBundle(shuffledData);
            setGameData(shuffledData.slice(0,8));
        }

        window.addEventListener('load', handleReload);
        return () => {
            window.removeEventListener('load', handleReload);
          };
    }, []);
    
    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const printData = (data) => {
        data.map((item) => {
            return console.log(item.verse);
        });
    }

    const setGameData = (data) => {
        let verseArray = [];
        let photoArray = [];
        let currentCode = 1001;

        data.map((item) => {
            photoArray.push({ "photo" : item.photo, "code" : code });
            verseArray.push({ "verse" : item.text, "code" : code });
            currentCode += 1;
        });

        setVerses(verseArray);
        setPhotos(photoArray);
        setCode(currentCode);
    }

    return (
    <div class='bg-[#BF964A] h-screen flex justify-center items-center'>
        <Game verses={verses} photos={photos} getRandomInt={getRandomInt}/>
    </div>
  )
}

export default Main