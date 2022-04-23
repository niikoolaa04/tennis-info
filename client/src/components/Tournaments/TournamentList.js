import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getTournaments } from '../../utils/utils';

function TournamentList({ tournaments, setTournaments, currPage, level = "" }) {

  useEffect(async() => {
    await getTournaments(currPage, 20, setTournaments, level);
  }, []);

  return tournaments.map((tour, i) => (
    <tr key={tour.id}>
      <td scope="row">
        <Link to={"/tournaments/" + tour.id} className="text-lightaqua" style={{ textDecoration: "none" }}>
          { tour.name }
        </Link>
      </td>
      <td>{ tour.surfaces }</td>
      <td>{ tour.levels }</td>
      <td>{ tour.topPlayers[0].name }</td>
    </tr>
  ))
}

export default TournamentList