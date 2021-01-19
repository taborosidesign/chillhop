import React from 'react'
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const YouTubePlayer = (song) => {
    return (
        <div className="custom-youtube-player">
            <iframe width="100%" height="100%" title="" src="https://www.youtube.com/embed/2S7Vtsdz0RI" frameBorder="0" allowFullScreen></iframe>
                <div className="close">
                <FontAwesomeIcon className="close" size="1x" icon={faTimes} />
                </div>
        </div>
    )
}

export default YouTubePlayer
