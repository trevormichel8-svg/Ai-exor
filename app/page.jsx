import LogoForm from "./components/LogoForm";
import OnboardingModal from "./components/OnboardingModal";

export default function AppPage() {
  return (
    <main className="py-10">
      <OnboardingModal />
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Aiexor AI Logo Studio
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
        Describe your brand, pick a style and color, and let AI generate
        production-ready logos for you.
      </p>
      <LogoForm />
    </main>
  );
}
