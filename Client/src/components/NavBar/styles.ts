import styled from "styled-components";
import Link from "next/link";

export const Navbar = styled.nav`
  width: 180px;
  background: linear-gradient(90deg, black 42%, rgba(0, 0, 0, 0) 95.14%);
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  z-index: 99;

  @media (max-width: 768px) {
    width: 130px;
  }
`;

export const User = styled.div`
  width: 50%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: 60px;
  }
`;

export const NavIcons = styled.div`
  width: 50%;
  height: 60%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

export const NavIcon = styled(Link)<{ href: string }>`
  width: 90%;
  height: 80px;
  display: flex;
  align-items: center;
  color: #808080;
  border-left: 2px solid transparent;
  transition: 0.2s;
  justify-content: center;

  &.active {
    color: #fff;
    border-left: 2px solid #fff;
    background: linear-gradient(
      90deg,
      #46239680 50%,
      rgba(20, 12, 39, 0) 93.48%
    );
  }

  &:hover {
    color: #fff;
    border-left: 2px solid #fff;
    background: linear-gradient(
      90deg,
      #46239640 50%,
      rgba(20, 12, 39, 0) 93.48%
    );
  }
`;

export const Config = styled.div`
  height: 100px;
  width: 50%;
  display: flex;
  align-items: center;
`;
