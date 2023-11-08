import styled from "styled-components";

export const Container = styled.div`
  height: 290px;

  margin-left: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.2s;

  @media (max-width: 768px) {
    margin-left: 40px;
    height: 250px;
  }
`;

export const Title = styled.div`
  color: white;
  font-size: 12px;
  padding-left: 6px;

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

export const VideoList = styled.div``;
