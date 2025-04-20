
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  PlusCircle, 
  DollarSign, 
  Wrench, 
  MessageSquare,
  Home,
  CalendarRange,
  Check,
  Clock
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const TenantDashboard = () => {
  const navigate = useNavigate();
  
  // Sample data
  const property = {
    address: "123 Main Street, Apt 4B",
    city: "San Francisco",
    state: "CA",
    landlord: "John Smith",
    leaseEnd: "2025-12-31",
    rent: 1800,
    nextPayment: "2025-05-01",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80"
  };
  
  const maintenanceRequests = [
    {
      id: 1,
      title: "Leaky Faucet",
      status: "in-progress",
      date: "2025-04-10",
      description: "The bathroom sink faucet is leaking."
    },
    {
      id: 2,
      title: "Light Fixture",
      status: "completed",
      date: "2025-04-02",
      description: "Kitchen light fixture needs replacement."
    }
  ];
  
  const announcements = [
    {
      id: 1,
      title: "Building Maintenance",
      date: "2025-04-15",
      content: "The water will be shut off on April 20th from 10am to 2pm for scheduled maintenance."
    },
    {
      id: 2,
      title: "Community Event",
      date: "2025-04-25",
      content: "Join us for a community BBQ at the courtyard on Saturday, April 25th at 3pm."
    }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400">Pending</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  // Calculate days until next payment
  const today = new Date();
  const nextPaymentDate = new Date(property.nextPayment);
  const daysUntilPayment = Math.round((nextPaymentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate percentage of lease completed
  const leaseStartDate = new Date('2025-01-01'); // Assuming lease started on January 1st
  const leaseEndDate = new Date(property.leaseEnd);
  const totalLeaseDays = (leaseEndDate.getTime() - leaseStartDate.getTime()) / (1000 * 60 * 60 * 24);
  const daysElapsed = (today.getTime() - leaseStartDate.getTime()) / (1000 * 60 * 60 * 24);
  const leaseProgressPercentage = Math.round((daysElapsed / totalLeaseDays) * 100);

  return (
    <Layout>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Your Tenant Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your rental information and payments
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Your Rental Property</CardTitle>
                    <CardDescription>Current lease information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video rounded-md overflow-hidden">
                      <img 
                        src={property.imageUrl} 
                        alt={property.address} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-lg font-semibold">{property.address}</p>
                        <p className="text-sm text-muted-foreground">{property.city}, {property.state}</p>
                        <p className="text-sm mt-2">Landlord: {property.landlord}</p>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium">Lease Progress</p>
                          <Progress value={leaseProgressPercentage} className="h-2 mt-1" />
                          <p className="text-xs text-muted-foreground mt-1">Lease ends: {new Date(property.leaseEnd).toLocaleDateString()}</p>
                        </div>
                        <div className="pt-2">
                          <Button variant="outline" className="w-full" onClick={() => navigate('/lease-details')}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Lease Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Next Rent Payment</CardTitle>
                    <CardDescription>Due {new Date(property.nextPayment).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Amount Due</p>
                        <p className="text-2xl font-bold">${property.rent}</p>
                      </div>
                      <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center">
                        <DollarSign className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium">Days Until Due</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={100 - (daysUntilPayment / 30) * 100} className="h-2" />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {daysUntilPayment} days left
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => navigate('/make-payment')}>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Make Payment
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Maintenance Requests</CardTitle>
                        <CardDescription>Track your maintenance issues</CardDescription>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => navigate('/maintenance')}>View All</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {maintenanceRequests.map(request => (
                        <div key={request.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{request.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Reported on {new Date(request.date).toLocaleDateString()}
                              </p>
                            </div>
                            {getStatusBadge(request.status)}
                          </div>
                          <p className="text-sm mt-1">{request.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/maintenance/new')}>
                      <Wrench className="mr-2 h-4 w-4" />
                      New Maintenance Request
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Building Announcements</CardTitle>
                    <CardDescription>Updates from your property manager</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {announcements.map(announcement => (
                        <div key={announcement.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-medium">{announcement.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(announcement.date).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-sm">{announcement.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/messages')}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message Landlord
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={() => navigate('/make-payment')}>
                    <DollarSign className="h-6 w-6" />
                    <span>Pay Rent</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={() => navigate('/maintenance/new')}>
                    <Wrench className="h-6 w-6" />
                    <span>Report Issue</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={() => navigate('/messages')}>
                    <MessageSquare className="h-6 w-6" />
                    <span>Messages</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2" onClick={() => navigate('/documents')}>
                    <FileText className="h-6 w-6" />
                    <span>Documents</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default TenantDashboard;
