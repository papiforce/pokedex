import { Link } from "react-router-dom";
import styled from "styled-components";

import Text from "./Text";

const Container = styled.div`
  width: 100%;
  position: fixed;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 999;
`;

const Wrapper = styled.div`
  ${({ theme: { screens } }) => `
		max-width: ${screens.maxDesktop}px;
	`}
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  position: absolute;
  right: 24px;
`;

const CustomLinkText = styled(Text)`
  ${({ theme: { colors }, isActive }) => `
		color: ${isActive ? colors.purple : colors.white} !important;

    :hover {
      color: ${colors.purple} !important;
    }

		${
      isActive &&
      `::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: -73%;
        transform: translate(50%, 50%);
        width: 120%;
        border: 1px solid ${colors.purple};
      }`
    }
	`}
  position: relative;
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Link to="/?page=1">
          <Text fontSize="font32">Pokecard</Text>
        </Link>

        <RightWrapper>
          <Link to="/pokedex">
            <CustomLinkText
              isActive={window.location.href.includes(
                "pokedex"
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
              )}
            >
              Mon Pokedex
            </CustomLinkText>
          </Link>
        </RightWrapper>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
