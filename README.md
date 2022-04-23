# Tennis Info

Tennis-Info is Web App which gives you ability to view list of ATP Tournaments, Players, get info on Player/Tourney and more stuff.

Website is built with React, Express, Bootstrap & data is saved in MongoDB (Mongoose).

✨ **Live Demo:** https://celebrated-lily-956265.netlify.app/

## Setup of Backend & Frontend
### Server Installation
1. Run `npm install` command in server directory
2. Make `.env` file in server directory and fill as so:
2.1 `SERVER_MONGO_URL=<your mongodb url>`
2.2 `SERVER_CLIENT_URL=<URL of your frontend/client>`
2.3 `PORT=<Whatever Port you want>`

### Client Installation
1. Run `npm install` command in client directory
2. Make `.env` file in client directory and fill as so:
2.1 `REACT_APP_SERVER_URL=<URL of your backend/server>`

## Other Information (Credits & Info)
 - Most of the player's data have been obtained from JeffSackmann's GitHub Repository: https://github.com/JeffSackmann/tennis_atp
 - Some of Tournament's data have been obtained from UltimateTennisStatistics Website - https://www.ultimatetennisstatistics.com/
 - Only missing thing is Mongo Database which contains list of Players.

## Useful Links
- React: https://reactjs.org/
- Bootstrap: https://getbootstrap.com/
- Express: https://expressjs.com/
- Framer Motion (Transitions - Animations): https://www.framer.com/motion/