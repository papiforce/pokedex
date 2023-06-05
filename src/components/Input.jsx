import { useState } from "react";
import styled from "styled-components";

import useWindowSize from "utils/useWindowSize";
import OutsideClick from "utils/OutsideClick";

import Text from "./Text";

const Container = styled.div`
  ${({ width }) => `
		max-width: ${width};
	`}
  width: 100%;
  height: auto;
  position: relative;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  width: max-content;
  position: absolute;
  top: 50%;
  left: 24px;
  transform: translate(0%, -50%);
`;

const Template = styled.input`
  ${({
    theme: { colors },
    background,
    padding,
    isError,
    isFocus,
    isHover,
    hasIcon,
  }) => `
		padding: ${hasIcon ? "12px 24px 12px 64px" : padding};
		background: ${colors[background]};
		color: ${isError ? colors.red : colors.white};
		border: ${
      isError
        ? `2px solid ${colors.red}`
        : isFocus || isHover
        ? `2px solid ${colors.white30}`
        : "2px solid transparent"
    };

    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active {
      caret-color: ${colors.white};
      -webkit-box-shadow: 0 0 0 30px ${colors.greyLight} inset !important;
      border: 2px solid ${isError ? colors.red : colors.greyLight} !important;
      -webkit-text-fill-color: ${
        isError ? colors.red : colors.white
      } !important;
    }
	`}
  font-family: "Poppins", sans-serif;
  font-size: 18px;
  font-weight: 400;
  width: 100%;
  box-sizing: border-box;
  border-radius: 16px;

  ::placeholder {
    font-size: 18px;
  }

  :disabled {
    opacity: 0.6;
    box-shadow: none;
    cursor: not-allowed;
  }

  :focus {
    box-shadow: none;
    outline: none;
  }
`;

const DropdownWrapper = styled.div`
  ${({ theme: { colors } }) => `
		background: ${colors.greyLight};
	`}
  width: 100%;
  position: absolute;
  top: calc(100% + 8px);
  padding: 16px;
  border-radius: 16px;
  z-index: 2;
  max-height: 500px;
  overflow-y: scroll;
`;

const DropdownItem = styled(Text)`
  ${({ theme: { colors } }) => `
		:hover {
			background: ${colors.greyDark};
			color: ${colors.white} !important;
		}
	`}
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
`;

const DropdownIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const Input = ({
  name,
  label,
  type = "text",
  placeholder,
  background = "greyLight",
  width,
  padding = "12px 24px",
  onChange,
  icon,
  value,
  withDropdown = false,
  dropdownItems,
  onClick,
  isError = false,
  isLoading = false,
  errorMessage,
  style,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const { isMobile } = useWindowSize();

  return (
    <Container width={width} style={style}>
      {label && (
        <Text
          fontSize="font14"
          fontWeight={400}
          style={{ marginLeft: 24, marginBottom: 4 }}
        >
          {label}
        </Text>
      )}

      {icon && <IconWrapper>{icon}</IconWrapper>}

      <OutsideClick action={() => setIsFocus(false)}>
        <Template
          name={name}
          placeholder={placeholder}
          background={background}
          padding={padding}
          isFocus={isFocus}
          isHover={isHover}
          isError={isError}
          value={value}
          type={type}
          hasIcon={icon ? true : false}
          onFocus={() => setIsFocus(true)}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onChange={(event) => {
            if (onChange) onChange(event.target);
          }}
          autoComplete="new-password"
        />

        {withDropdown && (
          <>
            {isFocus && value !== "" && isLoading && (
              <DropdownWrapper>
                <Text
                  fontSize="font18"
                  fontWeight={400}
                  color="white30"
                  textAlign="center"
                  style={{ padding: 4 }}
                >
                  Chargement...
                </Text>
              </DropdownWrapper>
            )}
            {isFocus && value !== "" && !isLoading && (
              <DropdownWrapper>
                {dropdownItems.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (onClick) onClick(item);
                        setIsFocus(false);
                      }}
                    >
                      <DropdownItem
                        fontSize="font18"
                        fontWeight={400}
                        color={isMobile ? "white" : "white30"}
                        isEllipsis
                      >
                        <DropdownIcon src={item.img} alt={item.name} />
                        {item.name}
                      </DropdownItem>
                    </div>
                  );
                })}
              </DropdownWrapper>
            )}
          </>
        )}
      </OutsideClick>

      {isError && errorMessage && (
        <Text
          fontSize="font12"
          fontWeight="weight400"
          color="red"
          style={{ marginTop: 4, marginLeft: 24 }}
        >
          {errorMessage}
        </Text>
      )}
    </Container>
  );
};

export default Input;
