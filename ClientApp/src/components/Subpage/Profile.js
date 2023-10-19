import styled from "styled-components";

const Main = styled.div`
  min-height: 1056px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f2f2f2;

  & .Header,
  .Body {
    max-width: 1300px;
    width: 100%;
    margin: 2rem;
    padding: 2rem;
    border: 2px solid #000;
    border-radius: 1rem;
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }

  & .Header {
  }

  & .Body {
  }
`;

const Profile = () => {
  return (
    <Main>
      <div className="Header">
        <h2>Profile</h2>
      </div>
      <div className="Body">
        <h3>Info</h3>
      </div>
    </Main>
  );
};
export default Profile;
