export default function LandingPage() {
  return (
    <main className="-mx-4 sm:-mx-6 lg:-mx-8">
      <section className="text-center py-24 sm:py-28 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 tracking-tight">
          Create Stunning Logos with <span className="text-indigo-600">AI</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          Aiexor turns your ideas into professional, vector-ready logos in seconds.
          No design skills required.
        </p>
        <div className="flex justify-center gap-4 mb-10">
          <a href="/app" className="btn-primary text-lg px-8 py-3 rounded-xl">
            Launch App
          </a>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition"
          >
            View Pricing
          </a>
        </div>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "AI-Powered Logo Creation",
              desc: "Describe your idea and let Aiexor generate beautiful logos in seconds."
            },
            {
              title: "Vector-Ready Output",
              desc: "Download crisp SVG files ready for print, digital, and branding."
            },
            {
              title: "Flexible Styles",
              desc: "Minimalist, mascot, geometric, 3D, luxury, graffiti and more."
            }
          ].map((f) => (
            <div key={f.title} className="card p-6">
              <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="pricing"
        className="py-20 bg-black text-white text-center -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-4xl font-bold mb-10">Simple Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-gray-300 mb-4 text-sm">Try the basics</p>
            <p className="text-4xl font-bold mb-4">$0</p>
            <ul className="text-left space-y-2 text-gray-300 text-sm mb-6">
              <li>✔ 5 Logo generations</li>
              <li>✔ PNG downloads</li>
              <li>❌ Vectorized SVG</li>
            </ul>
            <a href="/login" className="btn-primary w-full justify-center">
              Start Free
            </a>
          </div>

          <div className="bg-gradient-to-b from-indigo-500 to-indigo-700 p-8 rounded-2xl shadow-xl border border-indigo-400">
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-indigo-50 mb-4 text-sm">
              Best for creators & businesses
            </p>
            <p className="text-4xl font-bold mb-4">$15/mo</p>
            <ul className="text-left space-y-2 mb-6 text-indigo-50 text-sm">
              <li>✔ Unlimited logo generations</li>
              <li>✔ PNG & SVG downloads</li>
              <li>✔ Commercial use license</li>
              <li>✔ Priority queue</li>
            </ul>
            <a
              href="/subscribe?plan=pro"
              className="inline-flex items-center justify-center rounded-lg px-4 py-2 bg-black text-white font-semibold hover:bg-gray-900 transition w-full"
            >
              Go Pro
            </a>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
            <p className="text-gray-300 mb-4 text-sm">Teams & agencies</p>
            <p className="text-4xl font-bold mb-4">$49/mo</p>
            <ul className="text-left space-y-2 text-gray-300 text-sm mb-6">
              <li>✔ 5 Team members</li>
              <li>✔ API access</li>
              <li>✔ Priority support</li>
            </ul>
            <a href="/contact" className="btn-primary w-full justify-center">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
