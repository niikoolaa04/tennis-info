import { useState } from 'react'
import NavComponent from '../Navigation/NavComponent'
import FooterComponent from '../Other/FooterComponent'
import PlayerList from './PlayerList'
import SearchComponent from './SearchComponent'

function PlayersComponent() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const prevPage = () => currPage == 1 ? setCurrPage(currPage) : setCurrPage(currPage - 1);
  const nextPage = () => currPage == 100 ? setCurrPage(currPage) : setCurrPage(currPage + 1);

  return (
    <div>
      <NavComponent active={"players"} />
      <div>
        {/* GENERAL INFORMATION */}
        <div className="container">
          <div className="row">
            <div className='mt-5 text-center'>
              <img className='tennisIcon' src="https://cdn-icons-png.flaticon.com/128/2317/2317989.png" alt="PlayerInfo" />
              <h1 className='text-center font-weight-bold mt-4'>Players List</h1>
            </div>
          </div>
        </div>
        {/* SEARCH FOR PLAYER FORM */}
        <SearchComponent loading={loading} setLoading={setLoading} players={players} setPlayers={setPlayers} setCurrPage={setCurrPage} />
        {/* PLAYER LIST TABLE */}
        <div className="container">
          <div className="row">
            <div className="mt-5">
              <table className="table table-sm table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Country</th>
                    <th scope="col">Points</th>
                  </tr>
                </thead>
                <tbody> 
                  <PlayerList players={players} loading={loading} setLoading={setLoading} setPlayers={setPlayers} setCurrPage={setCurrPage} currPage={currPage} key={currPage + 1} />
                </tbody>
              </table>
            </div>
            <div>
              <nav aria-label="Page navigation example">
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
      <FooterComponent />
    </div>
  )
}

export default PlayersComponent