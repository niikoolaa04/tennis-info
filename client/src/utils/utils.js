export const getPlayerFromId = async(id) => {
  let pData = {};
  await fetch(`${process.env.REACT_APP_SERVER_URL}/api/players/` + id, {
    method: 'GET'    
  }).then(async(data) => {
    let player = await data.json();
    pData = player;
  });

  return pData.length > 0 ? pData[0] : [];
}

export const getLeaderboard = async(limit, setLoading, setPlayers) => {
  setLoading(true);
  await fetch(`${process.env.REACT_APP_SERVER_URL}/api/leaderboard`, {
    method: "GET",
    headers: {
      limit
    }
  }).then(async(data) => {
    let res = await data.json();
    res = res.slice(res.length-20, limit);
    let result = res.map(async(x) => {
      let getPlayer = await getPlayerFromId(parseInt(x.player));
      let obj = {
        rank: x.rank,
        fullName: getPlayer.firstName + ' ' + getPlayer.lastName,
        country: getPlayer.country,
        points: x.points
      }
      return obj;
    });


    setPlayers(await Promise.all(result));
    setLoading(true);
  })
}

export const getTournaments = async(page, rows, setLoading, setTournaments, level = "") => {
  let data;
  await fetch(`${process.env.REACT_APP_SERVER_URL}/api/tournaments`, {
    method: 'GET',
    headers: {
      page,
      rows,
      level,
    }
  }).then(async(tour) => {
    let res = await tour.json();

    let formatData = res.rows.map((x) => {
      let level = [];
      if(x.levels[0] == "G") level.push("Grand Slam");
      if(x.levels[0] == "M" || x.levels[1] == "M") level.push("Masters");
      if(x.levels[0] == "A" || x.levels[1] == "A") level.push("ATP 500");
      if(x.levels[0] == "B" || x.levels[1] == "B") level.push("ATP 250");
      if(x.levels[0] == "O" || x.levels[1] == "O") level.push("Olympics");
      if(x.levels[0] == "F" || x.levels[1] == "F") level.push("Finals");
      if(x.levels[0] == "L" || x.levels[1] == "L") level.push("Finals");

      let surface = [];
      if(x.surfaces[0] == "H" || x.surfaces[1] == "H") surface.push("Hard");
      if(x.surfaces[0] == "G" || x.surfaces[1] == "G") surface.push("Grass");
      if(x.surfaces[0] == "P" || x.surfaces[1] == "P") surface.push("Carpet");
      if(x.surfaces[0] == "C" || x.surfaces[1] == "C") surface.push("Clay");

      return {
        id: x.id,
        name: x.name,
        levels: level.join(", ").trim(),
        surfaces: surface.join(", ").trim(),
        topPlayers: x.topPlayers,
        playerCount: x.playerCount,
        eventCount: x.eventCount,
      };
    });
    data = formatData
    setTournaments(data);
  });
  return data;
}

export const findTournament = async(id) => {
  await fetch(`${process.env.REACT_APP_SERVER_URL}/api/tournaments/${id}`, {
    method: 'GET'
  }).then(async(tour) => {
    let res = await tour.json();

    return res;
  });
}