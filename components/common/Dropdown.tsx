import React from "react";

interface DropdownProps<T extends string | number> {
  label?: string;
  options: { value: T; label: string }[];
  value: T | T[];
  onChange: (value: any) => void;
  isMulti?: boolean;
  placeholder?: string;
}

const Dropdown = <T extends string | number>({
  label,
  options,
  value,
  onChange,
  isMulti = false,
  placeholder = "Select an option",
}: DropdownProps<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isMulti) {
      const selectedOptions = Array.from(e.target.selectedOptions).map(
        (option) => option.value as T
      );
      onChange(selectedOptions);
    } else {
      onChange(e.target.value as T);
    }
  };

  const stringValue = Array.isArray(value)
    ? value.map((v) => String(v))
    : value
    ? String(value)
    : "";

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        {isMulti && Array.isArray(value) && value.length > 0 && (
          <span className="text-sm text-gray-500">
            (
            {options
              .filter((opt) => value.includes(opt.value))
              .map((opt) => opt.label)
              .join(", ")}
            )
          </span>
        )}
      </div>
      <div className="relative mt-1">
        <select
          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primaryDash focus:border-primaryDash"
          value={stringValue}
          onChange={handleChange}
          multiple={isMulti}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
