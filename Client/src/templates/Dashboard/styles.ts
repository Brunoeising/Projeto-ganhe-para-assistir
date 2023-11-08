import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1600px;
  height: 100%;
  color: white;

  h1 {
    font-size: 1.4rem;
  }

  p {
    color: #828282;
  }

  @media (max-width: 1000px) {
    h1 {
      font-size: 1.2rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;

export const Dashboard = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px 70px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 500px) {
    padding: 0px;
    padding-left: 40px;
  }
`;

export const InformationsArea = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const ButtonsArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CardsArea = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 420px) {
    flex-direction: column;
    gap: 5px;
  }
`;

export const UserArea = styled.div`
  background-color: #080808;
  width: 35%;
  max-width: 400px;
  border-radius: 20px;
  max-height: 1000px;

  .userHeader {
    background-color: #141414;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
    border-radius: 20px 20px 0 0;
    padding: 20px 0;

    p {
      color: #828282;
      font-size: 0.8em;
    }

    h1 {
      font-size: 1.2em;
    }
  }

  @media (max-width: 1000px) {
    width: 95%;
    height: auto;
  }
`;

export const UserStatsArea = styled.div`
  padding: 20px;

  .userStatsHeader {
    height: 60px;
    display: flex;
    align-items: center;

    h1 {
      font-size: 1.2em;
    }
  }
`;

export const UserStatsItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0px 20px;
  gap: 10px;

  h1 {
    font-size: 0.8em;
  }
  p {
    color: #828282;
    font-size: 0.8em;
  }
`;

export const Ticket = styled.div`
  width: 50%;
  display: flex;
`;

export const TicketArea = styled.div`
  width: 100%;

  display: flex;
`;

export const TicketInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

export const TicketStats = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50px;
  padding: 0px 20px;
  gap: 10px;

  h1 {
    font-size: 0.8em;
  }
  p {
    color: #828282;
    font-size: 0.8em;
  }
`;

export const ProgressBarArea = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ProgressBarItem = styled.div<{ center?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  h1 {
    text-align: center;
    font-size: 0.8em;
  }

  p {
    text-align: ${(props) => (props.center ? "center" : "left")};
    font-size: 0.8em;
  }
`;
