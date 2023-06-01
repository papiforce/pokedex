import styled from "styled-components";

const Container = styled.div`
  ${({ theme: { colors }, color, width, height, margin }) => `
    background: ${colors[color]};
    max-width: ${width};
    margin: ${margin};
    height: ${height};
  `}
  width: 100%;
`;

const Divider = ({
  color = "white30",
  width = "100%",
  height = "2px",
  margin = "0 auto",
}) => {
  return (
    <Container color={color} width={width} height={height} margin={margin} />
  );
};

export default Divider;
