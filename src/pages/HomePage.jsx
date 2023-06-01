import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Layout from "./Layout";

const HomePage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState({
    prev: null,
    current: 1,
    next: null,
  });
  const [pokemons, setPokemons] = useState([]);

  const POKEMON_PER_PAGE = 10;
  const TOTAL_POKEMON = 1281;

  const handlePageChange = (action) => {
    if (
      action === "next" &&
      page.current <= Math.ceil(TOTAL_POKEMON / POKEMON_PER_PAGE)
    ) {
      return getPokemons(page.next, action);
    }

    if (action === "prev" && page.current > 1) {
      return getPokemons(page.prev, action);
    }
  };

  const getPokemons = async (url, action) => {
    try {
      const { data } = await axios.get(url);

      setPage({
        ...page,
        prev: data.previous,
        current:
          action === "next"
            ? page.current + 1
            : action === "prev"
            ? page.current - 1
            : 1,
        next: data.next,
      });

      const promises = await data.results.map(async (pokemon) => {
        const result = await fetch(pokemon.url);
        const res = await result.json();
        const formattedRes = {
          id: res.id,
          name: res.name,
          abilities: res.abilities.map((ability) => ability.ability.name),
          img: res.sprites.other.dream_world.front_default,
          types: res.types.map((type) => type.type.name),
          weight: res.weight,
          health: res.stats.filter((stat) => stat.stat.name === "hp")[0]
            .base_stat,
        };

        return formattedRes;
      });
      const results = await Promise.all(promises);
      setPokemons(results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPokemons(
      `https://pokeapi.co/api/v2/pokemon?offset=${page.current - 1}&limit=${
        page.current * POKEMON_PER_PAGE
      }`
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigate(`/?page=${page.current}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.current]);

  return (
    <Layout>
      <p
        onClick={() => handlePageChange("prev")}
        style={{ textAlign: "center", marginBottom: 24 }}
      >
        PREV
      </p>

      <p
        onClick={() => {
          if (page.current * POKEMON_PER_PAGE > TOTAL_POKEMON) return;

          return setPage({ ...page, current: (page.current += 1) });
        }}
        style={{ textAlign: "center" }}
      >
        {(page.current - 1) * POKEMON_PER_PAGE === 0
          ? 1
          : (page.current - 1) * POKEMON_PER_PAGE}{" "}
        à{" "}
        {page.current * POKEMON_PER_PAGE > TOTAL_POKEMON
          ? TOTAL_POKEMON
          : page.current * POKEMON_PER_PAGE}{" "}
        sur {TOTAL_POKEMON}
      </p>

      <p
        onClick={() => handlePageChange("next")}
        style={{ textAlign: "center", marginTop: 24 }}
      >
        NEXT
      </p>
    </Layout>
  );
};

export default HomePage;
