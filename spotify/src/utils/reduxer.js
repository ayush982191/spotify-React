
import { reducerCases } from "./Constant";
import { stateContext } from "./StateProvider";

export const initialState = {
    token : null,
    playlists : [],
    userInfo : null,
    selectedPlaylistId: "5eMdxdJOVb3l4PPdqZe8o2",
    selectedPlayList : null,
    currentlyPlaying : null,
    playerState : false,
    selectedPlaylistId : null
}
// console.log("coming in dispatch");
 const reducer = (state , action) =>{
    switch(action.type){
        case reducerCases.SET_TOKEN : {
            return {
                ...state,
                 token : action.token
            }
        }
        case reducerCases.SET_PLAYLISTS :{
            return {
                ...state,
                playlists : action.playlists
            }
        }
        case reducerCases.SET_USER :{
            // console.log("data coiming is setuser si ",action.userInfo);
            return {
                ...state,
                userInfo : action.userInfo
            }
        }
                       // SET_PLAYLIST
        case reducerCases.SET_PLAYLIST :{

            // console.log("data coming in dispatch is ",action.selectedPlaylist);
            return {
                ...state,
                selectedPlayList : action.selectedPlayList
            }
        }
        case reducerCases.SET_PLAYING :{
            // console.log("inside current playing is ",action.currentlyPlaying);
            
            return {
                ...state,
                currentlyPlaying : action.currentlyPlaying
            }
        }
        case reducerCases.SET_PLAYER_STATE :{
            // console.log("data coming in payerState inside reducer.js is ",action.playerState);
            return {
                ...state,
                playerState : action.playerState

            }
        }
        case reducerCases.SET_PLAYLIST_ID : {
            return {
                ...state,
                selectedPlaylistId : action.selectedPlaylistId

            }
        }

        default : return state;
    }
}
export default reducer;
