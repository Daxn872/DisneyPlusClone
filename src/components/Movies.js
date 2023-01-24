import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=aa6cde6dfc223443eab1972e3434b90c')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  const handleMouseEnter = (movie) => {
    setSelectedMovie(movie);
  };

  const handleMouseLeave = () => {
    setSelectedMovie({});
  };

  return (
    <Container>
      <h4>Recommended for You</h4>
      <Content>
        {movies.map((movie) => (
          <Wrap
            onMouseEnter={() => handleMouseEnter(movie)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            <p>{movie.title}</p>
            {selectedMovie.id === movie.id && (
              <div>
                <p>{movie.overview}</p>
                <p>{` Release Date: ${movie.release_date}`}</p>
              </div>
            )}
          </Wrap>
        ))}
      </Content>
    </Container>
  );
}

export default Movies;

const Container = styled.div`
  padding: 0 0 26px;
`;

    const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 25px;
`


const Wrap = styled.div`
width: 400px;
    height: 250px;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    border: 3px solid rgba(249, 249, 249, 0.1);
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    
    p {
        margin: 0;
        padding: 10px;
        font-size: 18px;
        font-weight: 600;
        text-align: center;
    }
    

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
        rgb(0 0 0 / 72%) 0px 30px 22px -10px;
        border-color: rgba(249, 249, 249, 0.8);
    }

`
