import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getTournaments } from '../../utils/utils';

function TournamentList({ tournaments, setTournaments, currPage, setCurrPage, loading, setLoading, level = "" }) {

  useEffect(async() => {
    await getTournaments(currPage, 20, setLoading, setTournaments, level);
  }, []);

  return tournaments.map((tour, i) => (
    <tr>
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