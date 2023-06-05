import styled from "styled-components";

import Title from "./Title";
import Text from "./Text";

import NotFound from "assets/images/404-page-not-found.png";

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

const CardContainer = styled.div`
  ${({ theme: { colors }, type }) => `
    background: ${colors[`${type}Background`]};
    border: 6px solid ${colors.yellowBis};
  `}
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  max-width: 250px;
  height: 360px;
  cursor: pointer;
`;

const CardTitle = styled(Title)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const CardImage = styled.img`
  ${({ theme: { colors } }) => `
    background: ${colors.white};
  `}
  width: 100%;
  padding: 12px;
  height: 100%;
  min-height: 210px;
  max-height: 210px;
  border: 3px solid grey !important;
`;

const TagsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 8px;
  left: 4px;
`;

const ImgTypes = styled.img`
  width: 24px;
`;

const WrapperImage = styled.div`
  position: relative;
`;

const FakeBtn = styled(Text)`
  ${({ theme: { colors } }) => `
    background: ${colors.black};
    border: 2px solid ${colors.white30};

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

const Card = ({
  id,
  name,
  img,
  health,
  types,
  abilities,
  isInPokedex,
  onClick,
  onSelectedPokemon,
  style,
}) => {
  const renderSwitch = (types) => {
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

  return (
    <CardContainer type={types[0]} onClick={onSelectedPokemon} style={style}>
      <CardTitle number={2} fontSize="font18" fontWeight={500} color="black">
        #{id} {name.toUpperCase()}
        <Text
          fontSize="font18"
          fontWeight={500}
          color="black"
          style={{ display: "flex", alignItems: "baseline", gap: 2 }}
        >
          <Text fontSize="font10" fontWeight={600} color="black">
            PV
          </Text>
          {health}
        </Text>
      </CardTitle>

      <WrapperImage>
        <CardImage src={img ? img : NotFound} alt={name} />
        <TagsWrapper>
          {types.map((type, index) => {
            return <ImgTypes key={index} src={renderSwitch(type)} alt={type} />;
          })}
        </TagsWrapper>
      </WrapperImage>

      {abilities.slice(0, 2).map((ability, index) => {
        return (
          <Text
            key={index}
            fontSize="font14"
            fontWeight={500}
            color="black"
            textAlign="center"
            style={{ marginBottom: index < abilities.length - 1 ? 4 : 0 }}
          >
            {ability[0].toUpperCase() + ability.slice(1)}
          </Text>
        );
      })}

      <FakeBtn
        fontSize="font14"
        textAlign="center"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {isInPokedex ? "Retirer" : "Ajouter"}
      </FakeBtn>
    </CardContainer>
  );
};

export default Card;
