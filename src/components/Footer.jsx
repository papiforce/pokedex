import styled from "styled-components";

import Text from "./Text";

const Container = styled.footer`
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  margin-top: 100px;
  width: 100%;
  height: max-content;
  padding: 32px;

  border-top: ${({ theme: { colors } }) => `1px solid ${colors.white30}`};
`;

const Footer = () => {
  return (
    <Container>
      <Text fontSize="font14" textAlign="center">
        Pokedex © {new Date().getFullYear()}, tous droits réservés
      </Text>
    </Container>
  );
};

export default Footer;
