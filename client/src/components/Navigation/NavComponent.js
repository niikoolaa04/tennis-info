import React from 'react'
import { Link } from 'react-router-dom';

function NavComponent() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#f0f0f0" }}>
        <div className='container'>
            <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Players</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Tournaments</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Leaderboards</a>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <div class="input-group mr-sm-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">Player</span>
                  </div>
                  <input type="text" class="form-control" placeholder="Search for Player" aria-label="Player" aria-describedby="basic-addon1" />
                </div>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
  )
}

export default NavComponent