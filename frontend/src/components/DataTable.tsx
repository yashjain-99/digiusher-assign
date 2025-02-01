import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import InstanceCell from "./data-table/InstanceCell";
import { ArrowUpDown } from "lucide-react";
import useFetchInstances from "@/hooks/useFetchInstances";

type Instance = {
  id: string;
  unit: string;
  price_per_unit: number;
  instance_type: string;
  location: string;
};

type InstanceRow = {
  vcpu: number;
  memory: number;
  instances: Instance[];
};

interface DataTableProps {
  filter: Record<Filter, string>;
}

const columns: ColumnDef<InstanceRow>[] = [
  {
    accessorKey: "vcpu",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CPU
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-4">{row.getValue("vcpu")}</div>,
  },
  {
    accessorKey: "memory",
    header: "RAM ",
    cell: ({ row }) => <div>{`${row.getValue("memory")} GB`}</div>,
  },
  {
    accessorKey: "instances",
    header: "Instances",
    cell: ({ row }) => {
      return <InstanceCell row={row} />;
    },
  },
];

export function DataTable({ filter }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { data, isLoading } = useFetchInstances(filter);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="rounded-md border">
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
