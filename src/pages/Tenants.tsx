
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PropertyFilters } from "@/components/PropertyFilters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  PlusCircle, 
  MessageSquare, 
  FileText, 
  MoreVertical,
  Phone,
  Mail
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Tenants = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const tenants = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "(123) 456-7890",
      property: "123 Main Street, Apt 4B",
      leaseEnd: "2025-12-31",
      status: "Active"
    },
    {
      id: 2,
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "(234) 567-8901",
      property: "456 Oak Avenue",
      leaseEnd: "2025-06-30",
      status: "Active"
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "(345) 678-9012",
      property: "789 Pine Road",
      leaseEnd: "2025-09-15",
      status: "Active"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      phone: "(456) 789-0123",
      property: "101 Cherry Lane",
      leaseEnd: "2025-03-31",
      status: "Ending Soon"
    }
  ];
  
  const filteredTenants = tenants.filter(tenant => 
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.property.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">Active</Badge>;
      case "Ending Soon":
        return <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">Ending Soon</Badge>;
      case "Expired":
        return <Badge className="bg-red-500/20 text-red-700 dark:text-red-400">Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <Layout>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold">Tenants</h1>
                  <p className="text-muted-foreground">
                    Manage your tenants and lease agreements
                  </p>
                </div>
                <Button onClick={() => navigate("/add-tenant")}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Tenant
                </Button>
              </div>
              
              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, or property..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Tenants Table */}
              <Card>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Property</TableHead>
                        <TableHead>Lease End</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTenants.map((tenant) => (
                        <TableRow key={tenant.id}>
                          <TableCell className="font-medium">{tenant.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center text-sm">
                                <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span>{tenant.email}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Phone className="h-3 w-3 mr-1" />
                                <span>{tenant.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{tenant.property}</TableCell>
                          <TableCell>{new Date(tenant.leaseEnd).toLocaleDateString()}</TableCell>
                          <TableCell>{getStatusBadge(tenant.status)}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigate(`/tenant/${tenant.id}`)}>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate(`/tenant/${tenant.id}/message`)}>
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => navigate(`/tenant/${tenant.id}/agreement`)}>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Agreement
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate(`/tenant/${tenant.id}/renew`)}>
                                  Renew Lease
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  {filteredTenants.length === 0 && (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No tenants found matching your search criteria.</p>
                      <Button 
                        variant="outline" 
                        onClick={() => setSearchQuery("")}
                        className="mt-4"
                      >
                        Clear Search
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Tenants;
