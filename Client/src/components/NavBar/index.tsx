import * as S from "./styles";
import { FaHome } from "react-icons/fa";

import { BsGear } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";

import { useRouter } from "next/router";
import Image from "next/image";
import useUser from "../../hooks/useUser";

const NavBar = () => {
  const { asPath } = useRouter();
  const { data } = useUser();

  return (
    <S.Navbar>
      <S.User>
        <Image
          alt="logo"
          src="/logo.png"
          width={200}
          height={200}
          style={{
            width: "74%",
            height: "74%",
          }}
        />
      </S.User>
      <S.NavIcons>
        <S.NavIcon className={asPath == "/" ? "active" : ""} href={"/"}>
          <FaHome size={25} />
        </S.NavIcon>
        {data?.roles?.includes("admin") && (
          <S.NavIcon
            className={asPath == "/admin" ? "active" : ""}
            href={"/admin"}
          >
            <RiAdminFill size={25} />
          </S.NavIcon>
        )}
      </S.NavIcons>
      <S.Config>
        <S.NavIcon
          className={asPath == "/dashboard" ? "active" : ""}
          href={"/dashboard"}
        >
          <BsGear size={25} />
        </S.NavIcon>
      </S.Config>
    </S.Navbar>
  );
};

export default NavBar;
