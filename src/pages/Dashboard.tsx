import { Layout } from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  CalendarIcon, 
  Home, 
  FileText, 
  PlusCircle, 
  DollarSign, 
  Bell, 
  Settings,
  BarChart3,
  Activity
} from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { PropertyList } from "@/components/dashboard/PropertyList";
import { UpcomingPayments } from "@/components/dashboard/UpcomingPayments";

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold">Welcome to RentSure</h1>
              <p className="text-muted-foreground">
                Manage your rental agreements and properties securely with blockchain technology
              </p>
              
              <StatsCards />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your latest updates and notifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentActivity />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/activity')}>
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Payments</CardTitle>
                    <CardDescription>Next 30 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UpcomingPayments />
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => navigate('/payments')}>
                      View All Payments
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Properties & Agreements</CardTitle>
                    <CardDescription>Manage your rental properties</CardDescription>
                  </div>
                  <Button onClick={() => navigate('/create-property')}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Agreement
                  </Button>
                </CardHeader>
                <CardContent>
                  <PropertyList />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => navigate('/properties')}>
                    View All Properties
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;