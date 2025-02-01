import FloatingOutlined from "./FloatingOutlined";
import { Input } from "./ui/input";

interface InputFilterProps {
  label: string;
  data: Record<Filter, string>;
  setData: React.Dispatch<React.SetStateAction<Record<Filter, string>>>;
  id: Filter;
}

const InputFilter = ({ label, data, setData, id }: InputFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [id]: e.target.value }));
  };
  return (
    <FloatingOutlined label={label}>
      <Input
        type="text"
        value={data[id]}
        id={`floating_outlined_${label}`}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1  border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        onChange={handleChange}
      />
    </FloatingOutlined>
  );
};

export default InputFilter;
