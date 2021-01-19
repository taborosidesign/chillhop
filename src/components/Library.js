import React from 'react';
import LibrarySong from './LibrarySong';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faClock } from '@fortawesome/free-solid-svg-icons';

const Library = ({song, songs, setCurrentSong, audioRef, isPlaying, setSongs}) => {
    return (
        <div className="library">
            <div className="library-wrapper">
            <table className="library-table">
                <tbody>
                    <tr className="head">
                        <th>#</th>
                        <th></th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th></th>
                        <th>Album</th>
                        <th></th>
                        <th></th>
                        <th><FontAwesomeIcon className="time" size="1x" icon={faClock} /></th>
                    </tr>
                    {songs.map(song => <LibrarySong setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} id={song.id} key={song.id} setCurrentSong={setCurrentSong} song={song}/>)}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Library;