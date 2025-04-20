
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Create Account & Verify Identity",
    description: "Sign up as a landlord or tenant and verify your identity using Google OAuth for enhanced security.",
    number: "01",
  },
  {
    title: "Connect Digital Wallet",
    description: "Link your digital wallet to enable blockchain-powered contract creation and secure payment processing.",
    number: "02",
  },
  {
    title: "Create or Accept Rental Agreement",
    description: "Landlords create rental terms while tenants review and accept agreements with full transparency.",
    number: "03",
  },
  {
    title: "Sign Documents Digitally",
    description: "Both parties sign legally binding documents that are stored securely on the blockchain.",
    number: "04",
  },
  {
    title: "Setup Automatic Payments",
    description: "Configure Google Pay for recurring rent payments with automated receipts and notifications.",
    number: "05",
  },
];

export function WorkflowSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section ref={sectionRef} className="py-20 gradient-bg">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">How It Works</span>
          </h2>
          <p className="text-muted-foreground">
            RentSure simplifies the entire rental process with a streamlined workflow that saves time and provides peace of mind.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div 
              key={i}
              className={cn(
                "flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 relative",
                isVisible ? "animate-fade-in" : "opacity-0"
              )}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {/* Line connecting steps */}
              {i < steps.length - 1 && (
                <div className="absolute left-6 md:left-10 top-16 bottom-0 w-px bg-border md:h-full" style={{ transform: "translateX(-50%)" }}></div>
              )}
              
              {/* Step number */}
              <div className="flex-shrink-0 w-12 h-12 md:w-20 md:h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg md:text-2xl border border-primary/20 z-10">
                {step.number}
              </div>
              
              {/* Step content */}
              <div className="flex-grow glass dark:glass-dark rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
