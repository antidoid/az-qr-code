import React from "react";

export default function Style({
  style,
  setStyle,
}: {
  style: string;
  setStyle: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="mt-3 flex flex-col">
      <label htmlFor="styles" className="text-xl">
        Style
      </label>
      <select
        id="styles"
        className="w-3/5 p-3 bg-gray-100 text-gray-900 rounded-lg mt-2 cursor-pointer"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
      >
        <option>square</option>
        <option>gapped-square</option>
        <option>circle</option>
        <option>rounded</option>
        <option>vertical</option>
        <option>horizontal</option>
      </select>
    </div>
  );
}
