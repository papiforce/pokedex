import styled from "styled-components";
import Theme from "utils/Theme";
import Divider from "./Divider";

const Template = styled.h1`
  ${({ fontSize, fontWeight, color, textAlign, isEllipsis }) => `
		font-size: ${Theme.fontSize[fontSize]};
		font-weight: ${fontWeight};
		color: ${Theme.colors[color]};
		text-align: ${textAlign};
		line-height: calc(${Theme.fontSize[fontSize]} + 6px);
		white-space: ${isEllipsis ? "nowrap" : "normal"};
		overflow: ${isEllipsis ? "hidden" : "unset"};
		text-overflow: ${isEllipsis ? "ellipsis" : "unset"};
	`}
  font-family: Poppins, sans-serif;
`;

const Title = ({
  number = 1,
  fontSize = "from20to14",
  fontWeight = 600,
  color = "white",
  textAlign = "left",
  isEllipsis = false,
  withDivider = false,
  dividerWidth = "60%",
  style,
  children,
  ...props
}) => {
  return (
    <>
      {withDivider && <Divider width={dividerWidth} margin="0 auto 12px" />}
      <Template
        as={`h${number}`}
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={color}
        textAlign={textAlign}
        isEllipsis={isEllipsis}
        style={style}
        {...props}
      >
        {children}
      </Template>
    </>
  );
};

export default Title;
