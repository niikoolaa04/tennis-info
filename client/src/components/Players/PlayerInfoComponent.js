import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import NavComponent from '../Navigation/NavComponent'
import FooterComponent from '../Other/FooterComponent'

function PlayerInfoComponent() {
  const { playerId } = useParams();
  const [player, setPlayer] = useState({});
  const [flag, setFlag] = useState("");
  const navigate = useNavigate();

  useEffect(async() => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/players/` + playerId).then(async(res) => {
      let data = await res.json();
      if(!data[0]) return navigate("/players")
      if(data[0]) setPlayer(data[0]);
      if(data[0]) setFlag(`https://www.ultimatetennisstatistics.com/images/flags/${data[0].countryCode.slice(0, 2).toLowerCase()}.png`);
    }).catch((err) => {
      navigate("/players")
    })
  }, []);

  return (
    <div>
      <NavComponent active={"players"} />
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
            <div className='col-md-5'>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{ player.firstName + " " + player.lastName}</td>
                  </tr>
                  <tr>
                    <th>Date of Birth</th>
                    <td>{ player.dob }</td>
                  </tr>
                  <tr>
                    <th>Location of Birth</th>
                    <td>{ player.lob }</td>
                  </tr>
                  <tr>
                    <th>Location of Residence</th>
                    <td>{ player.residence }</td>
                  </tr>
                  <tr>
                    <th>Height</th>
                    <td>{ player.height }</td>
                  </tr>
                  <tr>
                    <th>Weight</th>
                    <td>{ player.weight }</td>
                  </tr>
                  <tr>
                    <th>Plays</th>
                    <td>{ player.hand == "R" ? "Right" : "Left" }</td>
                  </tr>
                  <tr>
                    <th>Prize Money</th>
                    <td>${ player.prizeMoney }</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-md-4'>
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th>Turned Pro</th>
                    <td>{ player.pro }</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-md-3 text-center'>
              <div style={{ backgroundColor: "rgba(0,0,0,.1)" }} className="pt-4 pb-2 rounded-sm">
                <img src={ player.image } alt={player.firstName + " " + player.lastName} />
                <p className='p-0 pt-2 m-0'>{ player.firstName + " " + player.lastName }</p>
                <span className='align-middle'>
                  <img src={flag} className="mr-1" alt={player.countryCode} />
                </span>
              </div>
            </div>
          </div>
          <div className='my-2'>
            <a href="/players" className="btn btn-primary">Return to List</a>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default PlayerInfoComponent