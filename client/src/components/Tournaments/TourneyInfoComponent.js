import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { findTournament } from '../../utils/utils';
import FooterComponent from '../Other/FooterComponent'
import NavComponent from '../Navigation/NavComponent'

function TourneyInfoComponent() {
  let { tournamentId } = useParams();
  const [tourney, setTourney] = useState([{}]);
  const [winners, setWinners] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(async() => {
    await findTournament(tournamentId, setTourney).then(async(data) => {
      if(!data[0]) return navigate("/tournaments");
      await setWinners([
        `${data[0].winner} (${data[0].winner_loc})`,
        data[1] ? `${data[1].winner} (${data[1].winner_loc})` : "",
        data[2] ? `${data[2].winner} (${data[2].winner_loc})` : "",
      ]);
      setTourney(data);
      setLoading(false);
    }).catch((err) => {
      navigate("/tournaments");
    });
  }, [])

  return (
    <div>
      <NavComponent active={"tournaments"} />
      <div>
        {/* GENERAL INFORMATION */}
        <div className="container">
          <div className="row">
            <div className='mt-5 text-center'>
              <img className='tennisIcon' src="https://cdn-icons-png.flaticon.com/128/2641/2641497.png" alt="PlayerInfo" />
              <h1 className='text-center font-weight-bold mt-4'>Tournament Info</h1>
            </div>
          </div>
        </div>
        {/* PLAYER INFORMATION */}
        <div className="container">
          <div className="row mt-5">
            {/* OVDE */}
            <div className='col-md-6'> 
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{ tourney[0].name }</td>
                  </tr>
                  <tr>
                    <th>Level</th>
                    <td>
                      <span className='px-2 py-1 rounded-sm text-white' style={{ backgroundColor: `${tourney[0].levelColor}` }}>{ tourney[0].level }</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Surface</th>
                    <td>
                      <span className='px-2 py-1 rounded-sm text-white' style={{ backgroundColor: `${tourney[0].surfaceColor}` }}>{ tourney[0].surface }</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Draw Size</th>
                    <td>{ tourney[0].drawSize }</td>
                  </tr>
                  <tr>
                    <th>Winner</th>
                    <td>
                      <Link to={"/player/" + tourney[0].runnerUp_id} style={{ textDecoration: "none" }}>
                        { tourney[0].winner } ({ tourney[0].winner_loc })
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th>Loser</th>
                    <td>
                      <Link to={"/player/" + tourney[0].winner_id} style={{ textDecoration: "none" }}>
                        { tourney[0].runnerUp }
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th>Score</th>
                    <td>{ tourney[0].score }</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-md-6'>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th>Latest Winners</th>
                    <td>{ winners.map((x) => `${x}, `) }</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default TourneyInfoComponent