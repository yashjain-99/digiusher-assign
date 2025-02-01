import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import InputFilter from "./InputFilter";
import SelectFilter from "./SelectFilter";
import Checkout from "./CheckoutButton";

interface ConfigType {
  label: string;
  id: Filter;
  filter: Record<Filter, string>;
  setFilter: React.Dispatch<React.SetStateAction<Record<Filter, string>>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: FC<any>;
  options?: { id: string; label: string }[];
}

interface FiltersProps {
  filter: Record<Filter, string>;
  setFilter: React.Dispatch<React.SetStateAction<Record<Filter, string>>>;
}

export default function Filters({ filter, setFilter }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const config: ConfigType[] = [
    {
      label: "Cloud provider",
      id: "cloudProvider",
      filter,
      setFilter,
      component: SelectFilter,
      options: [
        { id: " ", label: "All" },
        { id: "AWS", label: "AWS" },
      ],
    },
    {
      label: "Region",
      id: "region",
      filter,
      setFilter,
      component: SelectFilter,
      options: [{ id: "EU", label: "Europe" }],
    },
    {
      label: "Currency",
      id: "currency",
      filter,
      setFilter,
      component: SelectFilter,
      options: [{ id: "EUR", label: "EUR" }],
    },
    {
      label: "Min CPU",
      id: "minCPU",
      filter,
      setFilter,
      component: InputFilter,
    },
    {
      label: "Max CPU",
      id: "maxCPU",
      filter,
      setFilter,
      component: InputFilter,
    },
    {
      label: "Min RAM",
      id: "minRAM",
      filter,
      setFilter,
      component: InputFilter,
    },
    {
      label: "Max RAM",
      id: "maxRAM",
      filter,
      setFilter,
      component: InputFilter,
    },
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="p-2 w-full">
      <CollapsibleContent className="space-y-2 flex my-2">
        <div className="flex w-full gap-2 flex-wrap">
          {config.map(({ component: FilterComponent, ...props }) => (
            <FilterComponent key={props.id} {...props} />
          ))}
        </div>
      </CollapsibleContent>
      <div className="flex w-full justify-between">
        <CollapsibleTrigger asChild>
          <Button>Filters</Button>
        </CollapsibleTrigger>
        <Checkout />
      </div>
    </Collapsible>
  );
}
