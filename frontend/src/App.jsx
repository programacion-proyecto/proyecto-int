import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  useEffect (()=>{
    fetch('http://localhost:8000/api/hola')
      .then(r=>r.json())
      .then(d=>setMsg(d.mensaje));
  }, []);
  return (
    <>
      <h1>
        programacion
      </h1>

    </>
  )
}

export default App;
