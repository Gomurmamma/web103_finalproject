import { useState } from "react";
import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import PageNotFound from "./pages/PageNotFound";
import LandingPage from "./pages/LandingPage";
import { Link } from "react-router-dom";
import FanPage from "./pages/FanPage";

function App() {
  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <LandingPage/>
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
    {
      path: "/fans/:id",
      element: <FanPage/>
    }
  ]);

  return (
    <>
      <header>
        <nav>
          <Link to="/">
            <h1>SoundSphere</h1>
          </Link>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{element}</main>
      <footer>
        <ul>
          <li>privacy</li>
          <li>terms & conditions</li>
          <li>&copy; 2023</li>
        </ul>
      </footer>
    </>
  );
}

export default App;
