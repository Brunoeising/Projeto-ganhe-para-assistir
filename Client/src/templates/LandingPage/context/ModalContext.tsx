import React, { createContext, useContext, useState } from "react";

type ModalContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const ModalContext = createContext({} as ModalContextType);

export const useModal = () => useContext<ModalContextType>(ModalContext);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
