import { FaUserCircle } from "react-icons/fa";
import * as S from "./styles";

type Props = {
  userImage?: string;
  size?: number;
};

const UserPhoto = ({ userImage, size = 40 }: Props) => {
  return (
    <S.UserPhoto>
      <FaUserCircle size={size} color={"#FFF"} />
    </S.UserPhoto>
  );
};

export default UserPhoto;
