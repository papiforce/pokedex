import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import NotFound from "assets/images/404-page-not-found.png";

import Layout from "./Layout";

import Title from "components/Title";
import Card from "components/Card";
import Text from "components/Text";
import Input from "components/Input";
import Divider from "components/Divider";

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

const PokedexPage = () => {
  const navigate = useNavigate();

  const [pokedex, setPokedex] = useState([]);
  const [pokemons, setPokemons] = useState(null);
  const [search, setSearch] = useState("");

  const POKEDEX = localStorage.getItem("pokedex");

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

  const handleChange = (e) => {
    setSearch(e.value);
  };

  const getPokemons = async () => {
    try {
      const { data } = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=1281"
      );

      const promises = await data.results.map(async (pokemon) => {
        const result = await fetch(pokemon.url);
        const res = await result.json();
        const formattedRes = {
          id: res.id,
          name: res.name,
          abilities: res.abilities.map((ability) => ability.ability.name),
          img: res.sprites.other.dream_world.front_default
            ? res.sprites.other.dream_world.front_default
            : res.sprites.other.home.front_default
            ? res.sprites.other.home.front_default
            : res.sprites.front_default
            ? res.sprites.front_default
            : NotFound,
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
    if (POKEDEX) {
      setPokedex(JSON.parse(POKEDEX));
    }

    getPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pokemons)
    return (
      <Layout title="Mon Pokedex">
        <Title
          fontSize="from56to32"
          fontWeight={400}
          textAlign="center"
          style={{ marginBottom: 24 }}
        >
          Mon Pokedex
        </Title>

        <Container>
          <Text textAlign="center">Chargement en cours..</Text>
        </Container>
      </Layout>
    );

  return (
    <Layout title="Mon Pokedex">
      <Title
        fontSize="from56to32"
        fontWeight={400}
        textAlign="center"
        style={{ marginBottom: 24 }}
      >
        Mon Pokedex
      </Title>

      <Container>
        <Input
          label="Ajouter un pokemon"
          placeholder="Nom du pokemon"
          width="500px"
          value={search}
          onChange={handleChange}
          withDropdown
          dropdownItems={pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
          )}
          onClick={(pokemon) => {
            handleClick(pokemon);
            setSearch("");
          }}
          style={{ margin: "0 auto", padding: "0 16px" }}
        />

        <Divider width="60%" margin="32px auto 56px" />

        <PokemonsWrapper>
          {pokedex.length > 0 ? (
            pokedex.map((pokemon, idx) => {
              return (
                <Card
                  key={idx}
                  id={pokemon.id}
                  name={pokemon.name}
                  img={pokemon.img}
                  health={pokemon.health}
                  types={pokemon.types}
                  abilities={pokemon.abilities}
                  isInPokedex={true}
                  onClick={() => handleClick(pokemon)}
                  onSelectedPokemon={() =>
                    navigate(
                      `/pokemon/${pokemon.name.toLowerCase()}/${pokemon.id}`
                    )
                  }
                />
              );
            })
          ) : (
            <Text>Il n'y a aucun pokemon dans votre pokedex</Text>
          )}
        </PokemonsWrapper>
      </Container>
    </Layout>
  );
};

export default PokedexPage;
