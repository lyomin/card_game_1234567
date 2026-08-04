import { useEffect, useRef } from "react";

    
    interface DomImageWrapperProps {
        imageElement: HTMLImageElement
    }
    
    export default function DomImageWrapper({ imageElement } : DomImageWrapperProps) {
        const containerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const container = containerRef.current;
            if (container && imageElement) {
            container.innerHTML = ''; // Išvalome seną turinį
            container.appendChild(imageElement); // Įterpiame HTMLImageElement
            }
        }, [imageElement]);

        return <div ref={containerRef} />;
    }