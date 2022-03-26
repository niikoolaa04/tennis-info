import { useEffect, useState } from 'react'
import { getLeaderboard } from '../../utils/utils';

function PlayerList({ players, setPlayers, currPage, setCurrPage, loading, setLoading }) {
  let limit = 20 * currPage;

  useEffect(async() => {
    await getLeaderboard(limit, setLoading, setPlayers);
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