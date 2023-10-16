import Styled from "styled-components";
import Game from "./Game";
import Chat from "./Chat";

const Main = Styled.div`
  display: flex;
  background: #f2f2f2;
`;

const Play = () => {
  return (
    <Main>
      <Game />
      <Chat />
    </Main>
  );
};

export default Play;
