import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  CheckCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CreateAgreement = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 2;
  
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleFinish = () => {
    navigate("/agreements");
  };
  
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
                  Enter the required details to generate a legally valid rental agreement
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
              <div className="grid grid-cols-2 gap-4">
                <div className={`flex flex-col items-center p-3 rounded-lg ${step >= 1 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <User className="h-5 w-5 mb-1" />
                  <span className="text-xs text-center">Party Details</span>
                </div>
                <div className={`flex flex-col items-center p-3 rounded-lg ${step >= 2 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <FileText className="h-5 w-5 mb-1" />
                  <span className="text-xs text-center">Agreement Terms</span>
                </div>
              </div>
              
              {/* Step 1: Party Details */}
              {step === 1 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Landlord & Tenant Details</h2>
                      
                      <div className="space-y-6">
                        {/* Landlord Details Section */}
                        <div className="space-y-4">
                          <h3 className="text-base font-medium text-primary">Landlord Details</h3>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="landlordName">Full Name</Label>
                              <Input id="landlordName" placeholder="Enter landlord's full name" />
                            </div>
                            <div>
                              <Label htmlFor="landlordAge">Age</Label>
                              <Input id="landlordAge" type="number" placeholder="Enter age" />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="landlordPhone">Phone Number</Label>
                              <Input id="landlordPhone" placeholder="Enter 10-digit phone number" maxLength={10} />
                            </div>
                            <div>
                              <Label htmlFor="landlordEmail">Email Address</Label>
                              <Input id="landlordEmail" type="email" placeholder="Enter email address" />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="landlordPAN">PAN Number</Label>
                            <Input id="landlordPAN" placeholder="Enter PAN number" maxLength={10} />
                          </div>
                          
                          <div>
                            <Label htmlFor="landlordAddress">Permanent Address</Label>
                            <Textarea 
                              id="landlordAddress" 
                              placeholder="Enter permanent address"
                              rows={2}
                            />
                          </div>
                        </div>
                        
                        {/* Tenant Details Section */}
                        <div className="space-y-4">
                          <h3 className="text-base font-medium text-primary">Tenant Details</h3>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="tenantName">Full Name</Label>
                              <Input id="tenantName" placeholder="Enter tenant's full name" />
                            </div>
                            <div>
                              <Label htmlFor="tenantAge">Age</Label>
                              <Input id="tenantAge" type="number" placeholder="Enter age" />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="tenantPhone">Phone Number</Label>
                              <Input id="tenantPhone" placeholder="Enter 10-digit phone number" maxLength={10} />
                            </div>
                            <div>
                              <Label htmlFor="tenantEmail">Email Address</Label>
                              <Input id="tenantEmail" type="email" placeholder="Enter email address" />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="tenantPAN">PAN Number</Label>
                              <Input id="tenantPAN" placeholder="Enter PAN number" maxLength={10} />
                            </div>
                            <div>
                              <Label htmlFor="tenantAadhar">Aadhar Number</Label>
                              <Input id="tenantAadhar" placeholder="Enter 12-digit Aadhar number" maxLength={12} />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="tenantPermanentAddress">Permanent Address</Label>
                            <Textarea 
                              id="tenantPermanentAddress" 
                              placeholder="Enter permanent address"
                              rows={2}
                            />
                          </div>
                          
                          <div>
                            <div className="flex items-center space-x-2">
                              <Checkbox id="additionalTenants" />
                              <Label htmlFor="additionalTenants">Add Additional Tenants</Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Step 2: Agreement Terms */}
              {step === 2 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Agreement Terms</h2>
                      
                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="agreementStartDate">Agreement Start Date</Label>
                            <Input id="agreementStartDate" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="agreementDuration">Agreement Duration</Label>
                            <Select>
                              <SelectTrigger id="agreementDuration">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="6months">6 Months</SelectItem>
                                <SelectItem value="11months">11 Months</SelectItem>
                                <SelectItem value="1year">1 Year</SelectItem>
                                <SelectItem value="2years">2 Years</SelectItem>
                                <SelectItem value="3years">3 Years</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="monthlyRent">Monthly Rent (₹)</Label>
                            <Input id="monthlyRent" type="number" placeholder="0" />
                          </div>
                          <div>
                            <Label htmlFor="securityDeposit">Security Deposit (₹)</Label>
                            <Input id="securityDeposit" type="number" placeholder="0" />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="rentPaymentDate">Rent Payment Date</Label>
                          <Select>
                            <SelectTrigger id="rentPaymentDate">
                              <SelectValue placeholder="Select payment date" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1st of every month</SelectItem>
                              <SelectItem value="5">5th of every month</SelectItem>
                              <SelectItem value="7">7th of every month</SelectItem>
                              <SelectItem value="10">10th of every month</SelectItem>
                              <SelectItem value="15">15th of every month</SelectItem>
                              <SelectItem value="other">Other date</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="rentPaymentMode">Rent Payment Mode Acceptable</Label>
                          <RadioGroup defaultValue="online" className="flex flex-col space-y-1 mt-2">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="online" id="online" />
                              <Label htmlFor="online">Online Transfer (UPI/IMPS/NEFT)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="cash" id="cash" />
                              <Label htmlFor="cash">Crypto Transfer</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="cheque" id="cheque" />
                              <Label htmlFor="cheque">Both</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        
                        <div>
                          <Label>Lock-in Period</Label>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <Label htmlFor="lockInPeriod">Duration (Months)</Label>
                              <Input id="lockInPeriod" type="number" placeholder="0" min="0" />
                            </div>
                            <div className="flex items-center pt-6">
                              <Checkbox id="noLockInPeriod" />
                              <Label htmlFor="noLockInPeriod" className="ml-2">No Lock-in Period</Label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Notice Period</Label>
                          <Select>
                            <SelectTrigger id="noticePeriod">
                              <SelectValue placeholder="Select notice period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30days">1 Month</SelectItem>
                              <SelectItem value="60days">2 Months</SelectItem>
                              <SelectItem value="90days">3 Months</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Utilities & Maintenance</Label>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox id="electricityBill" />
                                <Label htmlFor="electricityBill">Electricity Bill (Tenant)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="waterBill" />
                                <Label htmlFor="waterBill">Water Bill (Tenant)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="maintenanceCharge" />
                                <Label htmlFor="maintenanceCharge">Maintenance Charge (Tenant)</Label>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox id="gasBill" />
                                <Label htmlFor="gasBill">Gas Bill (Tenant)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="internetBill" />
                                <Label htmlFor="internetBill">Internet Bill (Tenant)</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="societyCharge" />
                                <Label htmlFor="societyCharge">Society Charge (Landlord)</Label>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="additionalTerms">Additional Terms & Conditions</Label>
                          <Textarea 
                            id="additionalTerms" 
                            placeholder="Enter any additional terms for the rental agreement"
                            rows={3}
                          />
                        </div>
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
                
                <Button onClick={step === totalSteps ? handleFinish : nextStep}>
                  {step === totalSteps ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Generate Agreement
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