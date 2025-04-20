
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export const PropertyList = () => {
  const navigate = useNavigate();
  
  const properties = [
    {
      id: 1,
      address: "123 Main Street, Apt 4B",
      city: "San Francisco",
      state: "CA",
      imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80",
      rent: 1800,
      status: "Active",
      tenants: "John Smith"
    },
    {
      id: 2,
      address: "456 Oak Avenue",
      city: "New York",
      state: "NY",
      imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80",
      rent: 2400,
      status: "Active",
      tenants: "Sarah Johnson"
    },
    {
      id: 3,
      address: "789 Pine Road",
      city: "Seattle",
      state: "WA",
      imageUrl: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&q=80",
      rent: 1500,
      status: "Pending",
      tenants: "Pending"
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "Pending": return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      case "Inactive": return "bg-red-500/20 text-red-700 dark:text-red-400";
      default: return "bg-gray-500/20 text-gray-700 dark:text-gray-400";
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div 
            key={property.id}
            className="group relative overflow-hidden rounded-lg border bg-card transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div 
              className="h-48 w-full bg-cover bg-center" 
              style={{ backgroundImage: `url(${property.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-medium text-white truncate">{property.address}</h3>
                  <p className="text-sm text-white/80">{property.city}, {property.state}</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-lg font-semibold">${property.rent}/month</p>
                <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                <span className="font-semibold">Tenant:</span> {property.tenants}
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Property
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
