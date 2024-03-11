import React, { useEffect } from 'react';
import styled from 'styled-components';
import { AiFillClockCircle } from 'react-icons/ai';
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constant';

function Body() {
  // headerBackground
  const [{ token, selectedPlaylistId, selectedPlayList }, dispatch] = useStateProvider();

  // console.log('checking console  = ', selectedPlayList);

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });


      const selectedPlayList = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith('<a') ? '' : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };

      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlayList });
    };

    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const msToMinutesAndSecons = (ms)=>{
    const minutes = Math.floor(ms/60000);
    const seconds = ((ms%60000)/1000).toFixed(0);
    return minutes + ":" + (seconds <10 ? "0" : "") +seconds
  }
  const playTrack =async (id,name,artists,image,context_uri,track_number) => {

    const response = await axios.put(`https://api.spotify.com/v1/me/player/play`,{
      context_uri,
      offset : {
        position : track_number -1
      },
      position_ms : 0,


    },{
      headers : {
          Authorization : "Bearer " + token,
          "Content-Type" : "application/json"
      }

  })  
  if(response.status === 204 ){
    const currentlyPlaying = {
      id,name,artists,image 
    }
    dispatch({type : reducerCases.SET_PLAYING , currentlyPlaying})
    dispatch({type: reducerCases.SET_PLAYER_STATE , playerState : true})

  }else{
    dispatch({type: reducerCases.SET_PLAYER_STATE , playerState : true})

  }
  }

  // console.log('selected playlist is ', selectedPlayList);

  return (
    <Container  >
      {selectedPlayList && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlayList.image} alt="selectedPlaylist" />
            </div>
            <div className="details">
              <span style={{ color: 'white' }} className="type">
                PLAYLIST
              </span>
              <h1 className="title">{selectedPlayList.name}</h1>
              <p className="description">{selectedPlayList.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header_row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
          </div>
          <div className="tracks">
            {selectedPlayList.tracks.map(({ id, name, artists, image, duration, album, context_uri, track_number }, index) => (
              <div className="row" key={id} onClick={()=>playTrack(id,name,artists,image,context_uri,track_number)} >
                <div className="col">
                  <span>{index + 1}</span>
                </div>
                <div className="col detail">
                  <div className="image">
                    <img src={image} alt="track" />
                  </div>
                  <div className="info">
                    <span className="name">{name}</span>
                    <span>{artists}</span>
                  </div>
                </div>
                <div className="col">
                  <span>{album}</span>
                </div>
                <div className="col">
                  <span>{msToMinutesAndSecons(duration)}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Container>
  );
}

export default Body;

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    .image {
      img {
        height: 15rem;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px 12px;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      color: #e0dede;
      .title {
        color: white;
        font-size: 4rem;
      }
    }
  }
  .list {
    .header_row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      color: #dddcdc;
      margin: 1rem 0 0 0;
      position: sticky;
      top: 15vh;
      padding: 1rem 3rem;
      transition: 0.3s ease-in-out;
      /* background-color: ${({headerBackground}) => headerBackground ? "#000000dc":"none"}; */

    }
  }
  .tracks {
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 5rem;
    .row {
      padding: 0.5rem;
      display: grid;
      grid-template-columns: 0.3fr 3.1fr 1.9fr 0.1fr;
      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
      }
      .col{
        display: flex;
        align-items: center;
        color: #dddcdc;
        img{
          height: 40px;

        }
        .detail{
          display: flex;
          gap: 1rem;
          .info{
            display: flex;
            flex-direction: column;

          }

        }
      }
    }
  }
`;
