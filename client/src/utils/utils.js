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
        id: x.player,
        rank: x.rank,
        fullName: getPlayer.firstName + ' ' + getPlayer.lastName,
        country: getPlayer.countryCode,
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

export const findTournament = async(id, setTourney) => {
  let data;
  await fetch(`${process.env.REACT_APP_SERVER_URL}/api/tournament/` + id, {
    method: 'GET'
  }).then(async(tour) => {
    let res = await tour.json();

    let formatData = res.rows.map((x) => {
      let level = "";
      if(x.level == "B") level = "ATP 250";
      else if(x.level == "A") level = "ATP 500";
      else if(x.level == "M") level = "Masters";
      else if(x.level == "G") level = "Grand Slam";
      else if(x.level == "F") level = "Finals";

      let surface = "";
      if(x.surface == "H") surface = "Hard";
      if(x.surface == "P") surface = "Carpet";
      if(x.surface == "C") surface = "Clay";
      if(x.surface == "G") surface = "Grass";

      let surfaceColor = "";
      if(surface == "Hard") surfaceColor = "#FF0000";
      else if(surface == "Carpet") surfaceColor = "#ff38c3";
      else if(surface == "Clay") surfaceColor = "#fcd200";
      else if(surface == "Grass") surfaceColor = "#00ab14";

      let levelColor = "";
      if(level == "Grand Slam") levelColor = "#FF0000";
      else if(level == "Masters") levelColor = "#4287f5";
      else if(level == "ATP 500") levelColor = "#4287f5";
      else if(level == "ATP 250") levelColor = "#82b0fa";
      else if(level == "Finals") levelColor = "#4c32a8";

      return {
        id: x.id,
        name: x.name,
        level,
        levelColor,
        surface,
        surfaceColor,
        drawSize: x.drawSize,
        score: x.score,
        runnerUp: `${x.runnerUp.name} (${x.runnerUp.country.id})`,
        runnerUp_id: x.runnerUp.id,
        season: x.season,
        winner: x.winner.name,
        winner_id: x.winner.id,
        winner_loc: x.winner.country.code.toUpperCase(),
      };
    });

    return data = formatData;
  });
  return data;
}