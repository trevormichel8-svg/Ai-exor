"use client";

export default function ColorPicker({ color, setColor }) {
  return (
    <div className="space-y-1">
      <label className="font-medium text-sm">Primary color</label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-700"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <input
          type="text"
          className="border rounded-lg px-3 py-2 text-sm w-32 bg-transparent border-gray-300 dark:border-gray-700"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </div>
  );
}
