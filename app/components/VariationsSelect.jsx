"use client";

export default function VariationsSelect({ variations, setVariations }) {
  return (
    <div className="space-y-1">
      <label className="font-medium text-sm">Variations</label>
      <select
        className="border rounded-lg px-3 py-2 w-full text-sm bg-transparent border-gray-300 dark:border-gray-700"
        value={variations}
        onChange={(e) => setVariations(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5, 6].map((v) => (
          <option key={v} value={v}>
            {v} logo{v > 1 ? "s" : ""}
          </option>
        ))}
      </select>
    </div>
  );
}
