import About from "@/components/About";
import Hero from "@/components/Hero";
import Pricings from "@/components/Pricings";
import RoadMap from "@/components/RoadMap";
import Services from "@/components/Services";

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <RoadMap />
      <Pricings />
    </main>
  );
};

export default Home;
