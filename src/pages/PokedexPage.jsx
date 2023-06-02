import { useState, useEffect } from "react";
import styled from "styled-components";

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
  const [pokedex, setPokedex] = useState([]);

  const POKEDEX = localStorage.getItem("pokedex");

  const handleClick = (pokemon) => {
    const updatedPokedex = pokedex.filter((poke) => poke.id !== pokemon.id);
    setPokedex(updatedPokedex);
    return localStorage.setItem("pokedex", JSON.stringify(updatedPokedex));
  };

  useEffect(() => {
    if (POKEDEX) {
      setPokedex(JSON.parse(POKEDEX));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          style={{ margin: "0 auto" }}
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
