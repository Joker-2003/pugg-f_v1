
import './App.css';
import axios from "axios";
import { Route, Routes } from 'react-router-dom'
import HomePg from './Pages/HomePg';
import OptionPg from './Pages/OptionPg';
import MenuPg from './Pages/MenuPg';
import LeaderboardsPg from './Pages/LeaderboardsPg';
import Game1 from './Pages/Game1';
import NoGuild from './Pages/Errors/NoGuild';
import NoRole from './Pages/Errors/NoRole';
import Error404 from './Pages/Errors/Error404';
import Redirect from './components/Option/Redirect';
import ReferPg from './Pages/ReferPg';
import ValidateRefer from './components/Refer/ValidateRefer';
import InvalidRefer from './Pages/Errors/InvalidRefer';
import Error403 from './Pages/Errors/Error403';
import Area51pg from './Pages/Area51pg';
axios.defaults.withCredentials = true

function App() {
  
  return (
    <>
      {
        <Routes>

          <Route exact path="/" element={<HomePg />} />
          <Route path="/option" element={<OptionPg />} />
          <Route  path="/menu" element={<MenuPg />} />
          <Route  path = "/leaderboards/1" element={<LeaderboardsPg game = {1} />} />
          <Route  path = "/leaderboards/2" element={<LeaderboardsPg game = {2} />} />
          <Route  path = "/leaderboards/3" element={<LeaderboardsPg game = {3} />} />
          <Route  path = "/leaderboards/4" element={<LeaderboardsPg game = {4} />} />
          <Route path= "/game/WackAMole" element={<Game1 />} />
          <Route path = "/login/redirect" element = {<Redirect />} />
          <Route path = "/refer/:code" element = {<ReferPg />} />
          <Route path = "/refer/validate" element = {<ValidateRefer />} />
          <Route path ="/area51" element = {<Area51pg />} />
          <Route path = "/error/notInGuild" element = {<NoGuild />} />
          <Route path = "/error/noRole" element = {<NoRole />} />
          <Route path = "/error/403" element = {<Error403 />} />
          <Route path = "*" element = {<Error404 />} />
          <Route path ="/error/refer" element = {<InvalidRefer />} />
          


          
        </Routes>
      
    }
      </>
  );
}

      export default App;
