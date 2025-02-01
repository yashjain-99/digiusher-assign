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
  data: Record<Filter, string>;
  setData: React.Dispatch<React.SetStateAction<Record<Filter, string>>>;
  id: Filter;
  options: { id: string; label: string }[];
}

const SelectFilter = ({
  label,
  data,
  setData,
  id,
  options,
}: SelectFilterProps) => {
  const handleChange = (val: string) => {
    setData((prev) => ({ ...prev, [id]: val }));
  };
  return (
    <FloatingOutlined label={label}>
      <Select onValueChange={handleChange} defaultValue={data[id]}>
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
