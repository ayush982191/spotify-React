import React  from 'react'
import styled from 'styled-components'
import { useEffect } from 'react'
import {useStateProvider} from "../utils/StateProvider"
import axios from "axios";
import { reducerCases } from '../utils/Constant';




function Playlists() {
    const [{token,playlists},dispatch] = useStateProvider()
    useEffect(()=>{
        const getPlayListData = async ()=>{
            const response = await axios.get("https://api.spotify.com/v1/me/playlists",{
                headers : {
                    Authorization : "Bearer " + token,
                    "Content-Type" : "application/json"
                }
            })
            // console.log("------------------");
            // console.log(response);
            const {items} = response.data;
            // console.log(items);
            const playlists = items.map(({name,id})=>{
                return {name , id}

            })
            dispatch({type : reducerCases.SET_PLAYLISTS , playlists })
        }
        getPlayListData();

    },[token,dispatch])
    const changerCurrentPlaylist = (selectedPlaylistId) =>{
        dispatch({type : reducerCases.SET_PLAYLIST_ID , selectedPlaylistId })
    }

  return (
    <Container>
        
        <ul>
            {
                playlists?.map(({name , id})=>(
                    <li onClick={()=>changerCurrentPlaylist(id)} key={id} >{name}</li>
                ))
                
            }
  {
              
                
            }
              
        </ul>
        </Container>
  )
}

export default Playlists

const Container = styled.div`
height: 100%;
overflow: hidden;
/* overflow: scroll; */
       ul{
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      height: 55vh;
      max-height: 100%;
      overflow: auto;
      &&::-webkit-scrollbar{
        width: 0.7rem;
        &-thumb{
            background-color: rgba(255,255,255,0.6);
        }
      }
      li{
        display: flex;
        gap: 1rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover{
          color: white;
        }
      }
    }

`