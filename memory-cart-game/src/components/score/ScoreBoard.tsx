import { useState } from "react";
import type { Score } from "../../model/Score";
import PlayerScore from "./player/PlayerScore";
import NewScore from "../../form/NewScore";
import ScoreTop10 from "./top/ScoreTop10";

interface ScoreBoardProps {
    points: number;
    mode: string;
}

const ScoreBoard = ({points, mode}:ScoreBoardProps) => {
    const [score, setScore] = useState<Score|null> (null);

    return (
        <>
            {!score && <NewScore points={points} mode={mode} onSubmit={setScore}/>}
            <PlayerScore username={score?.username} points={points}/>
            <ScoreTop10 userScore={score} mode={mode}/>
        </>
    );
};

export default ScoreBoard;