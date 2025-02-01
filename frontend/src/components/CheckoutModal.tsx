import { useCheckoutModalContext } from "@/context/CheckoutModalContext";
import { useSelectedInstancesContext } from "@/context/SelectedInstancesProvider";
import Modal from "react-modal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";

const customStyles = {
  content: {
    top: "62px",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, 0)",
    zIndex: "50",
    borderRadius: "16px",
    paddingTop: "32px",
    paddingBottom: "32px",
    paddingLeft: "32px",
    paddingRight: "32px",
    maxWidth: "900px",
    width: "90%",
    background: "linear-gradient(135deg, #D1C4E9, #ffffff)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: "40",
    transition: "opacity 0.3s ease-in-out",
  },
};

Modal.setAppElement("#root");

const CheckoutModal = () => {
  const { isModalOpen, setIsModalOpen } = useCheckoutModalContext();
  const { selectedInstances } = useSelectedInstancesContext();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      accessorKey: "instance_type",
      header: "Instance Type",
      cell: ({ row }: { row: Row<Instance> }) => (
        <div>{row.getValue("instance_type")}</div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }: { row: Row<Instance> }) => (
        <div>{row.getValue("location")}</div>
      ),
    },
    {
      accessorKey: "vcpu",
      header: "vCPUs",
      cell: ({ row }: { row: Row<Instance> }) => (
        <div>{row.getValue("vcpu")}</div>
      ),
    },
    {
      accessorKey: "memory",
      header: "Memory (GB)",
      cell: ({ row }: { row: Row<Instance> }) => (
        <div>{row.getValue("memory")}</div>
      ),
    },
    {
      accessorKey: "price_per_unit",
      header: "Price per Unit",
      cell: ({ row }: { row: Row<Instance> }) => (
        <div>
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(row.getValue("price_per_unit"))}
        </div>
      ),
    },
  ];

  const calculateTotalPrice = (): number => {
    return (
      selectedInstances.reduce(
        (total, instance) => total + (instance.price_per_unit ?? 0),
        0
      ) * 24
    );
  };

  const totalPrice = calculateTotalPrice();

  const table = useReactTable({
    data: selectedInstances,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      style={customStyles}
      contentLabel="Pipeline Analysis Results"
    >
      <div>
        <h2 className="font-bold text-lg">Checkout Summary</h2>
        <div className="mt-4">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No instances selected.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Show total price */}
        <div className="mt-6">
          <strong>
            Total Price:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalPrice)}{" "}
            per Day
          </strong>
        </div>

        {/* Close button */}
        <div className="mt-4">
          <Button onClick={closeModal} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckoutModal;
