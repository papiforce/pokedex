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

const FakeBtn = styled(Text)`
  ${({ theme: { colors }, bgColor }) => `
    background: ${colors[bgColor]};
    border: 2px solid ${colors.white30};

    :hover {
      border: 2px solid ${colors.white};
    }
  `}
  max-width: max-content;
  padding: 4px 16px;
  margin: 24px auto 0px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
`;

const PokedexPage = () => {
  const navigate = useNavigate();

  const [pokedex, setPokedex] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const TOTAL_POKEMON = 1281;
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
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMON}`
      );

      const promises = await data.results.map(async (pokemon) => {
        const result = await fetch(pokemon.url)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .catch((err) => console.log("FETCH", err));
        const res = await result;
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
    setIsLoading(false);
  };

  useEffect(() => {
    if (POKEDEX) {
      setPokedex(JSON.parse(POKEDEX));
    }

    getPokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading)
    return (
      <Layout title="Mon Pokedex" style={{ padding: "70px 16px" }}>
        <Title
          fontSize="from56to32"
          fontWeight={400}
          textAlign="center"
          style={{ marginBottom: 24 }}
        >
          Mon Pokédex
        </Title>

        <Text fontSize="font18" fontWeight={400} textAlign="center">
          Chargement..
        </Text>
      </Layout>
    );

  console.log(pokemons);

  return (
    <Layout title="Mon Pokedex" style={{ padding: "70px 16px" }}>
      <Title
        fontSize="from56to32"
        fontWeight={400}
        textAlign="center"
        style={{ marginBottom: 24 }}
      >
        Mon Pokédex
      </Title>

      <Container>
        <Input
          label="Ajouter un pokémon"
          placeholder="Nom du pokémon ou son ID"
          width="500px"
          value={search}
          onChange={handleChange}
          withDropdown
          dropdownItems={pokemons.filter(
            (pokemon) =>
              pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
              pokemon.id === Number(search)
          )}
          onClick={(pokemon) => {
            handleClick(pokemon);
            setSearch("");
          }}
          style={{ margin: "0 auto 24px" }}
        />

        <FakeBtn
          fontSize="font18"
          fontWeight={400}
          bgColor="purple"
          onClick={() => navigate("/game?tab=pack")}
        >
          Jouer
        </FakeBtn>

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
            <Text>Il n'y a aucun pokémon dans votre pokédex</Text>
          )}
        </PokemonsWrapper>

        {pokedex.length > 0 && (
          <FakeBtn
            fontSize="font18"
            fontWeight={400}
            bgColor="black"
            onClick={() => {
              localStorage.setItem("pokedex", JSON.stringify([]));
              setPokedex([]);
            }}
          >
            Vider le pokedex
          </FakeBtn>
        )}
      </Container>
    </Layout>
  );
};

export default PokedexPage;
