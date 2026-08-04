

interface PlayerScoreInterface {
    username?: string,
    points: number
}

const PlayerScore = ({username, points}: PlayerScoreInterface) => {
    if (username) return (
        <h1>You {username} scored {points}</h1>
    );
    return (<h1>You scored {points}</h1>);
}

export default PlayerScore;