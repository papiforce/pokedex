import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Theme from "utils/Theme";

import HomePage from "pages/HomePage";
import PokedexPage from "pages/PokedexPage";
import PokemonPage from "pages/PokemonPage";
import GamePage from "pages/GamePage";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/pokedex" element={<PokedexPage />} />
          <Route exact path="/pokemon/:name/:id" element={<PokemonPage />} />
          <Route exact path="/game" element={<GamePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
