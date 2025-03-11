import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Songs from "./pages/Songs";
import Playlist from "./pages/Playlist";
import Favorites from "./pages/Favorites";
import { Container, Form, Button, ListGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [playlists, setPlaylists] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const [songs, setSongs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentSong, setCurrentSong] = useState(null);
    const audioRef = useRef(null);

    useEffect(() => {
        fetch("http://localhost:3000/songs") // Adjust URL if needed
            .then((response) => response.json())
            .then((data) => setSongs(data))
            .catch((error) => console.error("Error fetching songs:", error));
    }, []);

    const addPlaylist = (name) => {
        if (name.trim() === "") return;
        const newPlaylist = { id: Date.now(), name, songs: [] };
        setPlaylists([...playlists, newPlaylist]);
    };

    // Filter songs based on search
    const filteredSongs = songs.filter((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Play the selected song
    const playSong = (song) => {
        setCurrentSong(song);
        if (audioRef.current) {
            audioRef.current.src = song.url;  // Assuming songs have a `url` field
            audioRef.current.play();
        }
    };

    return (
        <Router>
            <div className="d-flex flex-column min-vh-100 w-100">
                <Container fluid className="text-center p-4">
                    <h2 className="mb-4">🎵 Create a Playlist</h2>

                    <Form className="d-flex gap-2 mb-3 justify-content-center">
                        <Form.Control
                            type="text"
                            placeholder="Enter playlist name"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            className="w-50"
                        />
                        <Button variant="primary" onClick={() => { addPlaylist(playlistName); setPlaylistName(""); }}>
                            Create
                        </Button>
                    </Form>

                    <h3 className="mb-3">Your Playlists</h3>
                    <ListGroup className="mb-4">
                        {playlists.length === 0 ? <p className="text-muted">No playlists created yet.</p> :
                            playlists.map((playlist) => (
                                <ListGroup.Item key={playlist.id}>{playlist.name}</ListGroup.Item>
                            ))
                        }
                    </ListGroup>

                    {/* 🔍 Search Bar */}
                    <Form className="d-flex gap-2 mb-3 justify-content-center">
                        <Form.Control
                            type="text"
                            placeholder="Search songs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-50"
                        />
                    </Form>

                    {/* 🎵 Songs List */}
                    <div className="text-start mx-auto w-50">
                        {filteredSongs.length > 0 ? (
                            <ListGroup>
                                {filteredSongs.map((song) => (
                                    <ListGroup.Item key={song.id} className="d-flex justify-content-between"
                                        onClick={() => playSong(song)}
                                        style={{ cursor: "pointer" }}>
                                        🎶 {song.title} - {song.artist}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p className="text-muted text-center">No songs found.</p>
                        )}
                    </div>

                    {/* 🎵 Audio Player */}
                    {currentSong && (
                        <div className="mt-4">
                            <p>Now Playing: <strong>{currentSong.title} - {currentSong.artist}</strong></p>
                            <audio ref={audioRef} controls className="w-50">
                                <source src={currentSong.url} type="audio/mp3" />
                                Your browser does not support the audio tag.
                            </audio>
                        </div>
                    )}

                    {/* Routes */}
                    <Routes>
                        <Route path="/" element={<Songs playlists={playlists} setPlaylists={setPlaylists} />} />
                        <Route path="/playlist" element={<Playlist playlists={playlists} />} />
                        <Route path="/favorites" element={<Favorites />} />
                    </Routes>
                </Container>
            </div>
        </Router>
    );
}

export default App;
