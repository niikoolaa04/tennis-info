import { useEffect, useState } from 'react'
import NavComponent from '../Navigation/NavComponent'
import FooterComponent from '../Other/FooterComponent'
import TournamentList from './TournamentList'
import SearchComponent from './SearchComponent'
import AnimationComponent from '../Other/AnimationComponent'
import { getTournaments } from '../../utils/utils'
import './style.css'

function TournamentComponent() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [level, setLevel] = useState('');
  const [surface, setSurface] = useState('');
  const prevPage = () => currPage == 1 ? setCurrPage(currPage) : setCurrPage(currPage - 1);
  const nextPage = () => currPage == 100 ? setCurrPage(currPage) : setCurrPage(currPage + 1);

  useEffect(async() => {
    await getTournaments(currPage, 20, setLoading, setTournaments, level, surface);
  }, [level, surface]);

  useEffect(async() => {
    await getTournaments(currPage, 20, setLoading, setTournaments, level, surface);
  }, []);

  return (
    <div className='bg-darker'>
      <NavComponent active={"tournaments"} />
      <AnimationComponent>
        <div>
          {/* GENERAL INFORMATION */}
          <div className="container">
            <div className="row">
              <div className='mt-5 text-center'>
                <img className='tennisIcon' src="https://cdn-icons-png.flaticon.com/128/419/419952.png" alt="PlayerInfo" />
                <p className='text-center display-5 fw-bold text-light'>Tournaments</p>
                <div className='d-block bg-light rounded mb-0 titleLine' />
              </div>
            </div>
          </div>
          {/* SEARCH FOR TOURNAMENT FORM */}
          <SearchComponent setLoading={setLoading} setTournaments={setTournaments} setLevel={setLevel} setSurface={setSurface} />
          {/* TOURNAMENT LIST TABLE */}
          <div className="dropdown bg-dark mt-5">
          <div className="container">
            <div className="row">
              <div className="mt-5">
                <table className="table table-sm table-hover table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Surface</th>
                      <th scope="col">Level</th>
                      <th scope="col">Top Player</th>
                    </tr>
                  </thead>
                  <tbody> 
                    <TournamentList tournaments={tournaments} loading={loading} setLoading={setLoading} setTournaments={setTournaments} setCurrPage={setCurrPage} currPage={currPage} key={currPage + 1} level={level} />
                  </tbody>
                </table>
              </div>
              <div className='mb-5'>
                <nav>
                  <ul className="pagination">
                    { currPage > 1 ? <li className="page-item mr-2" onClick={(() => setCurrPage(1))}><a className="page-link" href="#">Beggining</a></li> : '' }
                    <li className="page-item" onClick={(() => prevPage())}><a className="page-link" href="#">Previous</a></li>
                    {
                      currPage == 1 ?
                      <>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#" onClick={(() => setCurrPage(2))}>2</a></li>
                        <li className="page-item"><a className="page-link" href="#" onClick={(() => setCurrPage(3))}>3</a></li>
                      </> : 
                      <>
                        <li className="page-item"><a className="page-link" href="#" onClick={(() => setCurrPage(currPage - 1))}>{ currPage - 1 }</a></li>
                        <li className="page-item active"><a className="page-link" href="#">{ currPage }</a></li>
                        <li className="page-item"><a className="page-link" href="#" onClick={(() => setCurrPage(currPage + 1))}>{ currPage + 1 }</a></li>
                      </>
                    }
                    <li className="page-item" onClick={(() => nextPage())}><a className="page-link" href="#">Next</a></li>
                  </ul>
                </nav>
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

export default TournamentComponent