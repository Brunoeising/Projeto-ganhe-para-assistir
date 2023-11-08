import { Button as Btn } from "@mui/material";
import { ReactElement } from "react";

type ButtonProps = {
  children: string;
  onClick?: (params: any) => any;
};

const ButtonMaterialUI = ({ children, onClick }: ButtonProps) => {
  return (
    <Btn
      onClick={onClick}
      sx={{
        padding: "15px",
        width: "33%",
        borderRadius: "10px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        fontSize: "12px",
      }}
      variant="contained"
    >
      {children}
    </Btn>
  );
};

export default ButtonMaterialUI;
