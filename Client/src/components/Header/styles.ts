import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
`;

export const NavItems = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const NavIcon = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Main = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoArea = styled.div`
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  padding-left: 10px;
  background-color: transparent;
  outline: none;
  border-radius: 4px;
  border: 1px solid #520283;
`;

export const User = styled.div`
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
