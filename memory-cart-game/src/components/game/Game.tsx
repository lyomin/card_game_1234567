import { useState } from "react"
import LevelSelector from "../../form/level/LevelSelector";
import toast from "react-hot-toast";
import Table from "../table/Table";

const Game = () => {
    const [level, setLevel] = useState<number[]|null>(null);

    const handleScore = (resultInSec: number) => {

    setLevel(null);

    // Iškviečiame custom toast, kuris grąžina unikalų objekto ID (t)
    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
          You done it in {resultInSec} seconds
        </span>
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          
          {/* „TAIP“ Mygtukas */}
          <button
            onClick={() => {
              toast.dismiss(t.id); // Uždarome pranešimą
            }}
            style={{
              padding: '6px 12px',
              backgroundColor: '#ef4444', // Raudona (Confirm)
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Taip
          </button>
        </div>
      </div>
    ), {
      duration: Infinity, // Pranešimas neišnyks automatiškai, kol vartotojas nepaspaus mygtuko
      position: 'top-center',
      style: {
        background: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        padding: '16px',
        borderRadius: '12px'
      }
    })};

    if (level === null) {
        return <>
            <LevelSelector levels={new Map<string, number[]>([
                ["Hard", [4,4]],
                ["Medium", [2,4]],
                ["Easy" , [2,2]]
            ])} 
            setLevel={(level) => setLevel(level)} />
        </>
    }

    return (
        <>
            <Table height={level[0]} width={level[1]} score={handleScore} />
        </>
    )
}

export default Game;