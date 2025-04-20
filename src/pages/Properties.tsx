import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Layout } from "@/components/Layout";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, PlusCircle, Search, SlidersHorizontal } from "lucide-react";

const propertyImage1 = "../../assets/property-images/property1.jpg";
const propertyImage2 = "../../assets/property-images/property2.png";
const propertyImage3 = "../../assets/property-images/property3.png";
const propertyImage4 = "../../assets/property-images/property4.png";
const propertyImage5 = "../../assets/property-images/property5.png";

import { baseUrl } from "@/App";

const Properties = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Local fallback images array
  const fallbackImages = [
    propertyImage1,
    propertyImage2,
    propertyImage3,
    propertyImage4,
    propertyImage5,
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/api/properties/`);
        setProperties(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch properties");
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active": return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "rented": return "bg-blue-500/20 text-blue-700 dark:text-blue-400";
      default: return "bg-gray-500/20 text-gray-700 dark:text-gray-400";
    }
  };

  // Filter properties based on search query and filters
  const filteredProperties = properties.filter(property => {
    // Search filter
    const searchMatch = 
      (property.address?.fullAddress?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (property.address?.city?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (property.address?.locality?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
      (property.location?.toLowerCase() || "").includes(searchQuery.toLowerCase());
    
    // Status filter
    const statusMatch = statusFilter === "all" || 
      property.status?.toLowerCase() === statusFilter.toLowerCase();
    
    // Type filter
    const typeMatch = typeFilter === "all" || 
      property.propertyType?.toLowerCase() === typeFilter.toLowerCase();
    
    return searchMatch && statusMatch && typeMatch;
  });

  // Format address for display
  const formatAddress = (property) => {
    if (property.address?.fullAddress) {
      return property.address.fullAddress;
    } else if (property.location) {
      return property.location;
    }
    return "Address not available";
  };

  // Format location for display
  const formatLocation = (property) => {
    if (property.address?.city && property.address?.locality) {
      return `${property.address.locality}, ${property.address.city}`;
    } else if (property.address?.city) {
      return property.address.city;
    } else if (property.address?.locality) {
      return property.address.locality;
    }
    return "Location not available";
  };

  // Format rent for display
  const formatRent = (property) => {
    if (property.monthlyRent) {
      return property.monthlyRent;
    } else if (property.rentAmountInFiat) {
      return property.rentAmountInFiat;
    } else if (property.rentAmountInCrypto) {
      return `${property.rentAmountInCrypto} (Crypto)`;
    }
    return "Price not available";
  };

  // Format property type for display
  const formatPropertyType = (property) => {
    if (property.propertyType) {
      return property.propertyType;
    } else if (property.bhkType) {
      return property.bhkType;
    }
    return "Unknown type";
  };

  function handlenavigate(index: number) {
    return (event) => {
      event.preventDefault();
      localStorage.setItem('index', index.toString());
      navigate(`/property/${properties[index]._id}`);
    };
  }

  return (
    <Layout>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">Properties</h1>
                  <p className="text-muted-foreground">
                    Manage your rental properties
                  </p>
                </div>
                <Button onClick={() => navigate("/create-property")}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Property
                </Button>
              </div>
              
              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by address, city, or location..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="sold">Active</SelectItem>  
                          <SelectItem value="rented">Rented</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Property Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="condo">Condo</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <SlidersHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Loading state */}
              {loading && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">Loading properties...</p>
                  </CardContent>
                </Card>
              )}
              
              {/* Error state */}
              {error && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <Button 
                      variant="outline" 
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {/* Properties Grid */}
              {!loading && !error && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property, index) => (
                    <Card 
                      key={property._id || index}
                      className="overflow-hidden group hover:shadow-md transition-shadow"
                    >
                      <div 
                        className="h-48 w-full bg-cover bg-center relative">
                          <img 
                            src={fallbackImages[index % fallbackImages.length]} 
                            className="w-full h-full object-cover absolute inset-0"
                          />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90 transition-all">
                          <div className="absolute bottom-4 left-4 right-4">
                            <Badge className={`mb-2 ${getStatusColor(property.status)}`}>
                              {property.status || "Available"}
                            </Badge>
                            <h3 className="text-lg font-medium text-white truncate">
                              {formatAddress(property)}
                            </h3>
                            <p className="text-sm text-white/80">
                              {formatLocation(property)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-lg font-semibold">
                            ₹{formatRent(property)}/month
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatPropertyType(property)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm text-muted-foreground">
                            {property.bhkType || ""}
                            {property.furnishingStatus ? ` • ${property.furnishingStatus}` : ""}
                          </p>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={handlenavigate(index)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Property
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              
              {/* Empty state */}
              {!loading && !error && filteredProperties.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground mb-4">No properties found matching your search criteria.</p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                        setTypeFilter("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Properties;