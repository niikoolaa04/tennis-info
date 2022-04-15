/* const results = [], rankings = [];
fs.createReadStream('atp_rankings_current.csv')
  .pipe(csv())
  .on('data', (data) => {
    rankings.push({
      date: data.ranking_date,
      rank: data.rank,
      player: data.player,
      points: data.points,
    });
  })
  .on('end', async() => {
    await RankingsSchema.insertMany(rankings, function(error, docs) {
      console.log('done')
    });
  }); */

/* fs.createReadStream('newplayes.csv')
  .pipe(csv())
  .on('data', (data) => {
    players.push({
      first_name: data.first_name,
      last_name: data.last_name,
      fullName: data.last_name + " " + data.first_name,
      birth_place: data.birth_place,
      birth_date: data.birth_date,
      residence: data.residence,
      height: data.height,
      weight: data.weight,
      pro: data.turned_pro,
      prize_money: data["career-prize-money"]
    });
  })
  .on('end', async() => {
    players.forEach((x) => {
      PlayerSchema.bulkWrite([
        {
          updateOne: {
            filter: { firstName: x.first_name, lastName: x.last_name },
            update: { 
              residence: x.residence,
              dob: `${x.birth_date}`,
              lob: `${x.birth_place}`,
              height: `${x.height.replace("\"", "").trim()}`,
              weight: `${x.weight.replace("kilos", "kg")}`,
              pro: `${x.pro}`,
              prizeMoney: `${x.prize_money}`,
            }
          }
        },
      ]).then(res => {
       console.log(res.modifiedCount);
      });
    });
  }); */

  /*
  const PlayerSchema = require("./models/Players")
let fs = require("fs");

fs.readFile('./olddata/mplayers.json', (err, data) => {
  if (err) throw err;
  let student = JSON.parse(data);
  student.forEach((x) => {
    PlayerSchema.bulkWrite([
      {
        updateOne: {
          filter: { firstName: x.first_name, lastName: x.last_name },
          update: { 
            image: x.featureImage == null ? 'https://www.komysafety.com/images/banner/no-image.png' : x.featureImage.replace("/action", ""),
          }
        }
      },
    ]).then(res => {
      console.log(res.modifiedCount);
    });
  })
});
  */

  /* PlayerSchema.updateMany({}, { $rename: { country: 'countryCode' } }, { multi: true }, function(err, blocks) {
    if(err) { throw err; }
    console.log('done!');
  }); */