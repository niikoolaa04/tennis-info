import { useEffect, useState } from 'react'
import NavComponent from '../Navigation/NavComponent'
import FooterComponent from '../Other/FooterComponent'
import TournamentList from './TournamentList'
import SearchComponent from './SearchComponent'
import { getTournaments } from '../../utils/utils'

function TournamentComponent() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [level, setLevel] = useState('');
  const prevPage = () => currPage == 1 ? setCurrPage(currPage) : setCurrPage(currPage - 1);
  const nextPage = () => currPage == 100 ? setCurrPage(currPage) : setCurrPage(currPage + 1);

  const filterType = async(text) => {
    setLevel(text);
    await getTournaments(currPage, 20, setLoading, setTournaments, level);
  }

  useEffect(async() => {
    await getTournaments(currPage, 20, setLoading, setTournaments, level);
  }, []);

  return (
    <div>
      <NavComponent active={"tournaments"} />
      <div>
        {/* GENERAL INFORMATION */}
        <div className="container">
          <div className="row">
            <div className='mt-5 text-center'>
              <img className='tennisIcon' src="https://cdn-icons-png.flaticon.com/128/419/419952.png" alt="PlayerInfo" />
              <h1 className='text-center font-weight-bold mt-4'>Tournament List</h1>
            </div>
          </div>
        </div>
        {/* SEARCH FOR PLAYER FORM */}
        <SearchComponent loading={loading} setLoading={setLoading} tournaments={tournaments} setTournaments={setTournaments} setCurrPage={setCurrPage} filterType={filterType} />
        {/* PLAYER LIST TABLE */}
        <div class="dropdown">
        <div className="container">
          <div className="row">
            <div className="mt-5">
              <table className="table table-sm table-hover">
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
            <div>
              <nav>
                <ul className="pagination">
                  { currPage > 1 ? <li className="page-item mr-2" onClick={(() => setCurrPage(1))}><a className="page-link" href="#">Beggining</a></li> : '' }
                  <li className="page-item" onClick={(() => prevPage())}><a className="page-link" href="#">Previous</a></li>
                  {
                    currPage == 1 ?
                    <>
                      <li className="page-item active"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
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
      <FooterComponent />
    </div>
  )
}

export default TournamentComponent