import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeComponent from "./components/Home/HomeComponent";
import PlayersComponent from "./components/Players/PlayersComponent";
import PlayerInfoComponent from "./components/Players/PlayerInfoComponent";
import TournamentComponent from "./components/Tournaments/TournamentComponent";
import TourneyInfoComponent from "./components/Tournaments/TourneyInfoComponent";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/players" element={<PlayersComponent />} />
        <Route path="/tournaments" element={<TournamentComponent />} />
        <Route path="/player/:playerId" element={<PlayerInfoComponent />} />
        <Route path="/tournament/:tournamentId" element={<TourneyInfoComponent />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
