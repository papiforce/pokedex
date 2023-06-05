import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Layout from "./Layout";

import Title from "components/Title";
import Text from "components/Text";
import Card from "components/Card";

const Container = styled.div`
  ${({ theme: { screens } }) => `
    max-width: ${screens.maxDesktop}px;
  `}
  margin: 32px auto 0;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 32px;
`;

const CreditsTag = styled(Text)`
  ${({ theme: { colors } }) => `
    background: ${colors.greyDark};
  `}
  padding: 4px 16px;
  border-radius: 3.75em;
  width: 100%;
  max-width: max-content;
  margin: 0 auto 32px;
`;

const Rules = styled(Text)`
  font-style: italic;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
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

const PackWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  gap: 24px;
  margin-top: 32px;
`;

const GamePage = () => {
  const navigate = useNavigate();
  const tab = new URLSearchParams(useLocation().search).get("tab");

  const [credits, setCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [pack, setPack] = useState(null);
  const [deck, setDeck] = useState([]);
  const [currentTab, setCurrentTab] = useState(tab ?? "pack");

  const CREDITS = localStorage.getItem("poke-credits");
  const DECK = localStorage.getItem("poke-deck");
  const PACK = localStorage.getItem("poke-pack");

  const isInDeck = (id) => {
    return deck.some((pokemon) => pokemon.id === id);
  };

  const getPokemons = async (array) => {
    try {
      const promises = await array.map(async (id) => {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        const formattedData = {
          id: data.id,
          name: data.name,
          abilities: data.abilities.map((ability) => ability.ability.name),
          img: data.sprites.other.dream_world.front_default,
          types: data.types.map((type) => type.type.name),
          weight: data.weight,
          health: data.stats.filter((stat) => stat.stat.name === "hp")[0]
            .base_stat,
        };

        return formattedData;
      });

      const results = await Promise.all(promises);
      localStorage.setItem("poke-pack", JSON.stringify(results));
      setPack(results);

      console.log(results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTab = (tab) => {
    setCurrentTab(tab);
    navigate(`/game?tab=${tab}`);
  };

  const handleClick = (pokemon) => {
    if (!isInDeck(pokemon.id)) {
      setDeck([...deck, pokemon]);
      return localStorage.setItem(
        "poke-deck",
        JSON.stringify([...deck, pokemon])
      );
    } else {
      const updatedDeck = deck.filter((poke) => poke.id !== pokemon.id);
      setDeck(updatedDeck);
      return localStorage.setItem("poke-deck", JSON.stringify(updatedDeck));
    }
  };

  const removeFromDeck = (id) => {
    const updatedDeck = deck.filter((poke) => poke.id !== id);
    setDeck(updatedDeck);
    return localStorage.setItem("poke-deck", JSON.stringify(updatedDeck));
  };

  const handleOpenPack = () => {
    setIsLoading(true);
    var randArray = [];

    for (let i = 0; i < 5; i++) {
      randArray.push(Math.ceil(Math.random() * 900));
    }

    getPokemons(randArray);
    setIsLoading(false);
  };

  useEffect(() => {
    if (CREDITS) {
      setCredits(Number(JSON.parse(CREDITS)));
    }

    if (PACK) {
      setPack(JSON.parse(PACK));
    }

    if (DECK) {
      setDeck(JSON.parse(DECK));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title="Jeu | Pokécard">
      <Title
        fontSize="from56to32"
        fontWeight={400}
        textAlign="center"
        style={{ marginBottom: 24 }}
      >
        Pack Opening
      </Title>

      <Container>
        <HeaderWrapper>
          <FakeBtn
            fontSize="font18"
            fontWeight={400}
            bgColor={currentTab === "pack" ? "purple" : "transparent"}
            fakeColor="purple"
            onClick={() => handleTab("pack")}
          >
            Pack
          </FakeBtn>
          <FakeBtn
            fontSize="font18"
            fontWeight={400}
            bgColor={currentTab !== "pack" ? "purple" : "transparent"}
            fakeColor="purple"
            onClick={() => handleTab("deck")}
          >
            Deck
          </FakeBtn>
        </HeaderWrapper>

        <CreditsTag fontSize="from20to14" fontWeight={400}>
          {credits < 2 ? `${credits} crédit` : `${credits} crédits`}
        </CreditsTag>

        {currentTab === "pack" ? (
          <>
            <Rules fontSize="from20to14" fontWeight={400} textAlign="center">
              Règles: Pour ouvrir un pack il faut 15 crédits, chaque pack
              jusqu'à 5 pokémons. Pour obtenir des crédits il faut farmer en
              cliquant sur le bouton ci-dessous. Un click équivaut à 0,2
              crédits.
            </Rules>

            <FakeBtn
              fontSize="font18"
              fontWeight={400}
              bgColor="black"
              onClick={() => {
                localStorage.setItem(
                  "poke-credits",
                  JSON.stringify(Number((credits + 0.2).toFixed(2)))
                );
                setCredits(Number((credits + 0.2).toFixed(2)));
              }}
            >
              Farmer
            </FakeBtn>

            {credits >= 15 && pack && pack.length < 1 && (
              <FakeBtn
                fontSize="font18"
                fontWeight={400}
                bgColor="purple"
                onClick={() => {
                  if (!isLoading && pack && pack.length < 1) {
                    localStorage.setItem(
                      "poke-credits",
                      JSON.stringify(Number((credits - 15).toFixed(2)))
                    );
                    setCredits(Number((credits - 15).toFixed(2)));
                    handleOpenPack();
                  }
                }}
              >
                Ouvrir un pack
              </FakeBtn>
            )}

            <PackWrapper>
              {!isLoading &&
                pack &&
                pack.length > 0 &&
                pack.map((pokemon, idx) => {
                  return (
                    <Card
                      key={idx}
                      id={pokemon.id}
                      name={pokemon.name}
                      img={pokemon.img}
                      health={pokemon.health}
                      types={pokemon.types}
                      abilities={pokemon.abilities}
                      isInPokedex={isInDeck(pokemon.id)}
                      onClick={() => handleClick(pokemon)}
                      onSelectedPokemon={() =>
                        navigate(
                          `/pokemon/${pokemon.name.toLowerCase()}/${pokemon.id}`
                        )
                      }
                    />
                  );
                })}
            </PackWrapper>

            {pack && pack.length > 0 && (
              <FakeBtn
                fontSize="font18"
                fontWeight={400}
                onClick={() => {
                  localStorage.setItem("poke-pack", JSON.stringify([]));
                  setPack(null);
                }}
              >
                Jeter le pack
              </FakeBtn>
            )}
          </>
        ) : (
          <PackWrapper>
            {deck && deck.length > 0 ? (
              deck.map((pokemon, idx) => {
                return (
                  <Card
                    key={`DECK_${idx}`}
                    id={pokemon.id}
                    name={pokemon.name}
                    img={pokemon.img}
                    health={pokemon.health}
                    types={pokemon.types}
                    abilities={pokemon.abilities}
                    isInPokedex={true}
                    onClick={() => removeFromDeck(pokemon.id)}
                    onSelectedPokemon={() =>
                      navigate(
                        `/pokemon/${pokemon.name.toLowerCase()}/${pokemon.id}`
                      )
                    }
                  />
                );
              })
            ) : (
              <Text fontSize="font18" fontWeight={400}>
                Aucun pokémon dans votre deck
              </Text>
            )}
          </PackWrapper>
        )}
      </Container>
    </Layout>
  );
};

export default GamePage;
