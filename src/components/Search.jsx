import React from "react";

export default function Search({ handleSearch }) {
  return (
    <div className="flex items-center">
      <input
        type="text"
        placeholder="Search item here"
        className="w-full rounded-lg"
        onChange={handleSearch}
      />
    </div>
  );
}
