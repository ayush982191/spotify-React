import React from 'react'
import styled from 'styled-components'
// import currentTrack from './currentTrack'
 
import { useStateProvider } from '../utils/StateProvider'
import CurrenttTrack from './CurrenttTrack';
import PlayerControls from './PlayerControls';
import Volums from './Volums';
function Footer() {
  const [{token,playlists},dispatch] = useStateProvider()
//  console.log("Enter in footer");
  return (
    <Container>
      {/* <currentTrack/> */}
      <CurrenttTrack/>
      <PlayerControls/>
      <Volums/>
    </Container>
  )
}

export default Footer

const Container = styled.div`
/* background: linear-gradient(#181818 ); */
background-color: #181818;
height: 100%;
width: 100%;
border-top: 1px solid #282828;
display: grid;
grid-template-columns: 1fr 2fr 1fr;
align-items: center;
justify-content: center;
padding: 0 1rem;
`