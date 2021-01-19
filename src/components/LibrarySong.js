import React from 'react';
import {playAudio} from './Util';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

const LibrarySong = ({song, songs, setCurrentSong, id, setSongs, audioRef, isPlaying}) => {
    const songsSelectHandler = () => {
        const selectedSong = songs.filter((state) => state.id ===id)
        setCurrentSong(selectedSong[0]);

    //Set Active in library
    const newSongs = songs.map((song) => {
        if (song.id === id) {
          return {
            ...song,
            active: true,
          };
        } else {
          return {
            ...song,
            active: false,
          };
        }
      });
      setSongs(newSongs);
      //check if the song is playing
      playAudio(isPlaying,audioRef);    
    }

    return(
            <tr className={`${song.active ? 'selected-bg' : ""}`} onClick={songsSelectHandler}>
                <td style={{width:"10px"}}>{song.number}</td>
                <td style={{width:"10px"}}><img className="img" src={song.cover} alt={song.name}></img></td>
                <td className={`${song.active ? 'selected-color' : 'non-selected-color'}`}>{song.name}</td>
                <td className={`${song.active ? 'selected-color' : 'non-selected-color'}`}>{song.artist}</td>
                <td className={`${song.video ? 'video' : ''}`}></td>
                <td className={`${song.active ? 'selected-color' : 'non-selected-color'}`}>{song.album}</td>
                <td><FontAwesomeIcon className="spotify" size="1x" icon={faSpotify} /></td>
                <td><FontAwesomeIcon className="dot" size="1x" icon={faEllipsisH} /></td>
                <td className={`${song.active ? 'selected-color' : 'non-selected-color'}`}>{song.duration}</td>
            </tr>
    )
}

export default LibrarySong;