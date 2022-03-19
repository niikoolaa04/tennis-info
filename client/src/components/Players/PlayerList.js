import { useEffect, useState } from 'react'
import { getPlayerFromId } from '../../utils/utils'

function PlayerList() {
  const [players, setPlayers] = useState([]);
  
  const getLeaderboard = async() => {
    await fetch('http://localhost:3009/api/leaderboard', {
      method: "GET",
      headers: {
        limit: 20
      }
    }).then(async(data) => {
      let res = await data.json();
      let result = res.map(async(x) => {
        let getPlayer = await getPlayerFromId(parseInt(x.player));
        let obj = {
          rank: x.rank,
          fullName: getPlayer.firstName + ' ' + getPlayer.lastName,
          country: getPlayer.country,
          points: x.points
        }
        return obj;
      });

      setPlayers(await Promise.all(result));
    })
  }

  useEffect(async() => {
    await getLeaderboard();
  }, []);

  return players.map((p, i) => (
    <tr>
      <th scope="row">{ p.rank }</th>
      <td>{ p.fullName }</td>
      <td>{ p.country }</td>
      <td>{ p.points }</td>
    </tr>
  ))
}

export default PlayerList