import { useState } from 'react'
import { useEffect } from 'react'
import {useRoutes} from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PageNotFound from './pages/PageNotFound';

function App() {

  // Sets up routes
  let element = useRoutes([
    {
      path:"/*",
      element: <PageNotFound />
    }
  ]);

  return (
    <>
    <header>
      <nav>
        <Link to="/"><h1>SoundSphere</h1></Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li></li>
        </ul>
      </nav>
    </header>
    <main>
      {element}
    </main>
    </>
  )
}

export default App
