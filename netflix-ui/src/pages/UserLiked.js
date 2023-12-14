import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserLikedMovies, removeFromLikedMovies } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function UserLiked() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  // const movies = useSelector((state) => state.netflix.movies);
  const [email, setEmail] = useState(undefined);
  const [movies, setMovies] = useState([]);
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else {
      navigate("/login");
    }
  });
  const dispatch = useDispatch();

  const getResult = async () => {
    const result = await dispatch(getUserLikedMovies(email)).unwrap();
    console.log(result);
    setMovies(result);
  };
  useEffect(() => {
    if (email) {
      getResult();
    }
  }, [email]);
  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const removeMovies = async (movieData, email) => {
    const response = await dispatch(
      removeFromLikedMovies({ movieId: movieData.id, email })
    ).unwrap();
    setMovies(response);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content flex column">
        <h1>My List</h1>
        <div className="grid flex">
          {movies?.map((movie, index) => {
            return (
              <Card
                movieData={movie}
                index={index}
                key={movie.id}
                isLiked={true}
                movies={(movieData, email) => removeMovies(movieData, email)}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .content {
    margin: 2.3rem;
    margin-top: 8rem;
    gap: 3rem;
    h1 {
      margin-left: 3rem;
    }
    .grid {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
`;
