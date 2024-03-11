import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import { useStateProvider } from './utils/StateProvider'
import { reducerCases } from './utils/Constant'
import Spotify from './components/Spotify'

function App() { 
   const [{token},dispatch] = useStateProvider();
  useEffect(()=>{
    const hash = window.location.hash;
    if(hash){ 
      const token = hash.substring(1).split("&")[0].split("=")[1];                                                      
      // console.log(token);
      dispatch({type : reducerCases.SET_TOKEN, token })
    }
  },[token,dispatch])

  return (
    <>
    {
      token ? <Spotify/> : <Login/>
    }
    
    </>
  )
}

export default App
