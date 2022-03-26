import { useState, useEffect } from 'react'
import NavComponent from '../Navigation/NavComponent'
import FooterComponent from '../Other/FooterComponent'
import 'aos'
import './animateImage.css'
import { getLeaderboard } from '../../utils/utils'

function HomeComponent() {
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState([]);
  const limit = 10;
  
  useEffect(async() => {
    await getLeaderboard(limit, setLoading, setPlayers)
  }, [])

  return (
    <div>
      <NavComponent active={"home"} />
      <div>
        {/* GENERAL INFORMATION */}
        <div className="container">
          <div className="row">
            <div className='mt-5 text-center'>
              <img className='tennisIcon' src="https://cdn-icons-png.flaticon.com/128/502/502142.png" alt="TennisInfo" />
              <h1 className='text-center font-weight-bold mt-4'>Tennis Info</h1>
              <div className='mt-4'>
                <p className='mb-0'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit, quos.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis sit recusandae laborum quod necessitatibus soluta.</p>
              </div>
            </div>
          </div>
        </div>
        {/* TOP 10 PLAYERS SECTION */}
        <div className='pb-3 mt-5' style={{ backgroundColor: "#f0f0f0" }}>
          <div className='container'>
            <div className="row">
              <div className='mt-5'>
                <h3 className='text-center'>Top 10 Players</h3>
                <table className="table table-hover mt-5">
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
                        <td>{ p.fullName }</td>
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
          <div className="row">
            <div className="mt-5">
              <h3 className="text-center">Top Statistics</h3>
              <div class="card-group">
                <div data-aos="fade-right" className="card mt-4 mr-sm-2 mr-md-5">
                  <img src="https://i0.wp.com/shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png?resize=1024%2C683&ssl=1" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Number #1 Player</h5>
                    <p className="card-text">First Last is First Player on ATP List with total of x Points</p>
                    <a href="#" className="btn btn-primary">View Player</a>
                  </div>
                </div>
                <div data-aos="fade-right" className="card mt-4 mr-sm-2 mr-md-5">
                  <img src="https://i0.wp.com/shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png?resize=1024%2C683&ssl=1" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">GOAT</h5>
                    <p className="card-text">First Last is Greatest Player of All Times with x total points!</p>
                    <a href="#" className="btn btn-primary">View Player</a>
                  </div>
                </div>
                <div data-aos="fade-right" className="card mt-4">
                  <img src="https://i0.wp.com/shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png?resize=1024%2C683&ssl=1" className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">Latest Tournament</h5>
                    <p className="card-text">Tournament was latest tournament played, winner of this tournament is Winner</p>
                    <a href="#" className="btn btn-primary">View Tournament</a>
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