import React from 'react'
import styled from "styled-components"


function Login() {
    const handleClick = () =>{
        // alert("click")
        const clientId = "f53aa30b5e4e4484ad20bd5711ac4672"
        const redirectUrl = "http://localhost:5173/"
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = [
          "user-read-email",
          "user-read-private",
          "user-read-playback-state",
          "user-modify-playback-state",
          "user-read-currently-playing",
          "user-read-playback-position",
          "user-top-read",
          "user-read-recently-played"
        ]
        window.location.href =`${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`                                                     

    }
  return (
    <Container>
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="spotify" />
        <button onClick={handleClick} >Connect Spotify</button>
    </Container>
  )
}

export default Login

const Container = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 height:  100vh;
 width: 100vw;
 background-color:var(--green);
 gap: 5rem;
 img {
    height: 20vh;

 }
 button{
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: var(--green);
    font-size: 1.4rem;
    cursor: pointer;
 }

`