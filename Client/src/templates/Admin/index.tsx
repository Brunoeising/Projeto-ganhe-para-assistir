import Header from "../../components/Header";
import * as S from "./styles";
import { DataGrid } from "@mui/x-data-grid";
import Button from "../Dashboard/components/Button";
import useAdmin from "./hooks/useAdmin";

const Admin = () => {
  const { columns, data, setCurrentSelecteds, isLoading } = useAdmin();

  const rows = data?.map((item) => ({
    id: item._id,
    name: item.username,
    value: item.valor,
    date: new Date(item.createdAt).toLocaleDateString("pt-BR"),
    NFT: item.nft,
    videosAssistidos: item.videosAssistidos,
  }));

  return (
    <>
      <S.Container>
        <Header />
        <S.AdminArea>
          <S.Texts>
            <S.Title>Área do administrador</S.Title>
            <p>Saques aguardando aprovação</p>
          </S.Texts>

          {!isLoading && (
            <S.TablesToAprove>
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows!}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  sx={{
                    // change color text in table
                    color: "white",
                    // change color of border checkbox, not border color of area
                    "& .MuiSvgIcon-root": {
                      color: "#462396",
                    },

                    "& .MuiDataGrid-cellCheckbox .MuiSvgIcon-root.Mui-disabled":
                      {
                        color: "gray",
                      },
                  }}
                  checkboxSelection
                  onSelectionModelChange={(newSelection: any) => {
                    setCurrentSelecteds(newSelection.selectionModel);
                  }}
                />
              </div>
            </S.TablesToAprove>
          )}

          <div
            style={{
              width: "70%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Button>APROVAR SAQUES</Button>
            <Button dangerous>REPROVAR SAQUES</Button>
          </div>
        </S.AdminArea>
      </S.Container>
    </>
  );
};

export default Admin;
