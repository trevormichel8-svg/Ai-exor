"use client";

import { useState } from "react";

import ColorPicker from "./ColorPicker";
import StyleSelect from "./StyleSelect";
import VariationsSelect from "./VariationsSelect";
import LogoGrid from "./LogoGrid";

export default function LogoForm() {
  // Form state
  const [prompt, setPrompt] = useState("");
  const [brand, setBrand] = useState("");
  const [tagline, setTagline] = useState("");
  const [color, setColor] = useState("#000000");
  const [style, setStyle] = useState("Minimal");
  const [variations, setVariations] = useState(1);

  // UI state
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateLogos() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          brandName: brand,
          tagline,
          color,
          style,
          variations,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setLogos(data.images || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* FORM */}
        <div className="space-y-4">
          <textarea
            className="border rounded p-2 w-full"
            placeholder="Describe your logo"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <input
            className="border rounded p-2 w-full"
            placeholder="Brand name"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <input
            className="border rounded p-2 w-full"
            placeholder="Tagline (optional)"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />

          <ColorPicker color={color} setColor={setColor} />
          <StyleSelect style={style} setStyle={setStyle} />
          <VariationsSelect
            variations={variations}
            setVariations={setVariations}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={generateLogos}
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Generating..." : "Generate Logos"}
          </button>
        </div>

        {/* RESULTS */}
        <LogoGrid logos={logos} />
      </div>
    </div>
  );
}

