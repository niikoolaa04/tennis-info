const getPlayerFromId = async(id) => {
  let pData = {};
  await fetch('http://localhost:3009/api/players/' + id, {
    method: 'GET'    
  }).then(async(data) => {
    let player = await data.json();
    pData = player;
  });

  return pData.length > 0 ? pData[0] : [];
}

module.exports = {
  getPlayerFromId,
}