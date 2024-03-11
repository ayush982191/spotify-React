import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useStateProvider } from '../utils/StateProvider'
import { reducerCases } from '../utils/Constant'
function CurrenttTrack() {
    const [{token,currentlyPlaying},dispatch] = useStateProvider()

    // console.log("Coming in current track");
    useEffect(()=>{
        const currentTrack = async ()=>{
            const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",{
                headers : {
                    Authorization : "Bearer " + token,
                    "Content-Type" : "application/json"
                }
            }) 
            // console.log("resp is footer i ",response);
            if(response.data !== "" ){
                const {item} = response.data
                const currentlyPlaying = {
                    id : item.id,
                    name : item.name,
                    artist : item.artists.map((artist)=>artist.name),
                   image : item.album.images[2].url
                }
                dispatch({type : reducerCases.SET_PLAYING , currentlyPlaying })
                // console.log("track curr=",currentlyPlaying);
            }
 
           
        }
        currentTrack();
    
    },[token,dispatch])
    // console.log("currently playing is ",currentlyPlaying);
  return (
    <Container>
        {
            currentlyPlaying && (
                <div className="track">
                    <div className="track_image">
                        <img src={currentlyPlaying.image} alt="currentlyPlaying" />
                    </div>
                    <div className="track_info">
                        <h4>{currentlyPlaying.name}</h4>
                        <h6>{currentlyPlaying.artist.join(", ")}</h6>
                    </div>
                </div>
            )
        }
        
    </Container>
  )
}

export default CurrenttTrack
const Container = styled.div`
.track{
    display: flex;
    align-items: center;
    gap: 1rem;
     .track_info{
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        h4{
            color: white;
            
        }
        h6{
            color: #b3b3b3;
        }

    }
}
    

`