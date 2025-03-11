import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Player from "../components/Player";

const Songs = () => {
    const songs = [
        { 
            id: 1, 
            title: "Song One", 
            artist: "Artist A", 
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
            image: "https://picsum.photos/300/200?random=1" 
        },
        { 
            id: 2, 
            title: "Song Two", 
            artist: "Artist B", 
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
            image: "https://picsum.photos/300/200?random=2"
        },
        { 
            id: 3, 
            title: "Song Three", 
            artist: "Artist C", 
            url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
            image: "https://picsum.photos/300/200?random=3"
        }
    ];

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">🎵 All Songs</h2>
            <Row>
                {songs.map((song) => (
                    <Col md={4} key={song.id}>
                        <Card className="mb-3 shadow-sm bg-dark text-white">
                            <Card.Img variant="top" src={song.image} />
                            <Card.Body>
                                <Card.Title>{song.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{song.artist}</Card.Subtitle>
                                <Player url={song.url} />
                                <Button variant="primary" className="mt-2">Add to Playlist</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Songs;
