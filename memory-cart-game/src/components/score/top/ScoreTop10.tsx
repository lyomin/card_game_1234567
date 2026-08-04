import { useEffect, useState } from "react"
import type { Score } from "../../../model/Score"
import { scoreService } from "../../../service/ScoreService";

interface ScoreTop10Props {
    userScore?: Score | null,
    mode: string
}

const ScoreTop10 = ({userScore, mode}: ScoreTop10Props) => {

    const [scores, setScores] = useState<Score[]|null>(null);

    useEffect(() => {
        scoreService.top10(mode).then((s) => {setScores(s)});
    }, [userScore])

    if (scores === null) {
        return <>Loading ...</>
    }

    if (scores.length == 0) {
        return (<></>)
    }

    return (
    <>
    <h3>Leader board</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '12px' }}>Place</th>
            <th style={{ padding: '12px' }}>User</th>
            <th style={{ padding: '12px' }}>Points</th>
            <th style={{ padding: '12px' }}></th>
          </tr>
        </thead>
        <tbody>
          {scores.map((item, index) => (
            <tr key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{index + 1}</td>
              <td style={{ padding: '12px' }}>{item.username}</td>
              <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.points}</td>
              <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.id === userScore?.id ? "NEW" : ""}</td>
            </tr>
          ))}
        </tbody>
      </table> 
      </>);
}

export default ScoreTop10;