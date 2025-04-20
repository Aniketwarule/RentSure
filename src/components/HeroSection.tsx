import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export function HeroSection() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Generate particles for background effect
  const particles = Array.from({ length: 20 }).map((_, i) => {
    const size = Math.random() * 5 + 5;
    const left = Math.random() * 100;
    const animationDelay = Math.random() * 5;
    const animationDuration = Math.random() * 10 + 10;
    
    return (
      <div 
        key={i}
        className="particle"
        style={{ 
          width: size, 
          height: size,
          left: `${left}%`,
          animationDelay: `${animationDelay}s`,
          animationDuration: `${animationDuration}s`
        }}
      />
    );
  });

  // Calculate transform values based on mouse position
  const calculateTransform = (baseX, baseY, strength = 15) => {
    if (!sectionRef.current) return '';
    
    const rect = sectionRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate distance from center (as a percentage)
    const moveX = ((mousePosition.x - centerX) / centerX) * strength;
    const moveY = ((mousePosition.y - centerY) / centerY) * strength;
    
    return `translate(${baseX + moveX}px, ${baseY + moveY}px)`;
  };
  
  return (
    <div ref={sectionRef} className="relative pt-20 overflow-hidden">
      {/* Interactive spotlight effect */}
      <div 
        className="absolute rounded-full w-96 h-96 bg-primary/10 filter blur-3xl"
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
          opacity: 0.5,
          transition: 'left 0.2s ease-out, top 0.2s ease-out',
        }}
      />
      
      {/* Animated background particles */}
      <div className="particles-container">
        {particles}
      </div>
      
      <div className="container mx-auto px-4 pt-16 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              <span className="text-gradient">Blockchain-Powered</span>
              <br />
              Rental Agreements
            </h1>
            <p className="text-xl text-muted-foreground">
              Secure, transparent, and automated rental contracts with integrated payments and legal documentation for landlords and tenants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="text-lg hover-button"
                onClick={() => navigate("/register", { state: { type: "landlord" } })}
              >
                List your Property
              </Button>
            </div>
            <div className="flex items-center pt-2 text-sm text-muted-foreground">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2 text-primary" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                />
              </svg>
              Advanced blockchain security with automatic payments
            </div>
          </div>
          
          <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
            <div className="relative hover-card-wrapper">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl rounded-full transform -rotate-6"
                style={{
                  transform: `${calculateTransform(0, 0, 10)} rotate(-6deg)`,
                  transition: 'transform 0.1s ease-out',
                }}
              ></div>
              <div 
                className="relative glass dark:glass-dark rounded-2xl overflow-hidden border border-primary/20 shadow-xl"
                style={{
                  transform: calculateTransform(0, 0, 5),
                  transition: 'transform 0.1s ease-out',
                }}
              >
                <div className="grid grid-cols-3 gap-4 p-6">
                  <div className="col-span-3 flex items-center justify-between mb-4">
                    <div className="text-lg font-bold">Smart Rental Contract</div>
                    <div className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">Active</div>
                  </div>
                  
                  <div className="col-span-3 bg-background/60 dark:bg-background/40 p-4 rounded-lg hover-element">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium">Property</div>
                      <div className="text-sm">Verified ✓</div>
                    </div>
                    <div className="text-muted-foreground text-xs mt-1">123 Main St, Apt 4B</div>
                  </div>
                  
                  <div className="col-span-2 bg-background/60 dark:bg-background/40 p-4 rounded-lg hover-element">
                    <div className="text-sm font-medium">Monthly Rent</div>
                    <div className="flex items-center mt-1">
                      <div className="font-bold">$2,150</div>
                      <div className="ml-2 text-xs px-2 py-0.5 bg-accent/20 text-accent rounded-full">Autopay</div>
                    </div>
                  </div>
                  
                  <div className="bg-background/60 dark:bg-background/40 p-4 rounded-lg hover-element">
                    <div className="text-sm font-medium">Term</div>
                    <div className="text-muted-foreground text-xs mt-1">12 months</div>
                  </div>
                  
                  <div className="col-span-3 bg-background/60 dark:bg-background/40 p-4 rounded-lg hover-element">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium">Next Payment</div>
                      <div className="text-xs text-primary">10 days</div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div className="bg-primary h-2 rounded-full" style={{width: '70%'}}></div>
                    </div>
                  </div>
                  
                  <div className="col-span-3 flex space-x-2 mt-2">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse-soft"></div>
                    <div className="text-xs">Smart contract secured on blockchain</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}