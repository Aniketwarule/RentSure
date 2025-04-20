
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { MaintenanceRequestForm } from "@/components/maintenance/MaintenanceRequestForm";
import { Wrench, Search, PlusCircle, MessageSquare, ChevronRight } from "lucide-react";

const Maintenance = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  
  const requests = [
    {
      id: 1,
      title: "Leaky Faucet",
      description: "The bathroom sink faucet is leaking.",
      date: "2025-04-10",
      status: "in-progress",
      category: "plumbing",
      notes: "Plumber scheduled for Friday at 2pm."
    },
    {
      id: 2,
      title: "Light Fixture",
      description: "Kitchen light fixture needs replacement.",
      date: "2025-04-02",
      status: "completed",
      category: "electrical",
      notes: "Replaced on April 5th."
    },
    {
      id: 3,
      title: "Dishwasher Not Draining",
      description: "The dishwasher isn't draining properly after cycle completion.",
      date: "2025-03-25",
      status: "completed",
      category: "appliance",
      notes: "Clog removed and tested."
    },
    {
      id: 4,
      title: "AC Not Cooling",
      description: "Air conditioner is running but not cooling effectively.",
      date: "2025-03-15",
      status: "completed",
      category: "hvac",
      notes: "Refrigerant recharged."
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
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "plumbing":
        return "🚽";
      case "electrical":
        return "💡";
      case "hvac":
        return "❄️";
      case "appliance":
        return "🔌";
      case "structural":
        return "🏠";
      case "pest":
        return "🐜";
      default:
        return "🔧";
    }
  };
  
  const filteredRequests = requests.filter(request => 
    request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const activeRequests = filteredRequests.filter(req => req.status !== 'completed');
  const completedRequests = filteredRequests.filter(req => req.status === 'completed');
  
  return (
    <Layout>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">Maintenance Requests</h1>
                  <p className="text-muted-foreground">
                    Track and submit maintenance issues for your rental
                  </p>
                </div>
                <Button onClick={() => setShowNewRequestForm(!showNewRequestForm)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Request
                </Button>
              </div>
              
              {showNewRequestForm && (
                <div className="animate-fade-in">
                  <MaintenanceRequestForm 
                    onSubmitSuccess={() => setShowNewRequestForm(false)} 
                  />
                </div>
              )}
              
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search maintenance requests..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Tabs defaultValue="active" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="active" className="flex gap-2">
                    Active <Badge variant="outline">{activeRequests.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="flex gap-2">
                    Completed <Badge variant="outline">{completedRequests.length}</Badge>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="space-y-4">
                  {activeRequests.length > 0 ? (
                    activeRequests.map(request => (
                      <Card key={request.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="flex border-l-4 border-yellow-500">
                            <div className="p-4 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xl">{getCategoryIcon(request.category)}</span>
                                <h3 className="font-medium">{request.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {getStatusBadge(request.status)}
                                  <span className="text-xs text-muted-foreground">
                                    Submitted {new Date(request.date).toLocaleDateString()}
                                  </span>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => navigate(`/maintenance/${request.id}`)}>
                                  Details <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Wrench className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <p className="font-medium mb-2">No active maintenance requests</p>
                        <p className="text-muted-foreground mb-4">Any ongoing maintenance issues will appear here</p>
                        <Button onClick={() => setShowNewRequestForm(true)}>Create New Request</Button>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
                
                <TabsContent value="completed" className="space-y-4">
                  {completedRequests.length > 0 ? (
                    completedRequests.map(request => (
                      <Card key={request.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex border-l-4 border-green-500">
                            <div className="p-4 flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xl">{getCategoryIcon(request.category)}</span>
                                <h3 className="font-medium">{request.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{request.description}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {getStatusBadge(request.status)}
                                  <span className="text-xs text-muted-foreground">
                                    Completed on {new Date(request.date).toLocaleDateString()}
                                  </span>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => navigate(`/maintenance/${request.id}`)}>
                                  Details <ChevronRight className="ml-1 h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="flex items-center justify-center p-8">
                        <p className="text-muted-foreground">No completed maintenance requests found</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Maintenance;
