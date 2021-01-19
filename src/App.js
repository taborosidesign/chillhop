import React, { useState } from "react";

//Import Data
import data from "./data";

//Adding Main Style
import "./styles/app.css";

//Adding Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import YouTubePlayer from "./components/YouTubePlayer/index";

function App() {
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong}/>
      <Player setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} currentSong={currentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
      <Library songs={songs} setCurrentSong={setCurrentSong} setSongs={setSongs}/>
      <YouTubePlayer songs={songs}/>
    </div>
  );
}

export default App;
