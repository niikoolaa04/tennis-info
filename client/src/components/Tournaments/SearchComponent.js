import { useState } from 'react'

function SearchComponent({ setTournaments, setLevel, setSurface }) {
  const [search, setSearch] = useState('');
  const handleSearch = (e) => setSearch(e.target.value);

  const searchTournament = async(e) => {
    e.preventDefault();
    if(search == '') return setTournaments([]);
    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/tournaments/search`, {
      method: 'GET',
      headers: {
        search,
      }
    }).then(async(data) => {
      let res = await data.json();
      setTournaments(res)
    });
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="mt-4 d-flex justify-content-center">
            <form className="form-inline my-2 my-lg-0" onSubmit={(async(e) => await searchTournament(e))}>
              <input className="form-control mr-sm-2" type="search" placeholder="Search Tournament" aria-label="Search" onChange={((e) => handleSearch(e))} />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(async(e) => await searchTournament(e))}>Search</button>
            </form>
          </div>
        </div>
        <div className="row">
          <div className='d-flex justify-content-center mt-2 mt-md-4'>
            <div className='ml-2'>
              <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                Level Filter
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#" onClick={(() => setLevel(""))}>None</a>
                <a className="dropdown-item" href="#" onClick={(() => setLevel("B"))}>ATP 250</a>
                <a className="dropdown-item" href="#" onClick={(() => setLevel("A"))}>ATP 500</a>
                <a className="dropdown-item" href="#" onClick={(() => setLevel("M"))}>Masters (ATP 1000)</a>
                <a className="dropdown-item" href="#" onClick={(() => setLevel("G"))}>Grand Slam</a>
              </div>
            </div>
            <div className='ml-2'>
              <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                Surface Filter
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a className="dropdown-item" href="#" onClick={(() => setSurface(""))}>None</a>
                <a className="dropdown-item" href="#" onClick={(() => setSurface("H"))}>Hard</a>
                <a className="dropdown-item" href="#" onClick={(() => setSurface("G"))}>Grass</a>
                <a className="dropdown-item" href="#" onClick={(() => setSurface("C"))}>Clay</a>
                <a className="dropdown-item" href="#" onClick={(() => setSurface("P"))}>Carpet</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchComponent