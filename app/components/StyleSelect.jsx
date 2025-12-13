"use client";

import { LOGO_STYLES } from "@/lib/utils";

export default function StyleSelect({ style, setStyle }) {
  return (
    <div className="space-y-1">
      <label className="font-medium text-sm">Logo style</label>
      <select
        className="border rounded-lg px-3 py-2 w-full text-sm bg-transparent border-gray-300 dark:border-gray-700"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
      >
        {LOGO_STYLES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
