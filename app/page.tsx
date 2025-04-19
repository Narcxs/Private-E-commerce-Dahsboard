import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="w-full h-screen bg-white shadow-accent-foreground">
      <header className="w-full h-16 bg-white">
        <Navbar />
      </header>
      <main className="w-full h-full px-6 mx-auto max-w-7xl mt-40">
        <HeroSection />
      </main>
    </div>
  );
}
