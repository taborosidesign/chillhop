import React from 'react';
import Header from './Header';

const Songs = ({currentSong}) => {
    return(
        <div className="song-container">
            <Header />
            <img src={currentSong.cover} alt={currentSong.name}></img>
            <h2>{currentSong.name}</h2>
            <h3>By {currentSong.artist}</h3>
            <h4>Album: 2020 - 10 songs, 34 min</h4>
            <audio>{currentSong.audio}</audio>
        </div>
    )
}

export default Songs;