import React, { useState, useEffect } from 'react'
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import Row from './Row';
import ShepherdWithSheep from '../data/Shepherd with sheep.jpeg';
import SunriseOverMountains from '../data/Sunrise over mountains.jpeg';
import EagleSoaringInTheSky from '../data/Eagle soaring in the sky.jpeg';
import OliveTree from '../data/Olive tree.jpeg';
import Vineyard from '../data/Vineyard.jpeg';
import OceanWaves from '../data/Ocean waves.jpeg';
import LilyFlowers from '../data/Lily flowers.jpeg';
import StarryNightSky from '../data/Starry night sky.jpeg';
import RockyCliff from '../data/Rocky cliff.jpeg';
import RainbowAfterRain from '../data/Rainbow after rain.jpeg';
import BurningBush from '../data/Burning bush.jpeg';
import Lion from '../data/Lion.jpeg';
import TowerOfBabel from '../data/Tower of Babel.jpeg';
import MosesPartingTheRedSea from '../data/Moses parting the Red Sea.jpeg';
import ArkOfTheCovenant from '../data/Ark of the Covenant.jpeg';
import TenCommandments from '../data/Ten Commandments.jpeg';
import BethlehemStar from '../data/Bethlehem Star.jpeg';
import JesusCalmingTheStorm from '../data/Jesus calming the storm.jpeg';
import TheLastSupper from '../data/The Last Supper.jpeg';
import EmptyTomb from '../data/Empty tomb.jpeg';


function Game({ bundle, getRandomInt }) {

    const [rows, setRows] = useState([]);
    const [selected, setSelected] = useState([]);
    const [flippedCount, setFlippedCount] = useState(0);
    const [time, setTime] = useState(0);
    const [points, setPoints] = useState(0);
    const [isWin, setIsWin] = useState(false);

    useEffect(() => {
        callConstructFunction();
    }, [bundle]);

    useEffect(() => {
        setTimeout(() => {
            if(!isWin){
                setTime((prevTime) => prevTime + 1);
            }
        }, 1000)
    }, [time, isWin]);

    const imageMap = {
        'ShepherdWithSheep': ShepherdWithSheep,
        'SunriseOverMountains': SunriseOverMountains,
        'EagleSoaringInTheSky': EagleSoaringInTheSky,
        'OliveTree': OliveTree,
        'Vineyard': Vineyard,
        'OceanWaves': OceanWaves,
        'LilyFlowers': LilyFlowers,
        'StarryNightSky': StarryNightSky,
        'RockyCliff': RockyCliff,
        'RainbowAfterRain': RainbowAfterRain,
        'BurningBush': BurningBush,
        'Lion': Lion,
        'TowerOfBabel': TowerOfBabel,
        'MosesPartingTheRedSea': MosesPartingTheRedSea,
        'ArkOfTheCovenant': ArkOfTheCovenant,
        'TenCommandments': TenCommandments,
        'BethlehemStar': BethlehemStar,
        'JesusCalmingTheStorm': JesusCalmingTheStorm,
        'TheLastSupper': TheLastSupper,
        'EmptyTomb': EmptyTomb
      };
      
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const callConstructFunction = () => {
        let rowItems = [];
        if(bundle.length > 0){
            let localBundle = [...bundle];
            for(let i=0;i<4;i++){
                let individualRow = [];
                let itemNumber;

                while(individualRow.length < 4){
                    itemNumber = getRandomInt(0, localBundle.length - 1);
                    const removedItem = localBundle[itemNumber];
                    individualRow.push(removedItem);
                    localBundle = localBundle.filter(item => item !== removedItem);
                }
                rowItems.push(individualRow);
            }
        }
        setRows(rowItems);
    }

    const resetTiles = ({time}) => {
        setTimeout(() => {
            setRows(prevRows => 
                prevRows.map((row) => 
                row.map(item => 
                    !item.isMatched ? ({...item, flipped: false}) : ({...item})
                ))
            )
            setFlippedCount(0);
        }, time);
    }

    const checkState = (flippedItems) => {
        console.log("Flipped : ", flippedItems);
        if(flippedItems.length === 2){
            let a = flippedItems[0];
            let b = flippedItems[1];
            console.log(a, b);
            if((('verse' in a) && !('verse' in b))|| (!('verse' in a) && ('verse' in b))){
                if(a.code === b.code){
                    setTimeout(() => {
                        enqueueSnackbar("+1 Point", { "variant" : "success"});
                        setRows(prevRows => 
                            prevRows.map((row) => 
                            row.map(item => 
                                item === a || item === b ? 
                                ({...item, isMatched: true, flipped: true}) : 
                                ({...item})
                            ))
                        );
                    }, [800])
                    if(points === 7){
                        setIsWin(true);
                    }
                    return 1;
                }
                return -1;
            }
            return -1;
        }
        return -1;
    }

    return (
        <div className="flex w-full h-screen">
            <SnackbarProvider />
            {!isWin ? (
                <div className="absolute top-8 right-8 border border-2 border-black p-2 hover:scale-110">
                    {formatTime(time)}
                </div>
            ) : (
                <div className="absolute bg-black bg-opacity-80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-2 border-white text-white text-[160px] p-2 hover:scale-110">
                    {formatTime(time)}
                </div>
            )}
            <div className="flex w-full md:w-1/4 justify-center items-center flex-col gap-4">
                {selected.length > 0 &&
                    selected.map((item) => (
                        'verse' in item ? (
                            <div className='text-center px-2 font-sans'>
                                <span className='font-bold'>{item.ref} : </span>
                                {item.verse}
                            </div>
                        ) : null
                    ))}
            </div>
            <div className="flex w-full justify-center items-center">
                <div className='flex flex-col gap-1'>
                    {rows.map((row, index) => (
                        <Row
                            key={index}
                            data={row.length > 0 ? row : ["No items available"]}
                            selected={selected}
                            setSelected={setSelected}
                            flippedCount={flippedCount}
                            setFlippedCount={setFlippedCount}
                            resetTiles={resetTiles}
                            checkState={checkState}
                            setPoints={setPoints}
                        />
                    ))}
                </div>
            </div>
            <div className="flex w-full md:w-1/4 justify-center items-center flex-col gap-4">
                {selected.length > 0 &&
                    selected.map((item) => (
                        'photo' in item ? (
                            <img className='w-full max-w-[325px] h-auto' src={imageMap[item.photo]} alt={item.photo} />
                        ) : null
                    ))}
            </div>
        </div>
    )
}

export default Game