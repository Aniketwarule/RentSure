
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  FileText, 
  PlusCircle, 
  Users, 
  HomeIcon, 
  BarChart3, 
  CalendarRange,
  MessagesSquare,
  LogOut
} from "lucide-react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingPayments } from "@/components/dashboard/UpcomingPayments";

const LandlordDashboard = () => {
  const navigate = useNavigate();
  
  // Sample data for tenant stats
  const tenantStats = [
    { 
      name: "Total Tenants", 
      value: "9", 
      description: "Active leases", 
      change: "+2 this month",
      icon: Users
    },
    { 
      name: "Properties", 
      value: "4", 
      description: "Under management", 
      change: "",
      icon: HomeIcon
    },
    { 
      name: "Occupancy Rate", 
      value: "92%", 
      description: "Properties occupied", 
      change: "+5% from last month",
      icon: BarChart3
    }
  ];
  

  return (
    <Layout>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Landlord Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your rental properties and tenants securely
              </p>
              
              <StatsCards />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Tenant Management</CardTitle>
                        <CardDescription>Overview of your tenants</CardDescription>
                      </div>
                      <Button onClick={() => navigate("/tenants")}>
                        <Users className="mr-2 h-4 w-4" />
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {tenantStats.map((stat, i) => (
                        <div key={i} className="bg-muted/50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <stat.icon className="h-5 w-5 text-muted-foreground" />
                            <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className="text-sm font-medium">{stat.name}</p>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => navigate("/add-tenant")}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add New Tenant
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Tasks</CardTitle>
                    <CardDescription>Next 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-1.5 rounded">
                          <CalendarRange className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Property Inspection</p>
                          <p className="text-xs text-muted-foreground">123 Main St - Apr 20</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-1.5 rounded">
                          <MessagesSquare className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Tenant Meeting</p>
                          <p className="text-xs text-muted-foreground">Zoom Call - Apr 18</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-1.5 rounded">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Lease Renewal</p>
                          <p className="text-xs text-muted-foreground">456 Oak Ave - Apr 25</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => navigate("/calendar")}>
                      View Calendar
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest updates and notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentActivity />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Payments</CardTitle>
                    <CardDescription>Next 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UpcomingPayments />
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default LandlordDashboard;
