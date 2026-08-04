import { useState, useEffect } from 'react';
import Card from '../card/Card';
import './style.css'
import { CardIndex, type CardIndexInterface } from '../../model/CardIndex';
import CardsLoader from './CardsLoader';
import DomImageWrapper from './DomImageWrapper';
interface TableProps {
    width: number;
    height: number;
    score: (time: number) => void;
}

const getIndex = (index: CardIndexInterface, width: number): number => {
    return index.x * width + index.y;
};

const getSeconds = (date: Date) => {
    return Math.floor(date.getTime() / 1000)
}
const Table = ({ width, height, score }: TableProps) => {

    const [loadedImages, setLodedImages] = useState<HTMLImageElement[]>([]);

    const [selectedCards, setSelectedCards] = useState<CardIndexInterface[]>([]);
    const [tableCards, setTableCards] = useState<number[]>([]);
    const [hiddenCards, setHiddenCards] = useState<CardIndexInterface[]>([]);
    const [startTime, setStartTime] = useState<Date | null>(null);

    const populateValues = () => {
        const totalCount = (width * height) / 2;

        let arr: number[] = [];
        for (let i = 0; i < totalCount; i++) {
            arr.push(i);
            arr.push(i);
        }
        arr.sort(() => Math.random() - 0.5);
        setTableCards(arr);
        setSelectedCards([]);
        setHiddenCards([]);
        setStartTime(null);
    }

    useEffect(populateValues, [])



    useEffect(() => {
        const timer = setTimeout(() => {
            if (selectedCards.length > 1) {
                if (tableCards[getIndex(selectedCards[0], width)] === tableCards[getIndex(selectedCards[1], width)]) {
                    let values = [...hiddenCards]
                    values.push(selectedCards[0]);
                    values.push(selectedCards[1]);
                    setHiddenCards(values);
                }
                setSelectedCards([]);
            }
        }, 600);

        return () => clearTimeout(timer);
    }, [selectedCards]);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (hiddenCards.length == width * height) {
                populateValues();
            }
        }, 600);

        return () => clearTimeout(timer);
    }, [hiddenCards]);

    const onSelect = (selectedCard: CardIndex) => {
        // add selecyed if visable and not selected
        if (selectedCards.length < 2
            && selectedCards.findIndex((val: CardIndexInterface) => selectedCard.isSame(val)) === -1
            && hiddenCards.findIndex((val: CardIndexInterface) => selectedCard.isSame(val)) === -1) {
            let values = [...selectedCards]
            values.push(selectedCard);
            setSelectedCards(values);
        }
        // mark start game
        if (startTime == null) {
            setStartTime(new Date());
        }
        // on end of the game calculate score
        if (selectedCards.length > 0 && hiddenCards.length == width * height - 2 && tableCards[getIndex(selectedCards[0], width)] === tableCards[getIndex(selectedCard, width)]) {
            if (startTime != null) {
                const doneInSecods = Math.abs(getSeconds(new Date()) - getSeconds(startTime));
                score(doneInSecods);
            }
        }
    }

    const rowsArray = Array.from({ length: height });
    const colsArray = Array.from({ length: width });

    if (loadedImages.length == 0)
        return (<CardsLoader size={(width * height) / 2} onLoaded={(images) => setLodedImages(images)} />);
    return (
        <div className='main-content'>

            <table className='gameBoard'>
                {rowsArray.map((_, rowIndex) =>
                (<tr key={rowIndex}>
                    {colsArray.map((_, colIndex) =>
                    (<td
                        key={colIndex}
                        onClick={
                            () => {
                               onSelect(new CardIndex(rowIndex, colIndex));
                            }
                        }
                    >
                        <Card isFlipped={selectedCards.findIndex((val: CardIndexInterface) => val.sSameCoradinate(rowIndex,colIndex)) !== -1}
                            isShowCard={hiddenCards.findIndex((val: CardIndexInterface) => val.sSameCoradinate(rowIndex,colIndex)) === -1}>
                            <DomImageWrapper imageElement={loadedImages[tableCards[rowIndex * (width) + colIndex]].cloneNode(true) as HTMLImageElement} />
                        </Card>
                    </td>)
                    )
                    }</tr>)
                )
                }
            </table>
        </div>
    );
}

export default Table;