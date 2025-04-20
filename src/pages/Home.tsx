
import { HeroSection } from "../components/HeroSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { WorkflowSection } from "../components/WorkflowSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { CTASection } from "../components/CTASection";
import { Layout } from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <TestimonialsSection />
      <CTASection />
    </Layout>
  );
};

export default Home;
