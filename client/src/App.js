import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import HomeComponent from "./components/Home/HomeComponent";
import PlayersComponent from "./components/Players/PlayersComponent";
import PlayerInfoComponent from "./components/Players/PlayerInfoComponent";
import TournamentComponent from "./components/Tournaments/TournamentComponent";
import TourneyInfoComponent from "./components/Tournaments/TourneyInfoComponent";
import NotFoundComponent from "./components/Other/NotFoundComponent";
import { AnimatePresence } from 'framer-motion';
import './index.css';
import './scss/bootstrap.css'

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/players" element={<PlayersComponent />} />
          <Route path="/tournaments" element={<TournamentComponent />} />
          <Route path="/players/:playerId" element={<PlayerInfoComponent />} />
          <Route path="/tournaments/:tournamentId" element={<TourneyInfoComponent />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
