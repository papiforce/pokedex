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

const Card = ({ id, name, img, health, types, abilities }) => {
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
              {type}
            </Tag>
          );
        })}
      </TagsWrapper>

      {abilities.map((ability, index) => {
        return (
          <Text
            key={index}
            fontSize="font14"
            fontWeight={500}
            color="orange"
            textAlign="center"
            style={{ marginBottom: index < abilities.length - 1 ? 4 : 0 }}
          >
            {ability[0].toUpperCase() + ability.slice(1)}
          </Text>
        );
      })}
    </CardContainer>
  );
};

export default Card;
