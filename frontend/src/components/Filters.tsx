import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import InputFilter from "./InputFilter";
import SelectFilter from "./SelectFilter";

interface ConfigType {
  label: string;
  id: Filter;
  data: Record<Filter, string>;
  setData: React.Dispatch<React.SetStateAction<Record<Filter, string>>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: FC<any>;
  options?: { id: string; label: string }[];
}

interface FiltersProps {
  data: Record<Filter, string>;
  setData: React.Dispatch<React.SetStateAction<Record<Filter, string>>>;
}

export default function Filters({ data, setData }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const config: ConfigType[] = [
    {
      label: "Cloud provider",
      id: "cloudProvider",
      data,
      setData,
      component: SelectFilter,
      options: [
        { id: " ", label: "All" },
        { id: "AWS", label: "AWS" },
      ],
    },
    {
      label: "Region",
      id: "region",
      data,
      setData,
      component: SelectFilter,
      options: [{ id: "EU", label: "Europe" }],
    },
    {
      label: "Currency",
      id: "currency",
      data,
      setData,
      component: SelectFilter,
      options: [{ id: "EUR", label: "EUR" }],
    },
    {
      label: "Min CPU",
      id: "minCPU",
      data,
      setData,
      component: InputFilter,
    },
    {
      label: "Max CPU",
      id: "maxCPU",
      data,
      setData,
      component: InputFilter,
    },
    {
      label: "Min RAM",
      id: "minRAM",
      data,
      setData,
      component: InputFilter,
    },
    {
      label: "Max RAM",
      id: "maxRAM",
      data,
      setData,
      component: InputFilter,
    },
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="p-2 w-full">
      <CollapsibleContent className="space-y-2 flex my-2">
        <div className="flex w-full gap-2">
          {config.map(({ component: FilterComponent, ...props }) => (
            <FilterComponent key={props.id} {...props} />
          ))}
        </div>
      </CollapsibleContent>
      <CollapsibleTrigger asChild>
        <Button>Filters</Button>
      </CollapsibleTrigger>
    </Collapsible>
  );
}
