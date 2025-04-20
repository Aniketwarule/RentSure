
import { Layout } from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Wallet, 
  FileText, 
  MessageSquare, 
  CalendarClock,
  Smartphone,
  Lock,
  Landmark,
  Clock,
  CheckCircle2,
  FileSignature,
  Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();
  
  const mainFeatures = [
    {
      icon: ShieldCheck,
      title: "Blockchain Smart Contracts",
      description: "Secure, tamper-proof rental agreements stored on the blockchain for maximum security and transparency."
    },
    {
      icon: Wallet,
      title: "Google Pay Integration",
      description: "Seamless payment processing with Google Pay for both rent collection and security deposits."
    },
    {
      icon: FileText,
      title: "Automated Document Generation",
      description: "Legal documents automatically generated and customized to your specific requirements and local laws."
    },
    {
      icon: FileSignature,
      title: "Digital Signatures",
      description: "Legally binding digital signatures that make finalizing agreements quick and convenient."
    },
    {
      icon: MessageSquare,
      title: "Tenant Communication",
      description: "Built-in messaging system for streamlined communication between landlords and tenants."
    },
    {
      icon: CalendarClock,
      title: "Payment Reminders",
      description: "Automated reminders for upcoming payments to help reduce late payments."
    }
  ];
  
  const additionalFeatures = [
    { icon: Smartphone, text: "Mobile-optimized interface" },
    { icon: Lock, text: "Bank-level security" },
    { icon: Landmark, text: "Compliance with local regulations" },
    { icon: Clock, text: "24/7 access to agreements" },
    { icon: CheckCircle2, text: "Maintenance request tracking" },
    { icon: Phone, text: "Dedicated support team" }
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
            Powerful Features for Modern <span className="text-gradient">Landlords</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            RentSure combines blockchain technology with powerful tools to transform how you manage rental properties
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/register")}>
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/")}>
              Learn More
            </Button>
          </div>
        </div>
        
        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <Card key={index} className="border-2 transition-all hover:border-primary/50 hover:shadow-md">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        
        {/* Additional Features Section */}
        <div className="bg-muted rounded-xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of landlords who are already saving time and money with RentSure's powerful features
          </p>
          <Button size="lg" onClick={() => navigate("/register")}>
            Sign Up Now
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Features;
