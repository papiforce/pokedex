import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Layout from "./Layout";

import Title from "components/Title";
import Card from "components/Card";
import Text from "components/Text";

const Container = styled.div`
  ${({ theme: { screens } }) => `
    max-width: ${screens.maxDesktop}px;
  `}
  margin: 32px auto 0;
`;

const PokemonsWrapper = styled.div`
  display: flex;
  gap: 56px 24px;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 80px;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  max-width: max-content;
  margin: 0 auto;
`;

const PaginationBtn = styled(Text)`
  ${({ theme: { colors } }) => `
    :hover {
      background: ${colors.white30};
    }
  `}
  cursor: pointer;
  user-select: none;
  padding: 4px 8px;
  border-radius: 4px;
`;

const FakeBtn = styled(Text)`
  ${({ theme: { colors } }) => `
    background: ${colors.purple};
  `}
  max-width: max-content;
  padding: 4px 8px;
  margin: 8px auto 32px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
`;

const HomePage = () => {
  const urlPage = Number(new URLSearchParams(useLocation().search).get("page"));
  const navigate = useNavigate();
  const [page, setPage] = useState({
    prev: null,
    current: urlPage,
    next: null,
  });
  const [pokemons, setPokemons] = useState([]);
  const [pokedex, setPokedex] = useState([]);

  const POKEDEX = localStorage.getItem("pokedex");
  const POKEMON_PER_PAGE = 10;
  const TOTAL_POKEMON = 1281;

  const handlePageChange = (action) => {
    if (
      action === "next" &&
      urlPage <= Math.ceil(TOTAL_POKEMON / POKEMON_PER_PAGE)
    ) {
      getPokemons(page.next, action);
      return navigate(`/?page=${urlPage + 1}`);
    }

    if (action === "prev" && urlPage > 1) {
      getPokemons(page.prev, action);
      return navigate(`/?page=${urlPage - 1}`);
    }
  };

  const isInPokedex = (id) => {
    return pokedex.some((pokemon) => pokemon.id === id);
  };

  const handleClick = (pokemon) => {
    if (!isInPokedex(pokemon.id)) {
      setPokedex([...pokedex, pokemon]);
      return localStorage.setItem(
        "pokedex",
        JSON.stringify([...pokedex, pokemon])
      );
    } else {
      const updatedPokedex = pokedex.filter((poke) => poke.id !== pokemon.id);
      setPokedex(updatedPokedex);
      return localStorage.setItem("pokedex", JSON.stringify(updatedPokedex));
    }
  };

  const getPokemons = async (url, action) => {
    try {
      const { data } = await axios.get(url);

      const current =
        action === "next" ? urlPage + 1 : action === "prev" ? urlPage - 1 : 1;

      setPage({
        ...page,
        prev: data.previous,
        current: current,
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
    setPage({ ...page, current: urlPage });

    getPokemons(
      `https://pokeapi.co/api/v2/pokemon?offset=${
        urlPage <= 1 ? 0 : urlPage
      }&limit=${POKEMON_PER_PAGE}`
    );

    if (POKEDEX) {
      setPokedex(JSON.parse(POKEDEX));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemons]);

  if (!page.current) return <></>;

  return (
    <Layout>
      <Container>
        <Title
          fontSize="from56to32"
          fontWeight={400}
          textAlign="center"
          style={{ marginBottom: 24 }}
        >
          Liste des Pokemons
        </Title>

        <FakeBtn
          fontSize="font18"
          fontWeight={400}
          onClick={() => navigate("/game?tab=pack")}
        >
          Jouer
        </FakeBtn>

        <PokemonsWrapper>
          {pokemons.length > 0 &&
            pokemons.map((pokemon, idx) => {
              return (
                <Card
                  key={idx}
                  id={pokemon.id}
                  name={pokemon.name}
                  img={pokemon.img}
                  health={pokemon.health}
                  types={pokemon.types}
                  abilities={pokemon.abilities}
                  isInPokedex={isInPokedex(pokemon.id)}
                  onClick={() => handleClick(pokemon)}
                  onSelectedPokemon={() =>
                    navigate(
                      `/pokemon/${pokemon.name.toLowerCase()}/${pokemon.id}`
                    )
                  }
                />
              );
            })}
        </PokemonsWrapper>

        <PaginationWrapper>
          <PaginationBtn
            fontSize="font16"
            fontWeight={400}
            onClick={() => handlePageChange("prev")}
          >
            Précédent
          </PaginationBtn>

          <Text fontSize="font16" fontWeight={500}>
            {urlPage * POKEMON_PER_PAGE === 0 ? 1 : urlPage * POKEMON_PER_PAGE}{" "}
            à{" "}
            {urlPage * POKEMON_PER_PAGE > TOTAL_POKEMON
              ? TOTAL_POKEMON
              : urlPage * POKEMON_PER_PAGE + POKEMON_PER_PAGE}{" "}
            sur {TOTAL_POKEMON}
          </Text>

          <PaginationBtn
            fontSize="font16"
            fontWeight={400}
            onClick={() => handlePageChange("next")}
          >
            Suivant
          </PaginationBtn>
        </PaginationWrapper>
      </Container>
    </Layout>
  );
};

export default HomePage;
