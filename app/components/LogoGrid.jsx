"use client";

export default function LogoGrid({ logos }) {
  if (!logos?.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
      {logos.map((logo, i) => (
        <div key={i} className="card p-4 flex flex-col items-center">
          <img
            src={logo.png}
            alt={`Logo ${i + 1}`}
            className="rounded-lg mb-4 w-full aspect-square object-contain bg-gray-50 dark:bg-gray-900"
          />
          <a
            download={`logo-${i + 1}.png`}
            href={logo.png}
            className="text-xs underline mb-1"
          >
            Download PNG
          </a>
          {logo.svg && (
            <a
              download={`logo-${i + 1}.svg`}
              href={`data:image/svg+xml;base64,${btoa(logo.svg)}`}
              className="text-xs underline"
            >
              Download SVG
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
