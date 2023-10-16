import Styled from "styled-components";
import Game from "./Game";
import Chat from "./Chat";

const Main = Styled.div`
display:flex;
flex-direction:row;
justify-content: space-between;
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
