import React from 'react'
import NavComponent from '../Navigation/NavComponent'
import FooterComponent from '../Other/FooterComponent'
import PlayerList from './PlayerList'

function PlayersComponent() {
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
        <div className="container">
          <div className="row">
            <div className="mt-4 d-flex justify-content-center">
              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search for Player" aria-label="Search" />
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
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
                  <PlayerList />
                </tbody>
              </table>
            </div>
            <div>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                  <li className="page-item"><a className="page-link" href="#">1</a></li>
                  <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li>
                  <li className="page-item"><a className="page-link" href="#">Next</a></li>
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