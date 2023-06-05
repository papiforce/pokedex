import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "./Layout";

import Title from "components/Title";
import Text from "components/Text";

const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FakeBtn = styled(Text)`
  ${({ theme: { colors } }) => `
    background: ${colors.purple};
  `}
  max-width: max-content;
  padding: 8px 16px;
  margin: 8px auto 0px;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Page introuvable">
      <Container>
        <div>
          <Title
            fontSize="from56to32"
            fontWeight={400}
            textAlign="center"
            style={{ marginBottom: 56 }}
          >
            Page introuvable
          </Title>

          <FakeBtn
            fontSize="font18"
            fontWeight={400}
            onClick={() => navigate("/?page=1")}
          >
            Retourner sur la page d'accueil
          </FakeBtn>
        </div>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;
