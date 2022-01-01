import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';
import Homepage from './components/Homepage';
import CreateRoomPage from './components/CreateRoomPage';
import Room from './components/Room';
import "./App.css";
import RoomJoinPage from './components/RoomJoinPage';

function App() {

  let votesToSkip = 2;
  let guestCanPause = true;

  return (
    <Router>
      <div className="center">
      <Routes>
        <Route path="/" exact element={<Homepage/>} />
        <Route path="/create" element={<CreateRoomPage 
            votesToSkip={votesToSkip}
            guestCanPause={guestCanPause}/>} />
        <Route path="/room/:roomcode" element={<Room/>} />
        <Route path="/join" element={<RoomJoinPage/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
