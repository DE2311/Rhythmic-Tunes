import React, { useState } from "react";
import { Container, Form, Button, ListGroup } from "react-bootstrap";

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);
    const [playlistName, setPlaylistName] = useState("");

    // ✅ Function to add a new playlist
    const addPlaylist = () => {
        if (playlistName.trim() === "") return; // Prevent empty names
        const newPlaylist = { id: Date.now(), name: playlistName, songs: [] };
        setPlaylists([...playlists, newPlaylist]);
        setPlaylistName(""); // Clear input after adding
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">🎶 Your Playlists</h2>

            {/* ✅ Input for adding a playlist */}
            <Form className="mb-3">
                <Form.Group>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter playlist name" 
                        value={playlistName} 
                        onChange={(e) => setPlaylistName(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" className="mt-2" onClick={addPlaylist}>
                    Create Playlist
                </Button>
            </Form>

            {/* ✅ List of Playlists */}
            <ListGroup>
                {playlists.length === 0 ? (
                    <ListGroup.Item>No playlists created yet.</ListGroup.Item>
                ) : (
                    playlists.map((playlist) => (
                        <ListGroup.Item key={playlist.id}>{playlist.name}</ListGroup.Item>
                    ))
                )}
            </ListGroup>
        </Container>
    );
};

export default Playlist;
