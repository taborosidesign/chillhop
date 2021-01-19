import React, { useRef, useState, useEffect }from 'react';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faStepBackward, faStepForward, faPause } from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle} from "@fortawesome/free-regular-svg-icons";
import {playAudio} from './Util';

const Player = ({currentSong, isPlaying, setIsPlaying, songs, setCurrentSong, setSongs}) => {
    //Ref
    const audioRef = useRef(null);
    
    //Event Handlers
    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
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
    },[currentSong])

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) isInitialMount.current = false;
        else {
          audioRef.current.play();
          setIsPlaying(true);
        }
      }, [currentSong, setIsPlaying]);

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        
        //Calculate Percentage
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animation = Math.round((roundedCurrent / roundedDuration) * 100);
        
        SetSongInfo({...songInfo, currentTime: current, duration, animationPercentage:animation});
    };

    //Format Time
    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    //Drag Handler
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        SetSongInfo({...songInfo, currentTime: e.target.value});
    };

    //State
    const [songInfo,SetSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });

    // SkipTracks
    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-forward'){
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        }
        if(direction === 'skip-back'){
            if((currentIndex - 1) % songs.length === - 1) {
                setCurrentSong(songs[songs.length - 1]);
                playAudio(isPlaying,audioRef);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
        playAudio(isPlaying,audioRef);
    };

    // Add The styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    };
    return(
    <div className="player">
        <div className="play-control">
            <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="1x" icon={faStepBackward} />
            <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlayCircle} />
            <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size="1x" icon={faStepForward} />
        </div>
        <div className="time-control">
            <p>{songInfo.duration ? getTime(songInfo.currentTime) : "0:00"}</p>
            <div className="track">
            <input min={0} max={songInfo.duration} value={songInfo.currentTime} onChange={dragHandler}type="range" />
            <div style={trackAnim} className="animate-track"></div>
            </div>
            <p>{getTime(songInfo.duration)}</p>
        </div>
        <div className="play-control">
        </div>
        <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
    )
}

export default Player;