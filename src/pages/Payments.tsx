
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download,
  Search,
  CalendarIcon,
  DollarSign,
  ArrowUpDown,
  FilterX,
  PlusCircle,
  BarChart4
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaymentsPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  
  // Sample payment data
  const payments = [
    {
      id: 1,
      property: "123 Main Street, Apt 4B",
      tenant: "John Smith",
      amount: 1800,
      dueDate: "2025-04-01",
      paidDate: "2025-04-01",
      status: "paid",
      paymentMethod: "Google Pay"
    },
    {
      id: 2,
      property: "456 Oak Avenue",
      tenant: "Sarah Johnson",
      amount: 2400,
      dueDate: "2025-04-01",
      paidDate: "2025-04-02",
      status: "paid",
      paymentMethod: "Bank Transfer"
    },
    {
      id: 3,
      property: "789 Pine Road",
      tenant: "Pending",
      amount: 1500,
      dueDate: "2025-05-01",
      paidDate: null,
      status: "upcoming",
      paymentMethod: "Pending"
    },
    {
      id: 4,
      property: "123 Main Street, Apt 4B",
      tenant: "John Smith",
      amount: 1800,
      dueDate: "2025-03-01",
      paidDate: "2025-03-01",
      status: "paid",
      paymentMethod: "Google Pay"
    },
    {
      id: 5,
      property: "456 Oak Avenue",
      tenant: "Sarah Johnson",
      amount: 2400,
      dueDate: "2025-03-01",
      paidDate: "2025-03-03",
      status: "paid",
      paymentMethod: "Bank Transfer"
    }
  ];
  
  // Filter payments based on search query, month, and status
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.tenant.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesMonth = selectedMonth === "all" || 
      (payment.dueDate && new Date(payment.dueDate).getMonth() === parseInt(selectedMonth));
    
    const matchesStatus = selectedStatus === "all" || payment.status === selectedStatus;
    
    return matchesSearch && matchesMonth && matchesStatus;
  });
  
  const upcomingPayments = payments.filter(payment => payment.status === "upcoming");
  const paidPayments = payments.filter(payment => payment.status === "paid");
  const overduePayments = payments.filter(payment => payment.status === "overdue");
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500/20 text-green-700 dark:text-green-400">Paid</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-500/20 text-blue-700 dark:text-blue-400">Upcoming</Badge>;
      case "overdue":
        return <Badge className="bg-red-500/20 text-red-700 dark:text-red-400">Overdue</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
                  <h1 className="text-3xl font-bold">Payments</h1>
                  <p className="text-muted-foreground">
                    Track and manage all your payments
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button onClick={() => navigate("/payments/new")}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Record Payment
                  </Button>
                </div>
              </div>
              
              {/* Payment summary cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Received (April)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$4,200.00</div>
                    <p className="text-xs text-muted-foreground">
                      From 2 properties
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Upcoming Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,500.00</div>
                    <p className="text-xs text-muted-foreground">
                      Due on May 1st
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Overdue Payments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$0.00</div>
                    <p className="text-xs text-muted-foreground">
                      All payments on time
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Payment history */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="upcoming">Upcoming ({upcomingPayments.length})</TabsTrigger>
                        <TabsTrigger value="paid">Paid ({paidPayments.length})</TabsTrigger>
                        <TabsTrigger value="overdue">Overdue ({overduePayments.length})</TabsTrigger>
                      </TabsList>
                      
                      <div className="flex gap-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search payments..."
                            className="pl-8 w-[200px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        
                        <Select 
                          value={selectedMonth} 
                          onValueChange={setSelectedMonth}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Month" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Months</SelectItem>
                            <SelectItem value="0">January</SelectItem>
                            <SelectItem value="1">February</SelectItem>
                            <SelectItem value="2">March</SelectItem>
                            <SelectItem value="3">April</SelectItem>
                            <SelectItem value="4">May</SelectItem>
                            <SelectItem value="5">June</SelectItem>
                            <SelectItem value="6">July</SelectItem>
                            <SelectItem value="7">August</SelectItem>
                            <SelectItem value="8">September</SelectItem>
                            <SelectItem value="9">October</SelectItem>
                            <SelectItem value="10">November</SelectItem>
                            <SelectItem value="11">December</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setSearchQuery("");
                            setSelectedMonth("all");
                            setSelectedStatus("all");
                          }}
                        >
                          <FilterX className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <TabsContent value="all" className="m-0">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>
                                <div className="flex items-center gap-1">
                                  Due Date
                                  <ArrowUpDown className="h-3 w-3" />
                                </div>
                              </TableHead>
                              <TableHead>Property</TableHead>
                              <TableHead>Tenant</TableHead>
                              <TableHead>
                                <div className="flex items-center gap-1">
                                  Amount
                                  <ArrowUpDown className="h-3 w-3" />
                                </div>
                              </TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Payment Date</TableHead>
                              <TableHead>Method</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredPayments.length > 0 ? (
                              filteredPayments.map((payment) => (
                                <TableRow key={payment.id}>
                                  <TableCell>{formatDate(payment.dueDate)}</TableCell>
                                  <TableCell className="max-w-[200px] truncate">{payment.property}</TableCell>
                                  <TableCell>{payment.tenant}</TableCell>
                                  <TableCell>${payment.amount}</TableCell>
                                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                                  <TableCell>{formatDate(payment.paidDate)}</TableCell>
                                  <TableCell>{payment.paymentMethod}</TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="ghost" size="sm">View</Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                  No payments found matching your filters.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="upcoming" className="m-0">
                      {/* Similar table structure for upcoming payments */}
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Due Date</TableHead>
                              <TableHead>Property</TableHead>
                              <TableHead>Tenant</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {upcomingPayments.length > 0 ? (
                              upcomingPayments.map((payment) => (
                                <TableRow key={payment.id}>
                                  <TableCell>{formatDate(payment.dueDate)}</TableCell>
                                  <TableCell>{payment.property}</TableCell>
                                  <TableCell>{payment.tenant}</TableCell>
                                  <TableCell>${payment.amount}</TableCell>
                                  <TableCell className="text-right">
                                    <Button size="sm">Pay Now</Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                  No upcoming payments.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="paid" className="m-0">
                      {/* Similar table structure for paid payments */}
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Due Date</TableHead>
                              <TableHead>Property</TableHead>
                              <TableHead>Tenant</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Paid Date</TableHead>
                              <TableHead>Method</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {paidPayments.length > 0 ? (
                              paidPayments.map((payment) => (
                                <TableRow key={payment.id}>
                                  <TableCell>{formatDate(payment.dueDate)}</TableCell>
                                  <TableCell>{payment.property}</TableCell>
                                  <TableCell>{payment.tenant}</TableCell>
                                  <TableCell>${payment.amount}</TableCell>
                                  <TableCell>{formatDate(payment.paidDate)}</TableCell>
                                  <TableCell>{payment.paymentMethod}</TableCell>
                                  <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                      <Download className="h-4 w-4 mr-1" /> Receipt
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                  No paid payments.
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="overdue" className="m-0">
                      {/* Similar table structure for overdue payments */}
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Due Date</TableHead>
                              <TableHead>Property</TableHead>
                              <TableHead>Tenant</TableHead>
                              <TableHead>Amount</TableHead>
                              <TableHead>Days Overdue</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {overduePayments.length > 0 ? (
                              overduePayments.map((payment) => (
                                <TableRow key={payment.id}>
                                  <TableCell>{formatDate(payment.dueDate)}</TableCell>
                                  <TableCell>{payment.property}</TableCell>
                                  <TableCell>{payment.tenant}</TableCell>
                                  <TableCell>${payment.amount}</TableCell>
                                  <TableCell>5 days</TableCell>
                                  <TableCell className="text-right">
                                    <Button size="sm">Pay Now</Button>
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                  No overdue payments. All payments are up to date!
                                </TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                    
                    {filteredPayments.length > 0 && (
                      <div className="mt-4 flex justify-center">
                        <Pagination>
                          <PaginationContent>
                            <PaginationItem>
                              <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#" isActive>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationNext href="#" />
                            </PaginationItem>
                          </PaginationContent>
                        </Pagination>
                      </div>
                    )}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentsPage;
