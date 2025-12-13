"use client";

import { useEffect, useState } from "react";

const steps = [
  {
    title: "Welcome to Aiexor",
    desc: "Generate professional logos by describing your brand and preferences."
  },
  {
    title: "Choose style & color",
    desc: "Pick from many presets and fine-tune with your brand colors."
  },
  {
    title: "Download your logo",
    desc: "Export PNG and SVG files ready for use anywhere."
  }
];

export default function OnboardingModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const done = localStorage.getItem("aiexor_onboarding_done");
    if (!done) setOpen(true);
  }, []);

  function next() {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      if (typeof window !== "undefined") {
        localStorage.setItem("aiexor_onboarding_done", "1");
      }
      setOpen(false);
    }
  }

  if (!open) return null;

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="card max-w-md w-full p-6 relative">
        <button
          onClick={() => {
            setOpen(false);
            if (typeof window !== "undefined") {
              localStorage.setItem("aiexor_onboarding_done", "1");
            }
          }}
          className="absolute top-3 right-3 text-xs text-gray-500"
        >
          Skip
        </button>
        <p className="text-xs text-gray-500 mb-2">
          Step {step + 1} of {steps.length}
        </p>
        <h3 className="text-xl font-semibold mb-2">{current.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
          {current.desc}
        </p>
        <button onClick={next} className="btn-primary w-full justify-center">
          {step === steps.length - 1 ? "Get started" : "Next"}
        </button>
      </div>
    </div>
  );
}
