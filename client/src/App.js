import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeComponent from "./components/Home/HomeComponent";
import PlayersComponent from "./components/Players/PlayersComponent";
import InfoComponent from "./components/Players/InfoComponent";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/players" element={<PlayersComponent />} />
        <Route path="/player/:playerId" element={<InfoComponent />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
