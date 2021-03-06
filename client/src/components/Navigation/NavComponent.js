import React from 'react'
import { Link } from 'react-router-dom';

function NavComponent({ active }) {
  const isActive = (page) => {
    if(active == page) return " active";
    else return "";
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className='container'>
          <Link to={"/"} className="navbar-brand titleIcon ">
            <img className='align-middle' src="https://cdn-icons-png.flaticon.com/32/802/802289.png" alt="" />
            <span className='align-middle pl-3'>Tennis Info&trade;</span>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/"} className={"nav-link" + isActive("home")}>
                  <i className="fa-solid fa-house fa-sm pr-2" />Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/players"} className={"nav-link" + isActive("players")}>
                  <i className="fa-solid fa-shirt fa-sm pr-2" />Players
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/tournaments"} className={"nav-link" + isActive("tournaments")}>
                  <i className="fa-solid fa-building-columns fa-sm pr-2" />Tournaments
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/"} className={"nav-link" + isActive("soon")}>
                  <i className="fa-solid fa-question fa-sm pr-2" />Soon
                </Link>
              </li>
            </ul>
            {/* <form className="form-inline my-2 my-lg-0">
              <div className="input-group mr-sm-2">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">Player</span>
                </div>
                <input type="text" className="form-control" placeholder="Search for Player" aria-label="Player" aria-describedby="basic-addon1" />
              </div>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form> */}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavComponent