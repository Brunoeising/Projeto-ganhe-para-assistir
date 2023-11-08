import { FaUserCircle } from "react-icons/fa";
import { NFT, User } from "../../../../../@types";
import * as S from "../../styles";
import Image from "next/image";
import { LinearProgress } from "@mui/material";

type UserAreaProps = {
  user: User | undefined;
  nft: NFT | undefined;
};

const UserArea = ({ user, nft }: UserAreaProps) => {
  const dateUserCreated = new Date(user?.createdAt!).getTime();
  const dateNftExpires = new Date(nft?.dayNFTExpires!).getTime();
  const dateNftExpiresFormatted = new Date(
    nft?.dayNFTExpires!
  ).toLocaleDateString("pt-BR");

  const diasUsados = (Date.now() - dateUserCreated) / (24 * 60 * 60 * 1000);
  const diasTotais = (dateNftExpires - dateUserCreated) / (24 * 60 * 60 * 1000);
  const diasQuePassaramEmPorcentagem = (diasUsados / diasTotais) * 100;

  const diasRestantes = Math.floor(diasTotais - diasUsados);
  const tokensGanhos = user?.earnedTokens!;
  const tokensGanhosPorDia = nft?.recompensa! * nft?.limite_dia!;
  const tokensQuePodemSerGanhos = diasRestantes * tokensGanhosPorDia;

  return (
    <S.UserArea>
      <div className="userHeader">
        <FaUserCircle size={70} />
        <p>{user?.wallet}</p>
        <h1>{user?.username}</h1>
      </div>
      <S.UserStatsArea>
        <div className="userStats">
          <div className="userStatsHeader">
            <h1>Estátisticas</h1>
          </div>
          <div className="userStatsBody">
            <S.UserStatsItem>
              <h1>Recebi</h1>
              <p>{user?.earnedTokens} WVW</p>
            </S.UserStatsItem>
            <S.UserStatsItem>
              <h1>Assisti</h1>
              <p>{user?.videosWatched} Videos</p>
            </S.UserStatsItem>
          </div>
          <div className="userStatsHeader">
            <h1>Meu ticket</h1>
          </div>
          <div className="userStatsBody">
            <S.TicketArea>
              <S.Ticket>
                <Image
                  src="/ticket.png"
                  alt="Ticket"
                  width={190}
                  height={220}
                  style={{
                    width: "90%",
                  }}
                />
              </S.Ticket>
              <S.TicketInfo>
                <S.TicketStats>
                  <h1>Videos por dia</h1>
                  <p>
                    {user?.videosWatchedToday}/{nft?.limite_dia}
                  </p>
                </S.TicketStats>
                <S.TicketStats>
                  <h1>Tokens por video</h1>
                  <p>{nft?.recompensa}</p>
                </S.TicketStats>
                <S.TicketStats>
                  <h1>Tokens ganhos hoje</h1>
                  <p>{user?.tokensEarnedToday}</p>
                </S.TicketStats>
              </S.TicketInfo>
            </S.TicketArea>
            <S.ProgressBarArea>
              <S.ProgressBarItem>
                <h1>Expiração do Ticket</h1>
                <LinearProgress
                  variant="determinate"
                  sx={{
                    height: "10px",
                    backgroundColor: "#0d071b",
                    borderRadius: "10px",
                    width: "100%",
                  }}
                  color="secondary"
                  value={diasQuePassaramEmPorcentagem}
                />
                <p>Sua NFT expira dia {dateNftExpiresFormatted}</p>
              </S.ProgressBarItem>
              <S.ProgressBarItem center={true}>
                <h1>Quanto ainda posso ganhar?</h1>
                <p>
                  Você ainda pode ganhar ate{" "}
                  <b>{tokensQuePodemSerGanhos - tokensGanhos} WVW</b>
                </p>
              </S.ProgressBarItem>
            </S.ProgressBarArea>
          </div>
        </div>
      </S.UserStatsArea>
    </S.UserArea>
  );
};

export default UserArea;
