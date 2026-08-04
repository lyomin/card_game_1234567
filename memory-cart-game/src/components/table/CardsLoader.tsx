import { useEffect, useState } from "react";


interface CardsLoaderProps {
    size: number;
    onLoaded: (images: HTMLImageElement[]) => void;
}


const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
};

const CardsLoader = ({size, onLoaded}: CardsLoaderProps) => {
    let imageList : Promise<HTMLImageElement>[] = [];

    for (let i = 0; i < size; i++) {
        imageList[i] = loadImage(`card-${i}.png`);
    }

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all(imageList).then((images) => {setLoaded(true); onLoaded(images);})
        
    })

    if (loaded) return (<></>);

    return (<div>LOADING</div>)
}


export default CardsLoader;