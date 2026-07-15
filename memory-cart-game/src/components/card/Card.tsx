import './style.css'
import { useState, useEffect } from 'react';

interface CardProps extends React.PropsWithChildren {
  isFlipped: boolean;
  isShowCard: boolean;
}

const Card = ({children, isFlipped, isShowCard} : CardProps) => {

    const [isFrontVisible, setFrontVisible] = useState(false);

    useEffect(() => {
    // Jei kortelė yra atverčiama atgal (isFlipped tampa false)
    if (!isFlipped) {
      const timer = setTimeout(() => {
        setFrontVisible(false); // Parodome priekinį turinį tik po to, kai baigiasi animacija
      }, 400);

      return () => clearTimeout(timer);
    } else {
      // Jei kortelė užverčiama (isFlipped tampa true), turinį paslepiame iškart arba su kitu laikmačiu
      setFrontVisible(true);
    }
  }, [isFlipped]);
    

  if (!isShowCard) {
    return <div 
      className="flipContainer" 
    ></div>;
  }

  return (
    <div 
      className="flipContainer" 
    >
      <div 
        className={`flipCardInner ${isFlipped ? 'isFlipped' : ''}`}>
        {/* Priekis */}
        <div className={"cardFace cardFront"}>
          
        </div>

        {/* Nugara */}
        <div className="cardFace cardBack">
          <div>{isFrontVisible ? children : <></>}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;