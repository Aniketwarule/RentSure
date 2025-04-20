
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function CTASection() {
  const navigate = useNavigate();
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-90"></div>
          
          <div className="relative z-10 px-6 py-16 md:py-20 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your rental experience?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of landlords and tenants who are already enjoying secure, transparent, and hassle-free rental agreements with RentSure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => navigate("/register", { state: { type: "landlord" } })}
              >
                Get Started as Landlord
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/register", { state: { type: "tenant" } })}
              >
                Get Started as Tenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
