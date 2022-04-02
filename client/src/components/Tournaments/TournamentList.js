import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getTournaments } from '../../utils/utils';

function TournamentList({ tournaments, setTournaments, currPage, setCurrPage, loading, setLoading, level = "" }) {

  const navigate = useNavigate();

  useEffect(async() => {
    await getTournaments(currPage, 20, setLoading, setTournaments, level);
  }, []);

  return tournaments.map((tour, i) => (
    <tr onClick={(() => navigate(`/tournament/${tour.id}`))}>
      <td scope="row">{ tour.name }</td>
      <td>{ tour.surfaces }</td>
      <td>{ tour.levels }</td>
      <td>{ tour.topPlayers[0].name }</td>
    </tr>
  ))
}

export default TournamentList