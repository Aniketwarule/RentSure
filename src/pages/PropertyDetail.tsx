import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Layout } from "@/components/Layout";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, 
  FileText, 
  MessageSquare,
  User,
  CalendarRange,
  Camera,
  Settings,
  Pencil,
  Home,
  AlertCircle,
  IndianRupee,
  Download
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { baseUrl } from "@/App";

// Fallback images for when property images are not available
const propertyImage1 = "../../assets/property-images/property1.jpg";
const propertyImage2 = "../../assets/property-images/property2.png";
const propertyImage3 = "../../assets/property-images/property3.png";
const propertyImage4 = "../../assets/property-images/property4.png";
const propertyImage5 = "../../assets/property-images/property5.png";
const fallbackImages = [
  propertyImage1,
  propertyImage2,
  propertyImage3,
  propertyImage4,
  propertyImage5,
];

const PropertyDetail = () => {
  const { id } = useParams();
  localStorage.setItem("propertyId", id);
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl}/api/properties/${id}`);
        setProperty(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Failed to load property details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);
  
  // Helper function to format address
  const formatAddress = () => {
    if (property?.address?.fullAddress) {
      return property.address.fullAddress;
    } else if (property?.location) {
      return property.location;
    }
    return "Address not available";
  };
  
  // Helper function to format location
  const formatLocation = () => {
    let location = "";
    
    if (property?.address?.city) {
      location += property.address.city;
    }
    
    if (property?.address?.pincode) {
      location += location ? `, ${property.address.pincode}` : property.address.pincode;
    }
    
    return location || "Location not available";
  };
  
  // Helper function to get rent amount
  const getRentAmount = () => {
    if (property?.monthlyRent) {
      return property.monthlyRent;
    } else if (property?.rentAmountInFiat) {
      return property.rentAmountInFiat;
    } else if (property?.rentAmountInCrypto) {
      return `${property.rentAmountInCrypto} (Crypto)`;
    }
    return "N/A";
  };
  
  // Helper function to get property type
  const getPropertyType = () => {
    return property?.propertyType || property?.bhkType || "Not specified";
  };
  
  // Helper function to get property status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "rented": return "bg-green-500/20 text-green-700 dark:text-green-400";
      case "for-sale": return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      case "sold": return "bg-blue-500/20 text-blue-700 dark:text-blue-400";
      default: return "bg-gray-500/20 text-gray-700 dark:text-gray-400";
    }
  };
  
  // Helper function to get property amenities
  const getAmenities = () => {
    return property?.Amenities || [];
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex min-h-screen bg-background">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-6">
              <div className="flex items-center justify-center h-full">
                <p>Loading property details...</p>
              </div>
            </main>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="flex min-h-screen bg-background">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-6">
              <div className="flex flex-col items-center justify-center h-full">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Error Loading Property</h2>
                <p className="text-muted-foreground mb-4">{error}</p>
                <div className="flex gap-4">
                  <Button onClick={() => navigate("/properties")}>
                    Back to Properties
                  </Button>
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Try Again
                  </Button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!property) {
    return (
      <Layout>
        <div className="flex min-h-screen bg-background">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-6">
              <div className="flex flex-col items-center justify-center h-full">
                <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
                <h2 className="text-xl font-semibold mb-2">Property Not Found</h2>
                <p className="text-muted-foreground mb-4">The property you're looking for doesn't exist or has been removed.</p>
                <Button onClick={() => navigate("/properties")}>
                  Back to Properties
                </Button>
              </div>
            </main>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <h1 className="text-2xl font-bold">Property Details</h1>
              </div>
              
              <div className="relative overflow-hidden h-64 md:h-80 rounded-lg">
              <img 
                src={fallbackImages[localStorage.getItem('index')]}
                className="w-full h-full object-cover absolute inset-0"
              />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-white">{formatAddress()}</h1>
                        <p className="text-lg text-white/80">{formatLocation()}</p>
                      </div>
                      <Badge className={getStatusColor(property.status)}>
                        {property.status || "Available"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="secondary" size="icon" className="absolute top-4 right-4">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Property Overview</CardTitle>
                      <CardDescription>
                        {getPropertyType()} {property.bhkType && `• ${property.bhkType}`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground">Type</p>
                          <p className="text-lg font-semibold">{getPropertyType()}</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground">BHK</p>
                          <p className="text-lg font-semibold">{property.bhkType || "N/A"}</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground">Furnishing</p>
                          <p className="text-lg font-semibold">{property.furnishingStatus || "N/A"}</p>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground">Availability</p>
                          <p className="text-lg font-semibold">{property.availability || "N/A"}</p>
                        </div>
                      </div>
                      
                      {/* Property Description */}
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Description</h3>
                        <p className="text-muted-foreground">
                          {property.Description || property.propertysummary || "No description available for this property."}
                        </p>
                      </div>
                      
                      {/* Amenities Section */}
                      {getAmenities().length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium mb-2">Amenities</h3>
                          <div className="flex flex-wrap gap-2">
                            {getAmenities().map((amenity, index) => (
                              <Badge key={index} variant="outline" className="px-3 py-1">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => navigate(`/properties/${id}/edit`)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Property
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Tabs defaultValue="agreements">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="agreements">Agreements</TabsTrigger>
                      <TabsTrigger value="payments">Payments</TabsTrigger>
                      <TabsTrigger value="tenants">Tenants</TabsTrigger>
                      <TabsTrigger value="messages">Messages</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="agreements" className="space-y-4 mt-4">
                      <Card>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Agreement</TableHead>
                              <TableHead>Start Date</TableHead>
                              <TableHead>End Date</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          {property.leaseDuration ? (
                            <TableBody>
                              <TableRow>
                                <TableCell>Rental Agreement</TableCell>
                                <TableCell>Current</TableCell>
                                <TableCell>{property.leaseDuration}</TableCell>
                                <TableCell>
                                  <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">
                                    Active
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">View</Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          ) : (
                            <TableBody>
                              <TableRow>
                                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                  No agreements found for this property
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          )}
                        </Table>
                      </Card>
                      <div className="flex space-x-4 justify-end">
                        <Button onClick={() => navigate(`/create-agreement/${id}`)}>
                          <Download className="mr-2 h-4 w-4" />
                          Download Agreement
                        </Button>
                        <Button onClick={() => navigate(`/create-agreement/${id}`)}>
                          <FileText className="mr-2 h-4 w-4" />
                          New Agreement
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="payments" className="space-y-4 mt-4">
                      <Card>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                                No payment records found for this property
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Card>
                      <div className="flex justify-end">
                        <Button onClick={() => navigate('/payments')}>
                          <IndianRupee className="mr-2 h-4 w-4" />
                          Record Payment
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tenants" className="space-y-4 mt-4">
                      {property.landlord ? (
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                                <User className="h-8 w-8 text-muted-foreground" />
                              </div>
                              <div>
                                <h3 className="text-lg font-medium">{property.landlord}</h3>
                                <p className="text-sm text-muted-foreground">Property Owner</p>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter>
                            <div className="flex gap-2 w-full">
                              <Button variant="outline" className="flex-1">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Message
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <User className="mr-2 h-4 w-4" />
                                View Profile
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ) : (
                        <Card>
                          <CardContent className="py-8 text-center">
                            <User className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">No tenant information available</p>
                          </CardContent>
                          <CardFooter>
                            <Button className="w-full">
                              <User className="mr-2 h-4 w-4" />
                              Add Tenant
                            </Button>
                          </CardFooter>
                        </Card>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="messages" className="space-y-4 mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Conversation History</CardTitle>
                          <CardDescription>
                            Messages related to this property
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center py-8 text-muted-foreground">
                            <MessageSquare className="mx-auto h-12 w-12 mb-2" />
                            <p>No messages yet</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Start Conversation
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="md:w-1/3 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Financial Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Monthly Rent</span>
                        <span className="font-bold">₹{getRentAmount()}</span>
                      </div>
                      
                      {property.securityDeposit && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Security Deposit</span>
                          <span className="font-bold">₹{property.securityDeposit}</span>
                        </div>
                      )}
                      
                      {property.maintenanceAmount && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Maintenance Charges</span>
                          <span className="font-bold">₹{property.maintenanceAmount}</span>
                        </div>
                      )}
                      
                      {property.rentDueDay && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Rent Due Day</span>
                          <span className="font-bold">{property.rentDueDay}th of month</span>
                        </div>
                      )}
                      
                      {property.preferredPaymentMode && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Payment Mode</span>
                          <span className="font-bold capitalize">{property.preferredPaymentMode}</span>
                        </div>
                      )}
                      
                      {getRentAmount() !== "N/A" && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Annual Income</span>
                          <span className="font-bold">₹{parseFloat(getRentAmount()) * 12}</span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <IndianRupee className="mr-2 h-4 w-4" />
                        Record Payment
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {property.preferredTenants && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Preferred Tenants</span>
                          <span className="font-medium">{property.preferredTenants}</span>
                        </div>
                      )}
                      
                      {property.petsAllowed && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Pets Allowed</span>
                          <span className="font-medium">{property.petsAllowed}</span>
                        </div>
                      )}
                      
                      {property.address?.landmark && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Landmark</span>
                          <span className="font-medium">{property.address.landmark}</span>
                        </div>
                      )}
                      
                      {property.address?.locality && (
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Locality</span>
                          <span className="font-medium">{property.address.locality}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="mr-2 h-4 w-4" />
                        View Agreement
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarRange className="mr-2 h-4 w-4" />
                        Schedule Inspection
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Home className="mr-2 h-4 w-4" />
                        Maintenance Request
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Property Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default PropertyDetail;