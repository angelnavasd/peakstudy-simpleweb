import Hero from "@/components/hero"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Footer />
    </div>
  );
}
