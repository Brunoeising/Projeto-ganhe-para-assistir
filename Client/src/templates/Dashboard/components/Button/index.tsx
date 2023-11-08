import { Button as Btn } from "@mui/material";
import { ReactElement } from "react";

type ButtonProps = {
  children: string | ReactElement;
  onClick?: (params: any) => any;
  disabled?: boolean;
  dangerous?: boolean;
  width?: string;
};

const Button = ({
  children,
  onClick,
  disabled = false,
  dangerous = false,
  width = "33%",
}: ButtonProps) => {
  return (
    <Btn
      onClick={onClick}
      sx={{
        padding: "15px",
        width: `${width}`,
        borderRadius: "10px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        fontSize: "12px",
        "&.Mui-disabled": {
          backgroundColor: "#211638",
          color: "#fff",
          opacity: 0.8,
        },
        backgroundColor: dangerous ? "#FF0000" : "#462396",
        // hover
        "&:hover": {
          backgroundColor: dangerous ? "#FF0000" : "#462396",
          opacity: 0.8,
        },
      }}
      variant="contained"
      disabled={disabled}
    >
      {children}
    </Btn>
  );
};

export default Button;
