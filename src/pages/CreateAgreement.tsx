import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Layout } from "@/components/Layout";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ChevronLeft, 
  ChevronRight,
  User,
  FileText,
  Calendar,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { baseUrl } from "@/App";

const CreateAgreement = () => {
  const navigate = useNavigate();
  const propertyId = localStorage.getItem("propertyId"); // Get property ID from URL params
  const [step, setStep] = useState(1);
  const totalSteps = 3; // Now we have 3 steps (added tenant selection)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interestedTenants, setInterestedTenants] = useState([]);
  
  // Form data state
  const [formData, setFormData] = useState({
    // Property details
    propertyId: propertyId,
    
    // Selected tenant
    selectedTenant: "",
    
    // Landlord details
    landlordName: localStorage.getItem("userName"),
    landlordAge: "",
    landlordPhone: "",
    landlordEmail: "",
    landlordPAN: "",
    landlordAddress: "",
    
    // Agreement terms
    agreementStartDate: "",
    agreementDuration: "",
    monthlyRent: "",
    securityDeposit: "",
    rentPaymentDate: "",
    rentPaymentMode: "online", // Default value
    lockInPeriod: "",
    noLockInPeriod: false,
    noticePeriod: "",
    
    // Payment details
    upiId: "",
    cryptoWalletAddress: "",
    
    // Utilities & Maintenance
    electricityBill: false,
    waterBill: false,
    maintenanceCharge: false,
    gasBill: false,
    internetBill: false,
    societyCharge: false,
    
    additionalTerms: "",
  });
  
  // Fetch property and interested tenants data
  useEffect(() => {
    const fetchPropertyData = async () => {
      // if (!propertyId) {
      //   toast({
      //     title: "Error",
      //     description: "Property ID is missing",
      //     variant: "destructive",
      //   });
      //   navigate("/properties");
      //   return;
      // }
      
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/api/properties/${propertyId}`);
        const propertyData = response.data;
        
        setProperty(propertyData);
        
        // Extract interested tenants
        if (propertyData.interestedUsers && propertyData.interestedUsers.length > 0) {
          setInterestedTenants(propertyData.interestedUsers);
        }
        
        // Pre-fill some form fields from property data
        setFormData(prevState => ({
          ...prevState,
          propertyId: propertyId,
          monthlyRent: propertyData.rentAmountInFiat || propertyData.monthlyRent || "",
          securityDeposit: propertyData.securityDeposit || "",
          rentPaymentDate: propertyData.rentDueDay ? propertyData.rentDueDay.toString() : "",
          rentPaymentMode: propertyData.preferredPaymentMode === "fiat" ? "online" : 
                          propertyData.preferredPaymentMode === "crypto" ? "crypto" : "both",
          agreementDuration: propertyData.leaseDuration ? mapLeaseDurationToOption(propertyData.leaseDuration) : "",
          additionalTerms: propertyData.additionalTerms || "",
        }));
      } catch (error) {
        console.error("Error fetching property data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch property details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPropertyData();
  }, [propertyId, navigate]);
  
  // Helper function to map lease duration string to dropdown option value
  const mapLeaseDurationToOption = (duration) => {
    if (duration.includes("6") || duration.includes("six")) return "6months";
    if (duration.includes("11") || duration.includes("eleven")) return "11months";
    if (duration.includes("1 year") || duration.includes("one year")) return "1year";
    if (duration.includes("2") || duration.includes("two")) return "2years";
    if (duration.includes("3") || duration.includes("three")) return "3years";
    return "";
  };
  
  // Handle form field changes
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };
  
  // Handle select changes
  const handleSelectChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  
  // Handle radio changes
  const handleRadioChange = (value) => {
    setFormData({
      ...formData,
      rentPaymentMode: value,
    });
  };
  
  const nextStep = () => {
    // Validate current step
    if (step === 1 && !formData.selectedTenant) {
      toast({
        title: "Required Field",
        description: "Please select a tenant to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const calculateEndDate = () => {
    if (!formData.agreementStartDate || !formData.agreementDuration) return null;
    
    const startDate = new Date(formData.agreementStartDate);
    let endDate = new Date(startDate);
    
    switch (formData.agreementDuration) {
      case "6months":
        endDate.setMonth(startDate.getMonth() + 6);
        break;
      case "11months":
        endDate.setMonth(startDate.getMonth() + 11);
        break;
      case "1year":
        endDate.setFullYear(startDate.getFullYear() + 1);
        break;
      case "2years":
        endDate.setFullYear(startDate.getFullYear() + 2);
        break;
      case "3years":
        endDate.setFullYear(startDate.getFullYear() + 3);
        break;
      default:
        return null;
    }
    
    return endDate;
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare the data for submission
      const agreementData = {
        // Property reference
        propertyId: propertyId,
        
        // Tenant details (just name from dropdown)
        tenantName: formData.selectedTenant,
        
        // Landlord details
        landlordId: localStorage.getItem("userUid"),
        landlordName: formData.landlordName,
        landlordAge: formData.landlordAge,
        landlordPhone: formData.landlordPhone,
        landlordEmail: formData.landlordEmail,
        landlordPAN: formData.landlordPAN,
        landlordAddress: formData.landlordAddress,
        
        // Agreement details
        agreementStartDate: formData.agreementStartDate,
        agreementEndDate: calculateEndDate(),
        securityDepositMethod: formData.rentPaymentMode === "crypto" ? "Cryptocurrency" : "Fiat",
        securityDeposit: formData.securityDeposit,
        monthlyRent: formData.monthlyRent,
        rentPaymentDate: formData.rentPaymentDate,
        rentPaymentMode: formData.rentPaymentMode,
        
        // Payment details
        upiId: formData.upiId,
        cryptoWalletAddress: formData.cryptoWalletAddress,
        
        // Additional terms
        lockInPeriod: formData.noLockInPeriod ? 0 : formData.lockInPeriod,
        noticePeriod: formData.noticePeriod,
        
        // Utilities
        utilities: {
          electricityBill: formData.electricityBill,
          waterBill: formData.waterBill,
          maintenanceCharge: formData.maintenanceCharge,
          gasBill: formData.gasBill,
          internetBill: formData.internetBill,
          societyCharge: formData.societyCharge,
        },
        
        additionalTerms: formData.additionalTerms,
        
        // Default fields for schema
        status: "Pending",
        moveInInspection: "NotPerformed",
        moveOutInspection: "NotPerformed",
        securityDepositPaid: false,
        securityDepositReturned: false,
      };
      
      // Submit to API
      const response = await axios.post('/api/rental-agreements', agreementData);
      
      toast({
        title: "Agreement Created",
        description: "Rental agreement has been created successfully!",
      });
      
      navigate("/agreements");
    } catch (error) {
      console.error("Error creating agreement:", error);
      toast({
        title: "Error",
        description: "Failed to create rental agreement. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-screen bg-background">
          <DashboardSidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-4">Loading property details...</div>
            </div>
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
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Create Rental Agreement</h1>
                <p className="text-muted-foreground">
                  For property: {property?.address?.fullAddress || property?.location || 'Unknown location'}
                </p>
              </div>
              
              {/* Progress indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Step {step} of {totalSteps}</span>
                  <span>{Math.round((step / totalSteps) * 100)}%</span>
                </div>
                <Progress value={(step / totalSteps) * 100} />
              </div>
              
              {/* Step indicators */}
              <div className="grid grid-cols-3 gap-4">
                <div className={`flex flex-col items-center p-3 rounded-lg ${step >= 1 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <Users className="h-5 w-5 mb-1" />
                  <span className="text-xs text-center">Select Tenant</span>
                </div>
                <div className={`flex flex-col items-center p-3 rounded-lg ${step >= 2 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <User className="h-5 w-5 mb-1" />
                  <span className="text-xs text-center">Landlord Details</span>
                </div>
                <div className={`flex flex-col items-center p-3 rounded-lg ${step >= 3 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <FileText className="h-5 w-5 mb-1" />
                  <span className="text-xs text-center">Agreement Terms</span>
                </div>
              </div>
              
              {/* Step 1: Select Tenant */}
              {step === 1 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Select Tenant</h2>
                      
                      {interestedTenants.length > 0 ? (
                        <div className="space-y-4">
                          <Label htmlFor="selectedTenant">Choose Tenant from Interested Users</Label>
                          <Select 
                            onValueChange={(value) => handleSelectChange("selectedTenant", value)}
                            value={formData.selectedTenant}
                          >
                            <SelectTrigger id="selectedTenant">
                              <SelectValue placeholder="Select a tenant" />
                            </SelectTrigger>
                            <SelectContent>
                              {interestedTenants.map((tenant, index) => (
                                <SelectItem key={index} value={tenant}>
                                  {tenant}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          {formData.selectedTenant && (
                            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                              <div className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                                <div>
                                  <h4 className="text-sm font-medium text-green-800">Selected Tenant</h4>
                                  <p className="text-sm text-green-600">
                                    You have selected {formData.selectedTenant} as the tenant for this rental agreement.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                          <div className="flex items-start">
                            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                            <div>
                              <h4 className="text-sm font-medium text-amber-800">No Interested Tenants</h4>
                              <p className="text-sm text-amber-600">
                                There are currently no interested tenants for this property. You can add a tenant manually.
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <Label htmlFor="manualTenant">Add Tenant Manually</Label>
                            <Input 
                              id="selectedTenant"
                              placeholder="Enter tenant name" 
                              className="mt-2"
                              value={formData.selectedTenant}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      )}
                      
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-start">
                          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                          <div>
                            <h4 className="text-sm font-medium text-blue-800">Tenant Information</h4>
                            <p className="text-sm text-blue-600">
                              Detailed tenant information will be collected separately through the mobile application. 
                              You will be notified when the tenant completes their part of the agreement.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Step 2: Landlord Details */}
              {step === 2 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Landlord Details</h2>
                      
                      <div className="space-y-6">
                        {/* Landlord Details Section */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="landlordName">Full Name</Label>
                              <Input 
                                id="landlordName" 
                                placeholder="Enter your full name" 
                                value={formData.landlordName}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <Label htmlFor="landlordAge">Age</Label>
                              <Input 
                                id="landlordAge" 
                                type="number" 
                                placeholder="Enter age" 
                                value={formData.landlordAge}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="landlordPhone">Phone Number</Label>
                              <Input 
                                id="landlordPhone" 
                                placeholder="Enter 10-digit phone number" 
                                maxLength={10} 
                                value={formData.landlordPhone}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div>
                              <Label htmlFor="landlordEmail">Email Address</Label>
                              <Input 
                                id="landlordEmail" 
                                type="email" 
                                placeholder="Enter email address" 
                                value={formData.landlordEmail}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="landlordPAN">PAN Number</Label>
                            <Input 
                              id="landlordPAN" 
                              placeholder="Enter PAN number" 
                              maxLength={10} 
                              value={formData.landlordPAN}
                              onChange={handleInputChange}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="landlordAddress">Permanent Address</Label>
                            <Textarea 
                              id="landlordAddress" 
                              placeholder="Enter your permanent address"
                              rows={2}
                              value={formData.landlordAddress}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Step 3: Agreement Terms */}
              {step === 3 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Agreement Terms</h2>
                      
                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="agreementStartDate">Agreement Start Date</Label>
                            <Input 
                              id="agreementStartDate" 
                              type="date" 
                              value={formData.agreementStartDate}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="agreementDuration">Agreement Duration</Label>
                            <Select 
                              onValueChange={(value) => handleSelectChange("agreementDuration", value)}
                              value={formData.agreementDuration}
                            >
                              <SelectTrigger id="agreementDuration">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="6months">6 Months</SelectItem>
                                <SelectItem value="11months">11 Months</SelectItem>
                                <SelectItem value="1year">1 Year</SelectItem>
                                <SelectItem value="2years">2 Years</SelectItem>
                                <SelectItem value="3years">3 Years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="monthlyRent">Monthly Rent (₹)</Label>
                            <Input 
                              id="monthlyRent" 
                              type="number" 
                              placeholder="0" 
                              value={formData.monthlyRent}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="securityDeposit">Security Deposit (₹)</Label>
                            <Input 
                              id="securityDeposit" 
                              type="number" 
                              placeholder="0" 
                              value={formData.securityDeposit}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="rentPaymentDate">Rent Payment Date</Label>
                          <Select 
                            onValueChange={(value) => handleSelectChange("rentPaymentDate", value)}
                            value={formData.rentPaymentDate}
                          >
                            <SelectTrigger id="rentPaymentDate">
                              <SelectValue placeholder="Select payment date" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1st of every month</SelectItem>
                              <SelectItem value="5">5th of every month</SelectItem>
                              <SelectItem value="7">7th of every month</SelectItem>
                              <SelectItem value="10">10th of every month</SelectItem>
                              <SelectItem value="15">15th of every month</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="rentPaymentMode">Rent Payment Mode Acceptable</Label>
                          <RadioGroup 
                            defaultValue="online" 
                            className="flex flex-col space-y-1 mt-2"
                            value={formData.rentPaymentMode}
                            onValueChange={handleRadioChange}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="online" id="online" />
                              <Label htmlFor="online">Online Transfer (UPI/IMPS/NEFT)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="crypto" id="crypto" />
                              <Label htmlFor="crypto">Crypto Transfer</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="both" id="both" />
                              <Label htmlFor="both">Both</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        {/* Conditional payment details based on selected payment mode */}
                        {(formData.rentPaymentMode === "online" || formData.rentPaymentMode === "both") && (
                          <div>
                            <Label htmlFor="upiId">UPI ID for Payments</Label>
                            <Input 
                              id="upiId" 
                              placeholder="Enter your UPI ID (e.g., name@upi)" 
                              value={formData.upiId}
                              onChange={handleInputChange}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Rent and security deposit will be transferred to this UPI ID
                            </p>
                          </div>
                        )}
                        
                        {(formData.rentPaymentMode === "crypto" || formData.rentPaymentMode === "both") && (
                          <div>
                            <Label htmlFor="cryptoWalletAddress">Crypto Wallet Address</Label>
                            <Input 
                              id="cryptoWalletAddress" 
                              placeholder="Enter your crypto wallet address" 
                              value={formData.cryptoWalletAddress}
                              onChange={handleInputChange}
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Rent and security deposit will be transferred to this wallet address
                            </p>
                          </div>
                        )}
                        
                        <div>
                          <Label>Lock-in Period</Label>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <Label htmlFor="lockInPeriod">Duration (Months)</Label>
                              <Input 
                                id="lockInPeriod" 
                                type="number" 
                                placeholder="0" 
                                min="0" 
                                value={formData.lockInPeriod}
                                onChange={handleInputChange}
                                disabled={formData.noLockInPeriod}
                              />
                            </div>
                            <div className="flex items-center pt-6">
                              <Checkbox 
                                id="noLockInPeriod" 
                                checked={formData.noLockInPeriod}
                                onCheckedChange={(checked) => {
                                  setFormData({
                                    ...formData,
                                    noLockInPeriod: checked,
                                    lockInPeriod: checked ? "" : formData.lockInPeriod
                                  });
                                }}
                              />
                              <Label htmlFor="noLockInPeriod" className="ml-2">No Lock-in Period</Label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Notice Period</Label>
                          <Select 
                            onValueChange={(value) => handleSelectChange("noticePeriod", value)}
                            value={formData.noticePeriod}
                          >
                            <SelectTrigger id="noticePeriod">
                              <SelectValue placeholder="Select notice period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30days">1 Month</SelectItem>
                              <SelectItem value="60days">2 Months</SelectItem>
                              <SelectItem value="90days">3 Months</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Utilities & Maintenance</Label>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="electricityBill" 
                                  checked={formData.electricityBill}
                                  onCheckedChange={(checked) => {
                                    setFormData({
                                      ...formData,
                                      electricityBill: checked
                                    });
                                  }}
                                />
                                <Label htmlFor="electricityBill">Electricity Bill (Tenant)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="waterBill" 
                                  checked={formData.waterBill}
                                  onCheckedChange={(checked) => {
                                    setFormData({
                                      ...formData,
                                      waterBill: checked
                                    });
                                  }}
                                />
                                <Label htmlFor="waterBill">Water Bill (Tenant)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="maintenanceCharge" 
                                  checked={formData.maintenanceCharge}
                                  onCheckedChange={(checked) => {
                                    setFormData({
                                      ...formData,
                                      maintenanceCharge: checked
                                    });
                                  }}
                                />
                                <Label htmlFor="maintenanceCharge">Maintenance Charge (Tenant)</Label>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="gasBill" 
                                  checked={formData.gasBill}
                                  onCheckedChange={(checked) => {
                                    setFormData({
                                      ...formData,
                                      gasBill: checked
                                    });
                                  }}
                                />
                                <Label htmlFor="gasBill">Gas Bill (Tenant)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="internetBill" 
                                  checked={formData.internetBill}
                                  onCheckedChange={(checked) => {
                                    setFormData({
                                      ...formData,
                                      internetBill: checked
                                    });
                                  }}
                                />
                                <Label htmlFor="internetBill">Internet Bill (Tenant)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="societyCharge" 
                                  checked={formData.societyCharge}
                                  onCheckedChange={(checked) => {
                                    setFormData({
                                      ...formData,
                                      societyCharge: checked
                                    });
                                  }}
                                />
                                <Label htmlFor="societyCharge">Society Charge (Landlord)</Label>
                              </div>
                            </div>
                          </div>
                        </div>

                          <Label htmlFor="additionalTerms">Additional Terms & Conditions</Label>
                          <Textarea 
                            id="additionalTerms" 
                            placeholder="Enter any additional terms for the rental agreement"
                            rows={3}
                            value={formData.additionalTerms}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                  </CardContent>
                </Card>
              )}
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={step === 1 ? () => navigate("/dashboard") : prevStep}
                >
                  {step === 1 ? "Cancel" : (
                    <>
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Back
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={step === totalSteps ? handleSubmit : nextStep}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : step === totalSteps ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Create Agreement
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAgreement;