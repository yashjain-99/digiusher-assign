import {
  createContext,
  ReactNode,
  useContext,
  useState,
  ReactElement,
} from "react";

interface SelectedInstancesType {
  selectedInstances: Instance[];
  setSelectedInstances: React.Dispatch<React.SetStateAction<Instance[]>>;
}

const SelectedInstancesContext = createContext<
  SelectedInstancesType | undefined
>(undefined);

const SelectedInstancesProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [selectedInstances, setSelectedInstances] = useState<Instance[]>([]);

  return (
    <SelectedInstancesContext.Provider
      value={{ selectedInstances, setSelectedInstances }}
    >
      {children}
    </SelectedInstancesContext.Provider>
  );
};

export const useSelectedInstancesContext = (): SelectedInstancesType => {
  const context = useContext(SelectedInstancesContext);

  if (!context) {
    throw new Error(
      "useSelectedInstancesContext must be used within a SelectedInstancesProvider"
    );
  }

  return context;
};

export default SelectedInstancesProvider;
