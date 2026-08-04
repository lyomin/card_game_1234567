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

// Keep pure utilities in a static helper class
class CardUtils {
    static getIndex(index: CardIndexInterface, width: number): number {
        return index.x * width + index.y;
    }
    static getSeconds(date: Date): number {
        return Math.floor(date.getTime() / 1000);
    }
}

// 1. EXTRACTED CUSTOM HOOK FOR STATE LOGIC
const useMemoryGame = (width: number, height: number, score: (time: number) => void) => {
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
    };

    useEffect(populateValues, [width, height]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (selectedCards.length > 1) {
                const idx0 = CardUtils.getIndex(selectedCards[0], width);
                const idx1 = CardUtils.getIndex(selectedCards[1], width);
                
                if (tableCards[idx0] === tableCards[idx1]) {
                    setHiddenCards(prev => [...prev, selectedCards[0], selectedCards[1]]);
                }
                setSelectedCards([]);
            }
        }, 600);
        return () => clearTimeout(timer);
    }, [selectedCards, tableCards, width]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (hiddenCards.length === width * height && hiddenCards.length > 0) {
                populateValues();
            }
        }, 600);
        return () => clearTimeout(timer);
    }, [hiddenCards, width, height]);

    const onSelect = (selectedCard: CardIndex) => {
        if (selectedCards.length < 2
            && selectedCards.findIndex((val) => selectedCard.isSame(val)) === -1
            && hiddenCards.findIndex((val) => selectedCard.isSame(val)) === -1) {
            setSelectedCards(prev => [...prev, selectedCard]);
        }
        
        if (startTime == null) {
            setStartTime(new Date());
        }

        if (selectedCards.length > 0 && hiddenCards.length === width * height - 2) {
            const idx0 = CardUtils.getIndex(selectedCards[0], width);
            const idxSelected = CardUtils.getIndex(selectedCard, width);
            
            if (tableCards[idx0] === tableCards[idxSelected] && startTime != null) {
                const doneInSeconds = Math.abs(CardUtils.getSeconds(new Date()) - CardUtils.getSeconds(startTime));
                score(doneInSeconds);
            }
        }
    };

    return { selectedCards, tableCards, hiddenCards, onSelect };
};

// 2. CLEAN PRESENTATIONAL COMPONENT
const Table = ({ width, height, score }: TableProps) => {
    const [loadedImages, setLodedImages] = useState<HTMLImageElement[]>([]);
    
    // Consume the extracted state logic here
    const { selectedCards, tableCards, hiddenCards, onSelect } = useMemoryGame(width, height, score);

    const rowsArray = Array.from({ length: height });
    const colsArray = Array.from({ length: width });

    if (loadedImages.length === 0)
        return (<CardsLoader size={(width * height) / 2} onLoaded={(images) => setLodedImages(images)} />);
    
    return (
        <div className='main-content'>
            <table className='gameBoard'>
                <tbody>
                    {rowsArray.map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {colsArray.map((_, colIndex) => {
                                const cardIndexInTable = rowIndex * width + colIndex;
                                const isFlipped = selectedCards.findIndex((val) => val.sSameCoordinate(rowIndex, colIndex)) !== -1;
                                const isShowCard = hiddenCards.findIndex((val) => val.sSameCoordinate(rowIndex, colIndex)) === -1;

                                return (
                                    <td key={colIndex} onClick={() => onSelect(new CardIndex(rowIndex, colIndex))}>
                                        <Card isFlipped={isFlipped} isShowCard={isShowCard}>
                                            <DomImageWrapper imageElement={loadedImages[tableCards[cardIndexInTable]]?.cloneNode(true) as HTMLImageElement} />
                                        </Card>
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;