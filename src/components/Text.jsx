import styled from "styled-components";

import Theme from "utils/Theme";

const Template = styled.div`
  ${({ fontSize, fontWeight, color, textAlign, isEllipsis, lineHeight }) => `
			font-size: ${Theme.fontSize[fontSize]};
			font-weight: ${fontWeight};
			color: ${Theme.colors[color]};
			text-align: ${textAlign};
			line-height: ${
        lineHeight ? lineHeight : `calc(${Theme.fontSize[fontSize]} + 6px)`
      };
			white-space: ${isEllipsis ? "nowrap" : "normal"};
			overflow: ${isEllipsis ? "hidden" : "unset"};
			text-overflow: ${isEllipsis ? "ellipsis" : "unset"};
		`}
  font-family: Poppins, sans-serif;
`;

const Text = ({
  fontSize = "from20to14",
  fontWeight = 300,
  color = "white",
  textAlign = "left",
  isEllipsis = false,
  lineHeight,
  style,
  children,
  ...props
}) => {
  return (
    <Template
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      textAlign={textAlign}
      isEllipsis={isEllipsis}
      lineHeight={lineHeight}
      style={style}
      {...props}
    >
      {children}
    </Template>
  );
};

export default Text;
