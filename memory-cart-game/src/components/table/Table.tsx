import { useState, useEffect } from 'react';
import Card from '../card/Card';
import './style.css'
interface TableProps {
    width: number;
    height: number;
    score: (time: number) => void;
}

const getIndex = (strIndex: string, width: number): number => {
  const [row, col] = strIndex.split(' ');
  
  // Formulė: eilutė * bendras_stulpelių_skaičius + stulpelis
  return parseInt(row, 10) * width + parseInt(col, 10);
};

const getSeconds = (date: Date) => {
  return Math.floor(date.getTime() / 1000)
}
const Table = ({width, height, score} : TableProps) => {


    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const [tableCards, setTableCards] = useState<number[]>([]);
    const [hiddenCards, setHiddenCards] = useState<string[]>([]);
    const [startTime, setStartTime] = useState<Date|null>(null);

    const populateValues = () => {
        const totalCount = (width * height) / 2;
        
        let arr : number[] = [];
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

    useEffect(populateValues,[])
    
 

    useEffect(() => {
      const timer = setTimeout(() => {
        if (selectedCards.length > 1 ) {
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
        if (hiddenCards.length == width * height ) {
            populateValues();
        }
      }, 600);

      return () => clearTimeout(timer);
    }, [hiddenCards]);

    const rowsArray = Array.from({ length: height });
    const colsArray = Array.from({ length: width });

  return (
    <div className='main-content'>	
        <table className='gameBoard'>
            {rowsArray.map((_,rowIndex) => 
                (<tr key={rowIndex}>  
                    {colsArray.map((_,colIndex) => 
                        (<td 
                            key={colIndex} 
                            onClick={ 
                                () => {
                                    const selectedCard = `${rowIndex} ${colIndex}`;
                                    if (selectedCards.length < 2 && !selectedCards.includes(selectedCard) && !hiddenCards.includes(selectedCard)) {
                                            let values = [...selectedCards]
                                            values.push(selectedCard); 
                                            setSelectedCards(values);
                                    }
                                    if (startTime == null) {
                                        setStartTime(new Date());
                                    }tableCards
                                    if (selectedCards.length > 0 && hiddenCards.length == width * height - 2 && tableCards[getIndex(selectedCards[0], width)] === tableCards[getIndex(selectedCard, width)]) {
                                        if (startTime != null) {
                                            const doneInSecods = Math.abs(getSeconds(new Date()) - getSeconds(startTime) );
                                            score(doneInSecods);
                                        }
                                    }
                                }
                                    
                                }
                                >
                            <Card isFlipped={selectedCards.includes(`${rowIndex} ${colIndex}`)} isShowCard={!hiddenCards.includes(`${rowIndex} ${colIndex}`)}>
                                <img src={`card-${tableCards[rowIndex * (width) + colIndex]}.png`} />
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