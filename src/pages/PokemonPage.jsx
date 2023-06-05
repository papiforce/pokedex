import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";

import useWindowSize from "utils/useWindowSize";
import Layout from "./Layout";

import Rock from "../assets/types/Rock.png";
import Fire from "../assets/types/Fire.png";
import Bug from "../assets/types/Rock.png";
import Dark from "../assets/types/Dark.png";
import Dragon from "../assets/types/Dragon.png";
import Electric from "../assets/types/Electric.png";
import Fairy from "../assets/types/Fairy.png";
import Fight from "../assets/types/Fight.png";
import Flying from "../assets/types/Flying.png";
import Ghost from "../assets/types/Ghost.png";
import Grass from "../assets/types/Grass.png";
import Ground from "../assets/types/Ground.png";
import Ice from "../assets/types/Ice.png";
import Normal from "../assets/types/Normal.png";
import Poison from "../assets/types/Poison.png";
import Psychic from "../assets/types/Psychic.png";
import Steel from "../assets/types/Steel.png";
import Water from "../assets/types/Water.png";

import Title from "components/Title";
import Text from "components/Text";
import Card from "components/Card";

const Container = styled.div`
  ${({ theme: { screens, colors } }) => `
    max-width: ${screens.tablet}px;
    background: ${colors.greyDark};
  `}
  border-radius: 12px;
  padding: 24px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Poster = styled.img`
  width: 100%;
  max-width: 380px;
  margin: 32px auto 24px;
`;

const TypesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 32px;
`;

const Tag = styled(Text)`
  ${({ theme: { colors } }) => `
    background: ${colors.greyLight};
  `}
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const FakeBtn = styled(Text)`
  ${({ theme: { colors }, bgColor }) => `
    background: ${colors[bgColor]};
    border: 2px solid ${colors.transparent};

    :hover {
      border: 2px solid ${colors.white};
    }
  `}
  max-width: max-content;
  padding: 4px 8px;
  margin: 8px auto 0px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
`;

const PokemonPage = () => {
  const { name, id } = useParams();
  const navigate = useNavigate();
  const { isTablet } = useWindowSize();

  const [pokemon, setPokemon] = useState([]);
  const [PokeEvo, setPokeEvo] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pokedex, setPokedex] = useState([]);
  const [hasEvolution, setHasEvolution] = useState(false);

  const POKEDEX = localStorage.getItem("pokedex");

  const renderType = (types) => {
    switch (types) {
      case "grass":
        return Grass;
      case "bug":
        return Bug;
      case "dark":
        return Dark;
      case "dragon":
        return Dragon;
      case "electric":
        return Electric;
      case "fairy":
        return Fairy;
      case "fighting":
        return Fight;
      case "fire":
        return Fire;
      case "flying":
        return Flying;
      case "ghost":
        return Ghost;
      case "ground":
        return Ground;
      case "ice":
        return Ice;
      case "normal":
        return Normal;
      case "poison":
        return Poison;
      case "psychic":
        return Psychic;
      case "rock":
        return Rock;
      case "steel":
        return Steel;
      case "water":
        return Water;
      default:
        return "foo";
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

  const getEvolutions = async (id) => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );

      const result = await fetch(data.evolution_chain.url);
      const res = await result.json();

      const evoName =
        res.chain.evolves_to[0].species.name === name
          ? res.chain.evolves_to[0].evolves_to[0].species.name
          : res.chain.evolves_to[0].species.name;

      const evoResult = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${evoName}`
      );
      const evoRes = await evoResult.json();

      const formattedRes = {
        id: evoRes.id,
        name: evoRes.name,
        abilities: evoRes.abilities.map((ability) => ability.ability.name),
        img: evoRes.sprites.other.dream_world.front_default,
        types: evoRes.types.map((type) => type.type.name),
        weight: evoRes.weight,
        health: evoRes.stats.filter((stat) => stat.stat.name === "hp")[0]
          .base_stat,
      };

      setHasEvolution(
        !(name === res.chain.evolves_to[0].evolves_to[0].species.name)
      );
      setPokeEvo(formattedRes);
    } catch (err) {
      console.log(err);
    }
  };

  const getPokemonInfos = async () => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );

      getEvolutions(id);

      const formattedRes = {
        id: data.id,
        name: data.name,
        abilities: data.abilities.map((ability) => ability.ability.name),
        img: data.sprites.other.dream_world.front_default,
        types: data.types.map((type) => type.type.name),
        weight: data.weight,
        health: data.stats.filter((stat) => stat.stat.name === "hp")[0]
          .base_stat,
        attack: data.stats.filter((stat) => stat.stat.name === "attack")[0]
          .base_stat,
        defense: data.stats.filter((stat) => stat.stat.name === "defense")[0]
          .base_stat,
      };

      setPokemon(formattedRes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (POKEDEX) {
      setPokedex(JSON.parse(POKEDEX));
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsOpen(false);

    getPokemonInfos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (pokemon.length < 1) return <></>;

  console.log(isTablet);

  return (
    <Layout
      title={`${
        pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
      } | Pokedex`}
      style={{ padding: "70px 16px 0" }}
    >
      <Title
        fontSize="from56to32"
        fontWeight={400}
        textAlign="center"
        style={{ marginBottom: 24 }}
      >
        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
      </Title>

      <Container>
        <FakeBtn
          fontSize="font18"
          fontWeight={400}
          bgColor="black"
          onClick={() => handleClick(pokemon)}
        >
          {isInPokedex(Number(id))
            ? "Retirer du pokedex"
            : "Ajouter dans mon pokedex"}
        </FakeBtn>

        <Poster src={pokemon.img} alt={pokemon.name} />
        <Text
          fontSize="from20to14"
          fontWeight={400}
          style={{ marginBottom: 8 }}
        >
          ID : #{pokemon.id}
        </Text>
        <Text
          fontSize="from20to14"
          fontWeight={400}
          style={{ marginBottom: 8 }}
        >
          Poids : {pokemon.weight / 10}kg
        </Text>

        <TypesWrapper>
          {pokemon.types.map((type, idx) => {
            return (
              <Tag key={idx} fontSize="from20to14" fontWeight={400}>
                <img src={renderType(type)} alt={type} style={{ width: 24 }} />
                {type[0].toUpperCase() + type.slice(1)}
              </Tag>
            );
          })}
        </TypesWrapper>

        <Title
          number={2}
          fontSize="font24"
          fontWeight={400}
          withDivider
          dividerWidth="15%"
          style={{ marginBottom: 24 }}
        >
          Statistiques
        </Title>

        <Text
          fontSize="from20to14"
          fontWeight={400}
          style={{ marginBottom: 8 }}
        >
          Points de vie : {pokemon.health}
        </Text>
        <Text
          fontSize="from20to14"
          fontWeight={400}
          style={{ marginBottom: 8 }}
        >
          Attaque : {pokemon.attack}
        </Text>
        <Text fontSize="from20to14" fontWeight={400}>
          Défense : {pokemon.defense}
        </Text>
      </Container>

      {hasEvolution && (
        <FakeBtn
          fontSize="font18"
          fontWeight={400}
          bgColor="purple"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          {isOpen ? "Cacher l'évolution" : "Voir l'évolution"}
        </FakeBtn>
      )}

      {isOpen && (
        <Card
          id={PokeEvo.id}
          name={PokeEvo.name}
          img={PokeEvo.img}
          health={PokeEvo.health}
          types={PokeEvo.types}
          abilities={PokeEvo.abilities}
          isInPokedex={isInPokedex(PokeEvo.id)}
          onSelectedPokemon={() =>
            navigate(`/pokemon/${PokeEvo.name.toLowerCase()}/${PokeEvo.id}`)
          }
          style={{ margin: "24px auto 0" }}
        />
      )}
    </Layout>
  );
};

export default PokemonPage;
