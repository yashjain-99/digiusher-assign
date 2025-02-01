import { createContext, ReactNode, useContext, useState } from "react";

interface CheckoutModalType {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<undefined | CheckoutModalType>(undefined);

const CheckoutModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useCheckoutModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useCheckoutModalContext must be used within a CheckoutModalProvider"
    );
  }
  return context;
};

export default CheckoutModalProvider;
