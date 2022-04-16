import { useState, useEffect } from 'react'
import NavComponent from '../Navigation/NavComponent'
import FooterComponent from '../Other/FooterComponent'
import 'aos'
import './animateImage.css'
import { getLeaderboard, getLevel, getSurface } from '../../utils/utils'
import { Link } from 'react-router-dom'

function HomeComponent() {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const [first, setFirst] = useState([{ fullName: '' }, { fullName: '' }]);
  const [latestTourney, setLatestTourney] = useState({});
  const [best, setBest] = useState({});
  const limit = 10;
  
  useEffect(async() => {
    await getLeaderboard(limit, setLoading, setPlayers, setFirst);
    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/tournament/latest`, {
      method: "GET",
    }).then(async(res) => {
      let resp = await res.json();

      setLatestTourney({
        id: resp.rows[0].id,
        name: resp.rows[0].name,
        level: getLevel(resp.rows[0].level),
        surface: getSurface(resp.rows[0].surface),
        favorite_one: `${resp.rows[0].favorite1.name} (${resp.rows[0].favorite1.country.id})`,
        favorite_two: `${resp.rows[0].favorite2.name} (${resp.rows[0].favorite2.country.id})`,
        completed: resp.rows[0].completed,
        player_count: resp.rows[0].playerCount
      });
    });
    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/players/goat`, {
      method: "GET",
    }).then(async(res) => {
      let resp = await res.json();

      setBest({
        id: resp.rows[0].playerId,
        name: resp.rows[0].name,
        country: `${resp.rows[0].country.id}`,
        total_points: `${resp.rows[0].totalPoints}`,
        grand_slams: `${resp.rows[0].grandSlams}`,
        masters: `${resp.rows[0].masters}`,
        titles: `${resp.rows[0].titles}`,
        won_lost: `${resp.rows[0].wonLost}`,
        won_percent: `${resp.rows[0].wonPct}`,
      });
    });
  }, [])

  return (
    <div className='bg-darker'>
      <NavComponent active={"home"} />
      <div className='bg-darker'>
        {/* GENERAL INFORMATION */}
        <div className="container">
          <div className="row">
            <div className='mt-5 text-center pt-5'>
              <img className='tennisIcon' src="https://cdn-icons-png.flaticon.com/128/502/502142.png" alt="TennisInfo" />
              <h1 className='text-center text-light font-weight-bold mt-4'>Tennis Info</h1>
              <div className='mt-4'>
                <p className='mb-0 text-light'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quos.</p>
                <p className='text-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sit recusandae laborum quod necessitatibus soluta.</p>
              </div>
            </div>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#212529" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        {/* TOP 10 PLAYERS SECTION */}
        <div className='pb-5 bg-dark'>
          <div className='container'>
            <div className="row">
              <div className='mt-3'>
                <div>
                  <p className='text-center display-5 fw-bold text-light'>Top 10 Players</p>
                  <div className='d-block bg-light rounded' style={{ margin: "20px auto", width: "16rem", height: "2px" }} />
                </div>
                <table className="table table-hover mt-5 table-dark">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Country</th>
                      <th scope="col">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p, i) => (
                      <tr>
                        <th scope="row">{ p.rank }</th>
                        <td>
                          <Link to={"/players/" + p.id} className="text-lightaqua" style={{ textDecoration: "none" }}>
                            { p.fullName }
                          </Link>
                        </td>
                        <td>{ p.country }</td>
                        <td>{ p.points }</td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="container my-2">
            <a href="/players" className="btn btn-primary">View Leaderboard</a>
          </div>
        </div>
        {/* TOP STATISTICS */}
        <div className='container'>
          <div className="row my-5">
            <div>
              <h3 className="text-center display-5 fw-bold text-light">Top Statistics</h3>
              <div className='d-block bg-light rounded' style={{ margin: "20px auto", width: "16rem", height: "2px" }} />
              <div class="card-group">
                <div data-aos="fade-right" className="card bg-carddark rounded-sm mt-4 mr-sm-2 mr-md-5 shadow-lg">
                  <img src="https://i0.wp.com/shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png?resize=1024%2C683&ssl=1" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-white">Number #1 Player</h5>
                    <p className="card-text text-light">First Player on ATP List is <b>{first[0].fullName}</b> with total of <b>{first[0].points}</b> Points.
                    <br />Runner up is <b>{first[1].fullName}</b> with total of <b>{first[1].points}</b> Points.</p>
                    <Link to={"/players/" + first[0].id} style={{ textDecoration: "none" }}>
                      <a className="btn btn-primary">View Player</a>
                    </Link>
                  </div>
                </div>
                <div data-aos="fade-right" className="card bg-carddark rounded-sm mt-4 mr-sm-2 mr-md-5 shadow-lg">
                  <img src="https://i0.wp.com/shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png?resize=1024%2C683&ssl=1" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title text-white">GOAT</h5>
                    <p className="card-text text-light"><b>{best.name} ({best.country})</b> is the GOAT with total of <b>{best.total_points}</b> points and <b>{best.titles}</b> Titles of which <b>{best.grand_slams}</b> are <u>Grand Slams</u> & <b>{best.masters}</b> are <u>Masters</u>.
                    <br/><b>Won-Lost:</b> {best.won_lost} ({best.won_percent}).</p>
                    <Link to={"/players/" + best.id} style={{ textDecoration: "none" }}>
                      <a className="btn btn-primary">View Player</a>
                    </Link>
                  </div>
                </div>
                <div data-aos="fade-right" className="card bg-carddark rounded-sm mt-4 shadow-lg">
                  <img src="https://i0.wp.com/shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png?resize=1024%2C683&ssl=1" className="card-img-top" alt="..." />
                  <div className="card-body"> 
                    <h5 className="card-title text-white">Latest Tournament</h5>
                    <p className="card-text text-light">Latest tournament is <b>{latestTourney.name}</b> which is of Level <b>{latestTourney.level}</b>.<br />First Favorite of Tournament is <b>{latestTourney.favorite_one}</b> & is played on <b>{latestTourney.surface}</b>.</p>
                    <Link to={"/tournaments/" + latestTourney.id} style={{ textDecoration: "none" }}>
                      <a className="btn btn-primary">View Tournament</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </div>
  )
}

export default HomeComponent