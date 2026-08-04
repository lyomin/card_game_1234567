import { useState } from "react"
import LevelSelector from "../../form/level/LevelSelector";
import toast from "react-hot-toast";
import Table from "../table/Table";
import { TableLevel } from "../../model/TableLevel";
import ScoreBoard from "../score/ScoreBoard";
import { scoreService } from "../../service/ScoreService";
import { ErrorBoundary } from "react-error-boundary";
import overlay from "./Overlay";

const Game = () => {
    const [level, setLevel] = useState<TableLevel|null>(null);

    const handleScore = (resultInSec: number) => {

    setLevel(null);

    overlay(
      <>
        {!!level && 
        <ErrorBoundary fallback={<h1>A server error occurred.</h1>}>
          <ScoreBoard mode={level.name} points={scoreService.sec2points(resultInSec)} />
        </ErrorBoundary>
        }
        {!level && "unexpected error"}
      </>

  )};

    if (level === null) {
        return <>
            <LevelSelector levels={new Map<string, TableLevel>([
                ["Easy", new TableLevel(2,2,"2x2")],
                ["Medium", new TableLevel(4,2,"4x2")],
                ["Hard" , new TableLevel(4,4,"4x4")]
            ])} 
            setLevel={(level) => setLevel(level)} />
        </>
    }

    return (
        <>
            <button onClick={() => setLevel(null)}>Select deificulity</button>
            <Table height={level.height} width={level.width} score={handleScore} />
        </>
    )
}

export default Game;