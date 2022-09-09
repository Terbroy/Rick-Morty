import { useEffect, useState } from 'react'
import './App.css'
import RickList from './components/RickList'

function App() {
 
  return (
    <div className="App">
      <div className='banner'>
        <img className='img-banner' src="https://i.gifer.com/Z4aV.gif" alt="" />
      </div>
      <RickList />
      <p className='autor'>Hecho por @Diana Saavedra</p>
    </div>
  )
}

export default App
