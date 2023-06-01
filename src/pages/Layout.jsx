import { useEffect } from "react";
import styled from "styled-components";

import Navbar from "components/Navbar";
import Footer from "components/Footer";

const Container = styled.main`
  min-height: 100vh;
  padding-top: 70px;
`;

const Layout = ({
  title = "Pokedex",
  description = "Site web Pokedex like",
  children,
}) => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    document.title = title;
    document.getElementsByTagName("META")[3].content = description;

    goToTop();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
