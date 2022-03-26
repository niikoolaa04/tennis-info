import { useState, useRef } from 'react'
import { getPlayerFromId } from '../../utils/utils'

function SearchComponent({ players, setPlayers, loading, setLoading }) {
  const [search, setSearch] = useState('');
  const handleSearch = (e) => setSearch(e.target.value);

  const searchPlayer = async(e) => {
    e.preventDefault();
    setLoading(true);
    if(search == '') return setPlayers([]);
    await fetch(`http://localhost:3009/api/players/search`, {
      method: 'GET',
      headers: {
        search,
      }
    }).then(async(data) => {
      let res = await data.json();
      setPlayers(res)
      setLoading(false)
    });
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="mt-4 d-flex justify-content-center">
            <form class="form-inline my-2 my-lg-0" onSubmit={(async(e) => await searchPlayer(e))}>
              <input class="form-control mr-sm-2" type="search" placeholder="Search for Player" aria-label="Search" onChange={((e) => handleSearch(e))} />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={(async(e) => await searchPlayer(e))}>Search</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchComponent