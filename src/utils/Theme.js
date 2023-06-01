const Theme = {
  screens: {
    smallMobile: 375,
    mobile: 480,
    tablet: 768,
    smallDesktop: 1024,
    desktop: 1280,
    maxDesktop: 1440,
  },
  colors: {
    white: "#FFFFFF",
    white30: "rgba(255, 255, 255, 0.3)",
    purple: "#7F5AF0",
    green: "#2CB67D",
    greyDark: "#16161A",
    greyLight: "#242629",
    yellow: "#FFA500",
    red: "#8B0000",
    transparent: "transparent",
  },
  fontSize: {
    font14: "14px",
    font16: "16px",
    font18: "18px",
    font24: "24px",
    font32: "32px",
    from20to14: "clamp(0.875rem, 3vw, 1.25rem)",
    from40to24: "clamp(1.5rem, 5vw, 2.5rem)",
    from56to32: "clamp(2rem, 6vw, 3.5rem)",
  },
};

export default Theme;
