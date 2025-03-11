import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Button, Form } from "react-bootstrap";

const Player = ({ url }) => {
    const [playing, setPlaying] = useState(false);
    const [played, setPlayed] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const playerRef = useRef(null);

    const togglePlay = () => setPlaying(!playing);

    const handleProgress = (progress) => {
        setPlayed(progress.played * 100);
    };

    const handleSeek = (e) => {
        const seekTo = parseFloat(e.target.value) / 100;
        playerRef.current.seekTo(seekTo);
    };

    return (
        <div className="text-center p-3 border rounded bg-light">
            <ReactPlayer
                ref={playerRef}
                url={url}
                playing={playing}
                volume={volume}
                onProgress={handleProgress}
                width="100%"
                height="50px"
            />

            {/* Play/Pause Button */}
            <Button variant={playing ? "danger" : "success"} onClick={togglePlay} className="m-2">
                {playing ? "Pause" : "Play"}
            </Button>

            {/* Seek Bar */}
            <Form.Range value={played} onChange={handleSeek} className="mb-2" />

            {/* Volume Control */}
            <Form.Label>Volume</Form.Label>
            <Form.Range min="0" max="1" step="0.1" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} />
        </div>
    );
};

export default Player;
