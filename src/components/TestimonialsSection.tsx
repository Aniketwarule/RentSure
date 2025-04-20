
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote: "RentSure has eliminated the paperwork headache from my rental business. Smart contracts ensure my tenants pay on time, every time.",
    author: "Michael Johnson",
    role: "Property Owner",
    avatar: "M"
  },
  {
    quote: "As a tenant, I love the transparency. I always know exactly when my rent is due, and the automatic payments mean I never miss a deadline.",
    author: "Sarah Williams",
    role: "Tenant",
    avatar: "S"
  },
  {
    quote: "The legal document generation saved me thousands in attorney fees. The templates are comprehensive and automatically adapt to local regulations.",
    author: "David Chen",
    role: "Real Estate Investor",
    avatar: "D"
  },
  {
    quote: "The dispute resolution system quickly resolved a maintenance issue with my landlord. The transparent record keeping made the process smooth.",
    author: "Jessica Miller",
    role: "Tenant",
    avatar: "J"
  },
  {
    quote: "Managing multiple properties became so much easier with RentSure. The dashboard gives me a clear overview of all my rental agreements.",
    author: "Robert Garcia",
    role: "Property Manager",
    avatar: "R"
  }
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Auto-cycle through testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Animation visibility
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
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient">What Our Users Say</span>
          </h2>
          <p className="text-muted-foreground">
            RentSure has transformed the rental experience for thousands of landlords and tenants across the country.
          </p>
        </div>
        
        <div className={cn(
          "max-w-4xl mx-auto",
          isVisible ? "animate-fade-in" : "opacity-0"
        )}>
          <div className="relative">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className={cn(
                "absolute top-0 left-0 right-0 transition-all duration-500 border border-primary/20",
                i === activeIndex ? "opacity-100 z-10 translate-y-0" : "opacity-0 z-0 translate-y-4"
              )}>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl md:text-2xl font-bold">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-grow">
                      <p className="text-lg md:text-xl italic mb-4">"{testimonial.quote}"</p>
                      <div>
                        <div className="font-semibold">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Empty card just to maintain space in the layout */}
            <Card className="invisible">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full"></div>
                  <div className="flex-grow">
                    <p className="text-lg md:text-xl italic mb-4">
                      {testimonials[activeIndex].quote}
                    </p>
                    <div>
                      <div className="font-semibold">{testimonials[activeIndex].author}</div>
                      <div className="text-sm text-muted-foreground">{testimonials[activeIndex].role}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  i === activeIndex 
                    ? "bg-primary w-6" 
                    : "bg-primary/30 hover:bg-primary/50"
                )}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
