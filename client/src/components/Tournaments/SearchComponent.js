import { useState, useRef } from 'react'

function SearchComponent({ tournaments, setTournaments, loading, setLoading, filterType }) {
  const [search, setSearch] = useState('');
  const handleSearch = (e) => setSearch(e.target.value);

  const searchTournament = async(e) => {
    e.preventDefault();
    setLoading(true);
    if(search == '') return setTournaments([]);
    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/tournaments/search`, {
      method: 'GET',
      headers: {
        search,
      }
    }).then(async(data) => {
      let res = await data.json();
      setTournaments(res)
      setLoading(false)
    });
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="mt-4 d-flex justify-content-center">
            <form class="form-inline my-2 my-lg-0" onSubmit={(async(e) => await searchTournament(e))}>
              <input class="form-control mr-sm-2" type="search" placeholder="Search Tournament" aria-label="Search" onChange={((e) => handleSearch(e))} />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(async(e) => await searchTournament(e))}>Search</button>
              <div className='ml-2'>
                <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                  Filter Search
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#" onClick={(async() => await filterType("B"))}>ATP 250</a>
                  <a class="dropdown-item" href="#" onClick={(async() => await filterType("A"))}>ATP 500</a>
                  <a class="dropdown-item" href="#" onClick={(async() => await filterType("M"))}>Masters</a>
                  <a class="dropdown-item" href="#" onClick={(async() => await filterType("G"))}>Grand Slam</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchComponent