import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loaders/Loader";
import HomePage from "./pages/HomePage";
import CardsLoader from "./components/Loaders/CardsLoader";
import SuperManLoader from "./components/Loaders/SupermanLoader";
import DayNightLoader from "./components/Loaders/DayNightLoader";
import CircularLoader from "./components/Loaders/CircularLoader";
const LOADERS = [
  Loader,
  CardsLoader,
  SuperManLoader,
  DayNightLoader,
  CircularLoader,
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [LoadingScreen] = useState(
    () => LOADERS[Math.floor(Math.random() * LOADERS.length)],
  );

  useEffect(() => {
    const loaderTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => window.clearTimeout(loaderTimer);
  }, []);

  if (isLoading) {
    return (
      <main className="page-loader" aria-label="Loading portfolio">
        <LoadingScreen />
      </main>
    );
  }

  return (
    <div className="app">
      <HomePage />
    </div>
  );
}

export default App;
