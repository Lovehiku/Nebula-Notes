import React from 'react';

function FormInput({ label, type = "text", value, onChange, required = false }) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
  );
}

export default FormInput;