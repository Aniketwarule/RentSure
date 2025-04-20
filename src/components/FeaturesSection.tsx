
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Smart Contract Agreements",
    description: "Automate lease agreements with blockchain-based smart contracts that execute payments and enforce terms automatically.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><path d="M20 6v14H6a2 2 0 0 1-2-2V6"></path><path d="M16 2H4a2 2 0 0 0-2 2v14"></path><path d="m22 16-3-3 3-3"></path></svg>
    ),
  },
  {
    title: "Secure Google Pay Integration",
    description: "Process rent payments securely through Google Pay with automatic receipts and transaction records.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><circle cx="12" cy="12" r="10"></circle><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 6v2"></path><path d="M12 16v2"></path></svg>
    ),
  },
  {
    title: "Auto-Generated Legal Documents",
    description: "Generate professional legal documents via Google Docs API, customized to your specific rental terms and local regulations.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"></path><path d="M9 9h1"></path><path d="M9 13h6"></path><path d="M9 17h6"></path></svg>
    ),
  },
  {
    title: "Digital Signature Platform",
    description: "Sign agreements digitally with legally binding signatures that are securely stored on the blockchain.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><path d="M8 3 6 21"></path><path d="M18 12H8.5a6 6 0 1 0 0 12H18"></path><path d="m2 9 3-3 3 3"></path></svg>
    ),
  },
  {
    title: "Payment Reminders & History",
    description: "Automated reminders for upcoming rent payments and complete history of all transactions for both parties.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    ),
  },
  {
    title: "Dispute Resolution System",
    description: "Built-in mediation tools and transparent record-keeping to quickly resolve any disagreements or misunderstandings.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><polygon points="11 5 6 9 2 6 2 18 6 15 11 19 11 5"></polygon><polygon points="22 6 18 9 13 5 13 19 18 15 22 18 22 6"></polygon></svg>
    ),
  },
];

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState<Record<number, boolean>>({});
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const index = parseInt(entry.target.getAttribute("data-index") || "0");
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [index]: true }));
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    });
    
    refs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      refs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">Powerful Features</span> for Modern Rentals
          </h2>
          <p className="text-muted-foreground">
            RentSure combines cutting-edge blockchain technology with user-friendly interfaces to revolutionize the rental process for both landlords and tenants.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i}
              ref={(el) => (refs.current[i] = el)}
              data-index={i}
              className={cn(
                "card-hover bg-background rounded-xl p-6 border border-border shadow-sm",
                isVisible[i] ? "animate-scale-in" : "opacity-0"
              )}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
