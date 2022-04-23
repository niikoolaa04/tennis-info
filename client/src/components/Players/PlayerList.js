import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getLeaderboard } from '../../utils/utils';

function PlayerList({ players, setPlayers, currPage }) {
  let limit = 20 * currPage;

  useEffect(async() => {
    await getLeaderboard(limit, setPlayers);
  }, []);

  return players.map((p, i) => (
    <tr key={p.id}>
      <th scope="row">{ p.rank }</th>
      <td>
        <Link className='text-lightaqua' to={"/players/" + p.id} style={{ textDecoration: "none" }}>
          { p.fullName }
        </Link>
      </td>
      <td>{ p.country }</td>
      <td>{ p.points }</td>
    </tr>
  ))
}

export default PlayerList