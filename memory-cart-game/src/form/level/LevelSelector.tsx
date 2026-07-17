import type { TableLevel } from "../../model/TableLevel";
import "./style.css"


interface LevelSelectorProps {
    levels : Map<string, TableLevel>;
    setLevel : (dimentions : TableLevel) => void;
}

const LevelSelector = ({ levels, setLevel }: LevelSelectorProps) => {
    return (
        // Naudojame div vietoj <> stiliaus pritaikymui
        <div className="level-selector-container">
            <h2 className="title">Select deificulity</h2>
            
            {/* Mygtukų sąrašas */}
            <div className="button-list">
                {Array.from(levels.entries()).map(([key, value]) => (
                    <button 
                        key={key} 
                        className="level-btn"
                        onClick={() => setLevel(value)}
                    >
                        {key}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LevelSelector;