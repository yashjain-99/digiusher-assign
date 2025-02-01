import { useSelectedInstancesContext } from "@/context/SelectedInstancesProvider";
import { Button } from "./ui/button";
import { useCheckoutModalContext } from "@/context/CheckoutModalContext";

const Checkout = () => {
  const { selectedInstances } = useSelectedInstancesContext();
  const { setIsModalOpen } = useCheckoutModalContext();
  return (
    <Button
      disabled={selectedInstances.length === 0}
      onClick={() => setIsModalOpen(true)}
    >
      Checkout
    </Button>
  );
};

export default Checkout;
