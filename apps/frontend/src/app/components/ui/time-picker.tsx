import React from 'react';

interface TimePickerProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  label,
  value,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="mx-2">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={handleChange}
        className="w-full px-2 py-1 border rounded"
      >
        {Array.from({ length: 24 }, (_, index) => (
          <option key={index} value={index}>
            {index}:00
          </option>
        ))}
      </select>
    </div>
  );
};
