
import { Layout } from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const Pricing = () => {
  const navigate = useNavigate();
  const [annualBilling, setAnnualBilling] = useState(false);
  
  const tiers = [
    {
      name: "Starter",
      description: "Perfect for individual landlords with a few properties",
      monthlyPrice: 19,
      annualPrice: 190,
      features: [
        "Up to 5 properties",
        "Basic smart contracts",
        "Document generation",
        "Google Pay integration",
        "Email support",
        "Mobile app access"
      ],
      mostPopular: false
    },
    {
      name: "Professional",
      description: "Ideal for growing landlords managing multiple properties",
      monthlyPrice: 49,
      annualPrice: 490,
      features: [
        "Up to 15 properties",
        "Advanced smart contracts",
        "Custom document templates",
        "Google Pay & bank integration",
        "Priority email support",
        "Tenant screening tools",
        "Custom branding",
        "Analytics dashboard"
      ],
      mostPopular: true
    },
    {
      name: "Enterprise",
      description: "For property management companies and large portfolios",
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        "Unlimited properties",
        "Enterprise-grade smart contracts",
        "API access",
        "Legal document library",
        "24/7 priority support",
        "Multi-user access",
        "Custom integrations",
        "White-label solution",
        "Dedicated account manager"
      ],
      mostPopular: false
    }
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Simple, Transparent <span className="text-gradient">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the plan that's right for your rental property portfolio
          </p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className={`text-sm ${!annualBilling ? 'font-semibold' : 'text-muted-foreground'}`}>Monthly</span>
            <div className="flex items-center">
              <Switch 
                checked={annualBilling}
                onCheckedChange={setAnnualBilling}
                id="billing-toggle"
              />
            </div>
            <span className={`text-sm ${annualBilling ? 'font-semibold' : 'text-muted-foreground'}`}>
              Annual <Badge variant="outline" className="ml-1 font-normal">Save 20%</Badge>
            </span>
          </div>
        </div>
        
        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {tiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`relative flex flex-col ${tier.mostPopular ? 'border-primary shadow-lg' : ''}`}
            >
              {tier.mostPopular && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">Most Popular</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold">
                      ${annualBilling ? tier.annualPrice : tier.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground mb-1">
                      /{annualBilling ? 'year' : 'month'}
                    </span>
                  </div>
                  {annualBilling && (
                    <p className="text-sm text-muted-foreground mt-1">
                      ${tier.monthlyPrice} monthly when billed annually
                    </p>
                  )}
                </div>
                
                <div className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={tier.mostPopular ? "default" : "outline"}
                  onClick={() => navigate("/register")}
                >
                  {tier.mostPopular ? "Start Free Trial" : "Choose Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I switch plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Your billing will be prorated accordingly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                We offer a 14-day free trial on all plans so you can experience all features before committing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, Google Pay, and bank transfers for annual plans.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I cancel my subscription?</h3>
              <p className="text-muted-foreground">
                You can cancel your subscription at any time. Annual subscriptions are refunded on a prorated basis.
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your rental property management?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/register")}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/")}>
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
