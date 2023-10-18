import Styled from "styled-components";
import Leaderboard from "./Leaderboard";

const Main = Styled.div`
  min-height: 1056px;
  display: flex;
  flex-direction: row;
  background: #f2f2f2;
`;

const General = Styled.div`
  width: 75%;
  margin-top: 2rem;

  & .Text {
    min-height: 550px;
    margin: 2rem;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    & h2 {
      margin-bottom: 2rem;
      text-align: center;
    }
  }
`;

const Home = () => {
  return (
    <Main>
      <General>
        <div className="Text">
          <h2>Welcome to SPAG!</h2>
          <p>lsdokfdghjfg</p>
        </div>
      </General>
      <Leaderboard />
    </Main>
  );
};
export default Home;
