import React from "react";
import styled from "styled-components";

import Title from "./Title";
import Text from "./Text";

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
  max-height: 210px;
  border: 3px solid grey !important;
`;

const TagsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 4px 0px 8px;
`;

const Tag = styled(Text)`
  ${({ theme: { colors } }) => `
    background: ${colors.white};
  `}
  padding: 4px 8px;
  border-radius: 4px;
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
}) => {
  return (
    <CardContainer type={types[0]}>
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

      <CardImage src={img} alt={name} />

      <TagsWrapper>
        {types.map((type, index) => {
          return (
            <Tag
              key={`TYPE_${index}`}
              fontSize="font14"
              fontWeight={500}
              color={type}
            >
              {type[0].toUpperCase() + type.slice(1)}
            </Tag>
          );
        })}
      </TagsWrapper>

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

      <FakeBtn fontSize="font14" textAlign="center" onClick={onClick}>
        {isInPokedex ? "Retirer" : "Ajouter"}
      </FakeBtn>
    </CardContainer>
  );
};

export default Card;
