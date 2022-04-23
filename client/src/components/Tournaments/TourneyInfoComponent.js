import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { findTournament } from '../../utils/utils';
import FooterComponent from '../Other/FooterComponent'
import NavComponent from '../Navigation/NavComponent'
import AnimationComponent from '../Other/AnimationComponent';

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
      console.log(err)
      navigate("/tournaments");
    });
  }, [])

  return (
    <div className='bg-darker'>
      <NavComponent active={"tournaments"} />
      <AnimationComponent>
        <div>
          {/* GENERAL INFORMATION */}
          <div className="container">
            <div className="row">
              <div className='mt-5 text-center'>
                <img className='tennisIcon' src="https://cdn-icons-png.flaticon.com/128/2641/2641497.png" alt="PlayerInfo" />
                <p className='text-center display-5 fw-bold text-light'>Tournament Info</p>
                <div className='d-block bg-light rounded mb-0' style={{ margin: "20px auto", width: "16rem", height: "2px" }} />
              </div>
            </div>
          </div>
          {/* TOURNAMENT INFORMATION */}
          <div className='bg-dark mt-5'>
            <div className="container">
              <div className="row mt-5">
                <div className='col-md-6 mt-5'> 
                  <table className="table table-hover table-dark">
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
                          <Link className='text-lightaqua' to={"/players/" + tourney[0].winner_id} style={{ textDecoration: "none" }}>
                            { tourney[0].winner } ({ tourney[0].winner_loc })
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <th>Loser</th>
                        <td>
                          <Link className='text-lightaqua' to={"/players/" + tourney[0].runnerUp_id} style={{ textDecoration: "none" }}>
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
                <div className='col-md-6 mt-5'>
                  <table className="table table-hover table-dark">
                    <tbody>
                      <tr>
                        <th>Latest Winners</th>
                        <td>{ winners.join(", ") }</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='mt-2 mb-4'>
                  <Link to="/tournaments">
                    <button className='btn btn-primary'>Return to List</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimationComponent>
      <FooterComponent />
    </div>
  )
}

export default TourneyInfoComponent