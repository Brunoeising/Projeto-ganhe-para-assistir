import { useState } from "react";
import { useQuery } from "react-query";
import { WVWServices } from "../../../services/http/WVWServides/WVWServices";

const useAdmin = () => {
  const [currentSelecteds, setCurrentSelecteds] = useState([]);
  const { data, isLoading } = useQuery(
    ["solicitacoesSaque"],
    WVWServices.getSolicitacoesSaque
  );

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nome", width: 130 },
    { field: "value", headerName: "Valor", width: 130 },
    { field: "date", headerName: "Data", width: 130 },
    { field: "NFT", headerName: "NFT", width: 130 },
    { field: "videosAssistidos", headerName: "Videos assistidos", width: 130 },
  ];

  return { data, columns, currentSelecteds, setCurrentSelecteds, isLoading };
};

export default useAdmin;
