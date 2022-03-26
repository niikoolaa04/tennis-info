import { useEffect, useState } from 'react'
import { getTournaments } from '../../utils/utils';

function PlayerList({ tournaments, setTournaments, currPage, setCurrPage, loading, setLoading }) {

  useEffect(async() => {
    await getTournaments(currPage, 20, setLoading, setTournaments);
  }, []);

  return tournaments.map((tour, i) => (
    <tr>
      <td scope="row">{ tour.name }</td>
      <td>{ tour.surfaces }</td>
      <td>{ tour.levels }</td>
      <td>{ tour.topPlayers[0].name }</td>
    </tr>
  ))
}

export default PlayerList