

interface PlayerScoreInterface {
    username?: string,
    points: number
}

const PlayerScore = ({username, points}: PlayerScoreInterface) => {
    if (username) return (
        <div>You {username} scored {points}</div>
    );
    return (<div>You scored {points}</div>);
}

export default PlayerScore;