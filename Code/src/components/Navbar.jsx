import React, { useState } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";

const Favorites = () => {
  const [favorites, setFavorites] = useState([
    { id: 1, title: "Song One", artist: "Artist A" },
    { id: 2, title: "Song Two", artist: "Artist B" }
  ]);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(song => song.id !== id));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">❤️ Favorite Songs</h2>
      <ListGroup>
        {favorites.length === 0 ? (
          <ListGroup.Item>No favorite songs yet.</ListGroup.Item>
        ) : (
          favorites.map((song) => (
            <ListGroup.Item key={song.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{song.title}</strong> - {song.artist}
              </div>
              <Button variant="danger" onClick={() => removeFavorite(song.id)}>Remove</Button>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Container>
  );
};

export default Favorites;
