import { Fade, Modal as ModalUi, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Box } from "@mui/system";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#140c27",
  color: "white",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

type ModalProps = {
  title: string;
  description: string;
  isOpen: boolean | string;
};

const Modal = ({ title, description, isOpen }: ModalProps) => {
  const [open, setOpen] = useState<boolean>(isOpen as boolean);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setOpen(isOpen as boolean);
  }, [isOpen]);

  return (
    <ModalUi
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={!!open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={!!open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
        </Box>
      </Fade>
    </ModalUi>
  );
};

export default Modal;
