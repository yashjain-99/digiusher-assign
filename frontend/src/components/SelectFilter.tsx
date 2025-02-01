import FloatingOutlined from "./FloatingOutlined";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFilterProps {
  label: string;
  filter: Record<Filter, string>;
  setFilter: React.Dispatch<React.SetStateAction<Record<Filter, string>>>;
  id: Filter;
  options: { id: string; label: string }[];
}

const SelectFilter = ({
  label,
  filter,
  setFilter,
  id,
  options,
}: SelectFilterProps) => {
  const handleChange = (val: string) => {
    setFilter((prev) => ({ ...prev, [id]: val }));
  };
  return (
    <FloatingOutlined label={label} className="min-w-[30%]">
      <Select onValueChange={handleChange} defaultValue={filter[id]}>
        <SelectTrigger>
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FloatingOutlined>
  );
};

export default SelectFilter;
