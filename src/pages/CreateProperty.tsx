import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Upload,
  Home,
  MapPin,
  Loader2,
  DollarSign,
  Calendar,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { baseUrl } from "@/App";
import { useAccount, useWalletClient, useWriteContract } from "wagmi";
import { contract } from "../lib/contract";

const CreateProperty = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3; // Changed to 3 steps
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreview, setFilePreview] = useState([]);
  const { address } = useAccount();

  const { data, isPending, isSuccess, writeContract } = useWriteContract();

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1: Property Location
    propertyType: "",
    bhkType: "",
    furnishingStatus: "",
    address: {
      fullAddress: "",
      locality: "",
      landmark: "",
      city: "",
      pincode: "",
    },

    // Step 2: Rental Terms
    monthlyRent: "",
    rentAmountInFiat: "", // Renamed from monthlyRent for consistency
    rentAmountInCrypto: 0,
    preferredPaymentMode: "fiat", // Default payment mode
    securityDeposit: "",
    maintenanceCharges: "",
    maintenanceAmount: "",
    rentDueDay: 1,

    // Step 3: Lease and Tenant Preferences
    leaseDuration: "",
    availability: "",
    preferredTenants: "",
    petsAllowed: "",
    additionalTerms: "",

    // Metadata
    propertyHash: "",
    landlordId: localStorage.getItem("userUid") || "1",
    landlord: localStorage.getItem("userName") || "User",
    active: true,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id.includes(".")) {
      // Handle nested objects (like address.fullAddress)
      const [parent, child] = id.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  // Handle select changes
  const handleSelectChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setFilePreview(previews);
  };

  const nextStep = () => {
    // Basic validation for first step
    if (step === 1) {
      if (
        !formData.propertyType ||
        !formData.bhkType ||
        !formData.furnishingStatus ||
        !formData.address.fullAddress ||
        !formData.address.locality ||
        !formData.address.city ||
        !formData.address.pincode
      ) {
        toast({
          title: "Missing Fields",
          description: "Please fill all required fields to continue.",
          variant: "destructive",
        });
        return;
      }
    }

    // Validation for second step
    if (step === 2) {
      if (
        !formData.monthlyRent ||
        !formData.securityDeposit ||
        !formData.rentDueDay ||
        !formData.preferredPaymentMode
      ) {
        toast({
          title: "Missing Fields",
          description: "Please fill all required fields to continue.",
          variant: "destructive",
        });
        return;
      }
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

  const handleSubmit = async () => {
    // Basic validation for third step
    if (
      !formData.leaseDuration ||
      !formData.availability ||
      !formData.preferredTenants ||
      !formData.petsAllowed
    ) {
      toast({
        title: "Missing Fields",
        description: "Please fill all required fields before submission.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Create form data for multipart/form-data submission
      const submitData = new FormData();

      // Prepare property data with numeric values correctly parsed
      const propertyData = {
        ...formData,
        rentAmountInFiat: parseFloat(formData.monthlyRent) || 0,
        monthlyRent: parseFloat(formData.monthlyRent) || 0,
        securityDeposit: parseFloat(formData.securityDeposit) || 0,
        maintenanceAmount: formData.maintenanceAmount
          ? parseFloat(formData.maintenanceAmount)
          : 0,
        rentAmountInCrypto: parseFloat(formData.rentAmountInCrypto) || 0,
      };

      // Append each property field individually to FormData
      // This is one approach - appending the whole object as JSON
      submitData.append("propertyData", JSON.stringify(propertyData));

      // Debug: Let's see what data we're actually sending
      console.log("Property data being sent:", propertyData);

      // Add property images if selected
      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          submitData.append("propertyImages", file);
        });
        console.log("Number of images being sent:", selectedFiles.length);
      }

      // Parse values to ensure they're numbers
      const propertyHash = "QmXyz123"; // Replace with actual hash generation logic
      const rentAmountInFiat = parseFloat(formData.monthlyRent) || 0;
      const rentAmountInCrypto = parseFloat(formData.rentAmountInCrypto) || 0;
      const securityDeposit = parseFloat(formData.securityDeposit) || 0;
      const rentDueDay = parseInt(formData.rentDueDay) || 1;

      // Convert lease duration from string to months
      let leaseDuration = 0;
      switch (formData.leaseDuration) {
        case "6months":
          leaseDuration = 6;
          break;
        case "11months":
          leaseDuration = 11;
          break;
        case "1year":
          leaseDuration = 12;
          break;
        case "2years":
          leaseDuration = 24;
          break;
        case "3years":
          leaseDuration = 36;
          break;
        default:
          leaseDuration = 12; // default to 12 months
      }

      // Correct mapping for payment method enum
      const paymentMethod =
        formData.preferredPaymentMode === "crypto"
          ? 0
          : formData.preferredPaymentMode === "fiat"
          ? 1
          : 2;

      writeContract({
        address: contract.address as `0x${string}`,
        abi: contract.abi,
        functionName: "listProperty",
        args: [
          propertyHash,
          BigInt(Math.floor(rentAmountInFiat * 100)), // Convert to wei or smallest unit
          BigInt(Math.floor(rentAmountInCrypto * 100)), // Convert to wei or smallest unit
          BigInt(Math.floor(securityDeposit * 100)), // Convert to wei or smallest unit
          BigInt(rentDueDay),
          BigInt(leaseDuration),
          paymentMethod,
        ],
        account: address,
        chain: undefined,
      });

      console.log("Written in Contract");

      // Send the data to the backend
      const response = await axios.post(`${baseUrl}/api/properties/`, {
        propertyData,
      });

      console.log("Response from server:", response.data);

      toast({
        title: "Success!",
        description: "Property has been created successfully.",
      });

      // Navigate back to properties page
      navigate("/properties");
    } catch (error) {
      console.error("Error creating property:", error.response?.data || error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "Failed to create property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Add Rental Property</h1>
                <p className="text-muted-foreground">
                  Enter your property details to generate a smart rent agreement
                </p>
              </div>

              {/* Progress indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    Step {step} of {totalSteps}
                  </span>
                  <span>{Math.round((step / totalSteps) * 100)}%</span>
                </div>
                <Progress value={(step / totalSteps) * 100} />
              </div>

              {/* Step indicators */}
              <div className="grid grid-cols-3 gap-4">
                <div
                  className={`flex flex-col items-center p-3 rounded-lg ${
                    step >= 1
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <MapPin className="h-5 w-5 mb-1" />
                  <span className="text-xs text-center">Property Location</span>
                </div>
                <div
                  className={`flex flex-col items-center p-3 rounded-lg ${
                    step >= 2
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <DollarSign className="h-5 w-5 mb-1" />
                  <span className="text-xs text-center">Rental Amount</span>
                </div>
                <div
                  className={`flex flex-col items-center p-3 rounded-lg ${
                    step >= 3
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Calendar className="h-5 w-5 mb-1" />
                  <span className="text-xs text-center">Lease Terms</span>
                </div>
              </div>

              {/* Step 1: Property Location */}
              {step === 1 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">
                        Property Location
                      </h2>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="propertyType">Property Type</Label>
                          <Select
                            value={formData.propertyType}
                            onValueChange={(value) =>
                              handleSelectChange("propertyType", value)
                            }
                          >
                            <SelectTrigger id="propertyType">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="apartment">
                                Apartment/Flat
                              </SelectItem>
                              <SelectItem value="independenthouse">
                                Independent House
                              </SelectItem>
                              <SelectItem value="villa">Villa</SelectItem>
                              <SelectItem value="builderfloor">
                                Builder Floor
                              </SelectItem>
                              <SelectItem value="pg">PG/Hostel</SelectItem>
                              <SelectItem value="studio">
                                Studio Apartment
                              </SelectItem>
                              <SelectItem value="serviceapartment">
                                Service Apartment
                              </SelectItem>
                              <SelectItem value="farmhouse">
                                Farmhouse
                              </SelectItem>
                              <SelectItem value="commercial">
                                Commercial Space
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="bhkType">BHK Type</Label>
                            <Select
                              value={formData.bhkType}
                              onValueChange={(value) =>
                                handleSelectChange("bhkType", value)
                              }
                            >
                              <SelectTrigger id="bhkType">
                                <SelectValue placeholder="Select BHK" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1rk">1 RK</SelectItem>
                                <SelectItem value="1bhk">1 BHK</SelectItem>
                                <SelectItem value="2bhk">2 BHK</SelectItem>
                                <SelectItem value="3bhk">3 BHK</SelectItem>
                                <SelectItem value="4bhk">4 BHK</SelectItem>
                                <SelectItem value="5+bhk">5+ BHK</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="furnishingStatus">
                              Furnishing Status
                            </Label>
                            <Select
                              value={formData.furnishingStatus}
                              onValueChange={(value) =>
                                handleSelectChange("furnishingStatus", value)
                              }
                            >
                              <SelectTrigger id="furnishingStatus">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="unfurnished">
                                  Unfurnished
                                </SelectItem>
                                <SelectItem value="semifurnished">
                                  Semi-Furnished
                                </SelectItem>
                                <SelectItem value="fullyfurnished">
                                  Fully Furnished
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="address.fullAddress">
                            Full Address
                          </Label>
                          <Input
                            id="address.fullAddress"
                            placeholder="House/Flat No., Building Name, Street"
                            value={formData.address.fullAddress}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="address.locality">
                              Locality/Area
                            </Label>
                            <Input
                              id="address.locality"
                              placeholder="Koramangala, Indiranagar, etc."
                              value={formData.address.locality}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="address.landmark">
                              Landmark (Optional)
                            </Label>
                            <Input
                              id="address.landmark"
                              placeholder="Near Metro Station, Temple, etc."
                              value={formData.address.landmark}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="address.city">City</Label>
                            <Input
                              id="address.city"
                              placeholder="Pune, Mumbai, etc."
                              value={formData.address.city}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="address.pincode">Pincode</Label>
                            <Input
                              id="address.pincode"
                              placeholder="6-digit pincode"
                              maxLength={6}
                              value={formData.address.pincode}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Rental Amount */}
              {step === 2 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Rental Amount</h2>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="preferredPaymentMode">
                            Preferred Payment Mode
                          </Label>
                          <Select
                            value={formData.preferredPaymentMode}
                            onValueChange={(value) =>
                              handleSelectChange("preferredPaymentMode", value)
                            }
                          >
                            <SelectTrigger id="preferredPaymentMode">
                              <SelectValue placeholder="Select payment mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fiat">
                                Rupees (₹) Only
                              </SelectItem>
                              <SelectItem value="crypto">
                                Cryptocurrency Only
                              </SelectItem>
                              <SelectItem value="both">
                                Both (Rupees & Crypto)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="monthlyRent">
                              Monthly Rent{" "}
                              {formData.preferredPaymentMode !== "crypto"
                                ? "(₹)"
                                : "(Disabled)"}
                            </Label>
                            <Input
                              id="monthlyRent"
                              type="number"
                              placeholder="0"
                              value={formData.monthlyRent}
                              onChange={handleInputChange}
                              disabled={
                                formData.preferredPaymentMode === "crypto"
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="rentAmountInCrypto">
                              {formData.preferredPaymentMode !== "fiat"
                                ? "Crypto Amount"
                                : "Crypto Equivalent (Disabled)"}
                            </Label>
                            <Input
                              id="rentAmountInCrypto"
                              type="number"
                              placeholder="0"
                              value={formData.rentAmountInCrypto}
                              onChange={handleInputChange}
                              disabled={
                                formData.preferredPaymentMode === "fiat"
                              }
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="securityDeposit">
                              Security Deposit{" "}
                              {formData.preferredPaymentMode === "crypto"
                                ? "(Crypto)"
                                : "(₹)"}
                            </Label>
                            <Input
                              id="securityDeposit"
                              type="number"
                              placeholder="0"
                              value={formData.securityDeposit}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div>
                            <Label htmlFor="rentDueDay">Rent Due Day</Label>
                            <Select
                              value={formData.rentDueDay.toString()}
                              onValueChange={(value) =>
                                handleSelectChange(
                                  "rentDueDay",
                                  parseInt(value)
                                )
                              }
                            >
                              <SelectTrigger id="rentDueDay">
                                <SelectValue placeholder="Select day" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((day) => (
                                  <SelectItem key={day} value={day.toString()}>
                                    {day === 1
                                      ? "1st"
                                      : day === 2
                                      ? "2nd"
                                      : day === 3
                                      ? "3rd"
                                      : `${day}th`}{" "}
                                    of each month
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="maintenanceCharges">
                              Maintenance Charges
                            </Label>
                            <Select
                              value={formData.maintenanceCharges}
                              onValueChange={(value) =>
                                handleSelectChange("maintenanceCharges", value)
                              }
                            >
                              <SelectTrigger id="maintenanceCharges">
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="included">
                                  Included in Rent
                                </SelectItem>
                                <SelectItem value="separate">
                                  Paid Separately
                                </SelectItem>
                                <SelectItem value="none">
                                  No Maintenance
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="maintenanceAmount">
                              Amount (if separate) (₹)
                            </Label>
                            <Input
                              id="maintenanceAmount"
                              type="number"
                              placeholder="0"
                              value={formData.maintenanceAmount}
                              onChange={handleInputChange}
                              disabled={
                                formData.maintenanceCharges !== "separate"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Lease Terms and Tenant Preferences */}
              {step === 3 && (
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold">Lease Terms</h2>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="leaseDuration">
                              Lease Duration
                            </Label>
                            <Select
                              value={formData.leaseDuration}
                              onValueChange={(value) =>
                                handleSelectChange("leaseDuration", value)
                              }
                            >
                              <SelectTrigger id="leaseDuration">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="6months">
                                  6 Months
                                </SelectItem>
                                <SelectItem value="11months">
                                  11 Months
                                </SelectItem>
                                <SelectItem value="1year">1 Year</SelectItem>
                                <SelectItem value="2years">2 Years</SelectItem>
                                <SelectItem value="3years">3 Years</SelectItem>
                                <SelectItem value="custom">Custom</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="availability">Availability</Label>
                            <Select
                              value={formData.availability}
                              onValueChange={(value) =>
                                handleSelectChange("availability", value)
                              }
                            >
                              <SelectTrigger id="availability">
                                <SelectValue placeholder="Select availability" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="instant">
                                  Immediate/Instant
                                </SelectItem>
                                <SelectItem value="15days">
                                  Within 15 Days
                                </SelectItem>
                                <SelectItem value="30days">
                                  Within 30 Days
                                </SelectItem>
                                <SelectItem value="60days">
                                  Within 60 Days
                                </SelectItem>
                                <SelectItem value="custom">
                                  Custom Date
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="preferredTenants">
                              Preferred Tenants
                            </Label>
                            <Select
                              value={formData.preferredTenants}
                              onValueChange={(value) =>
                                handleSelectChange("preferredTenants", value)
                              }
                            >
                              <SelectTrigger id="preferredTenants">
                                <SelectValue placeholder="Select preference" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="family">Family</SelectItem>
                                <SelectItem value="bachelors">
                                  Bachelors
                                </SelectItem>
                                <SelectItem value="company">Company</SelectItem>
                                <SelectItem value="any">Any</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="petsAllowed">Pets Allowed</Label>
                            <Select
                              value={formData.petsAllowed}
                              onValueChange={(value) =>
                                handleSelectChange("petsAllowed", value)
                              }
                            >
                              <SelectTrigger id="petsAllowed">
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="yes">Yes</SelectItem>
                                <SelectItem value="no">No</SelectItem>
                                <SelectItem value="negotiable">
                                  Negotiable
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="additionalTerms">
                            Additional Terms & Conditions
                          </Label>
                          <Textarea
                            id="additionalTerms"
                            placeholder="Enter any additional terms for the rental agreement"
                            rows={3}
                            value={formData.additionalTerms}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div>
                          <Label htmlFor="photos">Property Photos</Label>
                          <div className="mt-1 flex flex-col space-y-4">
                            <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-muted-foreground/25 rounded-md">
                              <div className="space-y-2 text-center">
                                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                                <div className="flex text-sm text-muted-foreground">
                                  <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-background rounded-md font-medium text-primary hover:text-primary/80"
                                  >
                                    <span>Upload photos</span>
                                    <input
                                      id="file-upload"
                                      name="propertyImages"
                                      type="file"
                                      className="sr-only"
                                      multiple
                                      onChange={handleFileChange}
                                      accept="image/png, image/jpeg, image/gif"
                                    />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </div>

                            {/* Show file previews */}
                            {filePreview.length > 0 && (
                              <div>
                                <Label>
                                  Selected Photos ({filePreview.length})
                                </Label>
                                <div className="grid grid-cols-4 gap-2 mt-2">
                                  {filePreview.map((preview, index) => (
                                    <div
                                      key={index}
                                      className="relative h-24 border rounded overflow-hidden"
                                    >
                                      <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={
                    step === 1 ? () => navigate("/properties") : prevStep
                  }
                  disabled={isSubmitting}
                >
                  {step === 1 ? (
                    "Cancel"
                  ) : (
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
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : step === totalSteps ? (
                    "Generate Agreement"
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

export default CreateProperty;
