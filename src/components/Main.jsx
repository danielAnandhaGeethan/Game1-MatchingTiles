import React, { useState, useEffect } from 'react'
import data from '../data/data.json';
import Game from './Game';
import bg from '../data/bg.png'

function Main() {
    const [bundle, setBundle] = useState([]);
    const [verses, setVerses] = useState([]);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const shuffledData = shuffleArray(data);
        setGameData(shuffledData.slice(0,8));
    }, []);

    useEffect(() => {
        if(photos.length > 0 && verses.length > 0){
            const combined = shuffleArray([...verses, ...photos]);
            setBundle(combined);
        }
    }, [verses, photos]);

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

        data.forEach((item) => {
            photoArray.push({ "photo" : item.photo, "code" : currentCode, "flipped" : false, isMatched : false  });
            verseArray.push({ "verse" : item.text, 'ref' : item.verse, "code" : currentCode, "flipped" : false, isMatched : false });
            currentCode += 1;
        });

        setVerses(verseArray);
        setPhotos(photoArray);
    }

    return (
        <div className='h-screen flex justify-center items-center' style={{ background: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='bg-white bg-opacity-40 rounded-lg p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 w-full'>
                <Game bundle={bundle} getRandomInt={getRandomInt} />
            </div>
        </div>
  )
}

export default Main