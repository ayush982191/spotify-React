import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {BsFillPlayCircleFill,BsFillPauseCircleFill, BsShuffle} from "react-icons/bs"
import {CgPlayTrackNext,CgPlayTrackPrev} from "react-icons/cg"
import {FiRepeat} from "react-icons/fi"
import { useStateProvider } from '../utils/StateProvider'
import { reducerCases } from '../utils/Constant'
function PlayerControls() {
    // playerState
    // SET_PLAYER_STATE
    const [{playerState ,token },dispatch] = useStateProvider();
    const changeTrack = async (type)=>{
          await axios.post(`https://api.spotify.com/v1/me/player/prev${type}`,{},{
            headers : {
                Authorization : "Bearer " + token,
                "Content-Type" : "application/json"
            }
        }) 
        // console.log("res in playerconrol ",response);
        // console.log(---------------------------------------);

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
        }else{
       dispatch({type : reducerCases.SET_PLAYING , currentlyPlaying : null })
        }


        // console.log("---------------------------------------");
    }
    const changeState =async ()=>{ 
        const state = playerState ? "pause" : "play";
        // console.log("State is ",state);
        // console.log("token coming is ",token);
        const response = await axios.put(`https://api.spotify.com/v1/me/player/${state}`,{},{
            headers : {
                Authorization : "Bearer " + token,
                "Content-Type" : "application/json"
            }
        })  
        // console.log("changeState response is ",response);

        dispatch(prevState => ({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: !prevState.playerState
        }));    }

  return (
    <Container>
        <div className="shuffle">
            <BsShuffle/>
        </div>
        <div className="previous">
            <CgPlayTrackPrev onClick={()=>changeTrack("previous")} />
        </div>
        <div className="state">
            { playerState ? <BsFillPauseCircleFill onClick={changeState} /> : <BsFillPlayCircleFill onClick={changeState} /> }
        </div>
        <div className="next" onClick={()=>changeTrack("next")}>
            <CgPlayTrackNext/>
        </div>
        <div className="repeat">
            <FiRepeat/>
        </div>
        
    </Container>
  )
}

export default PlayerControls
const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 2rem;
svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
        color: white;
    }
}

.state{
    svg {
        color: white;       
    }


}
.previous, .next, .state{
    font-size: 2rem;
}
    
`