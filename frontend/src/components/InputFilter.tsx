import FloatingOutlined from "./FloatingOutlined";
import { Input } from "./ui/input";

interface InputFilterProps {
  label: string;
  filter: Record<Filter, string>;
  setFilter: React.Dispatch<React.SetStateAction<Record<Filter, string>>>;
  id: Filter;
}

const InputFilter = ({ label, filter, setFilter, id }: InputFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter((prev) => ({ ...prev, [id]: e.target.value }));
  };
  return (
    <FloatingOutlined label={label} className="min-w-[20%]">
      <Input
        type="text"
        value={filter[id]}
        id={`floating_outlined_${label}`}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        onChange={handleChange}
      />
    </FloatingOutlined>
  );
};

export default InputFilter;
