import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { findTournament } from '../../utils/utils';
import flags from '../../utils/flags.json';
import FooterComponent from '../Other/FooterComponent'
import NavComponent from '../Navigation/NavComponent'

function TourneyInfoComponent() {
  let { tournamentId } = useParams();
  const [tourney, setTourney] = useState([{}]);
  const [winners, setWinners] = useState(null);
  const [level, setLevel] = useState("");
  const [surface, setSurface] = useState("");

  const bgColor = () => {
    if(tourney[0].level == "Grand Slam") setLevel("#FF0000");
    else if(tourney[0].level == "Masters") setLevel("#4287f5");
    else if(tourney[0].level == "500") setLevel("#4287f5");
    else if(tourney[0].level == "250") setLevel("#82b0fa");
  }

  const surfaceColor = () => {
    if(tourney[0].surface == "Hard") setSurface("#FF0000");
    else if(tourney[0].surface == "Carpet") setSurface("#ff38c3");
    else if(tourney[0].surface == "Clay") setSurface("#fcd200");
    else if(tourney[0].surface == "Grass") setSurface("#00ab14");
  }

  useEffect(async() => {
    await findTournament(tournamentId, setTourney).then(() => {
      console.log(tourney)
      setWinners(tourney.map((x) => `${x.winner} (${x.winner_loc}), `.trim()))
    });
    bgColor();
    surfaceColor();
  }, [])

  return (
    <div>
      <NavComponent active={"tournaments"} />
      <div>
        {/* GENERAL INFORMATION */}
        <div className="container">
          <div className="row">
            <div className='mt-5 text-center'>
              <img className='tennisIcon' src="https://cdn-icons-png.flaticon.com/128/1163/1163109.png" alt="PlayerInfo" />
              <h1 className='text-center font-weight-bold mt-4'>Player Info</h1>
            </div>
          </div>
        </div>
        {/* PLAYER INFORMATION */}
        <div className="container">
          <div className="row mt-5">
            <div className='col-6'>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{ tourney[0].name }</td>
                  </tr>
                  <tr>
                    <th>Level</th>
                    <td>
                      <span className='px-2 py-1 rounded-sm text-white' style={{ backgroundColor: `${level}` }}>{ tourney[0].level }</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Surface</th>
                    <td>
                      <span className='px-2 py-1 rounded-sm text-white' style={{ backgroundColor: `${surface}` }}>{ tourney[0].surface }</span>
                    </td>
                  </tr>
                  <tr>
                    <th>Draw Size</th>
                    <td>{ tourney[0].drawSize }</td>
                  </tr>
                  <tr>
                    <th>Winner</th>
                      <td>{ tourney[0].winner } ({ tourney[0].winner_loc })</td>
                  </tr>
                  <tr>
                    <th>Coach</th>
                    <td>Name Name</td>
                  </tr>
                  <tr>
                    <th>Prize Money</th>
                    <td>$2.000.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-6'>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th>Latest Winners</th>
                    <td>{ winners }</td>
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