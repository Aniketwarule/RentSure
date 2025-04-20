
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, X } from "lucide-react";

export interface FilterValues {
  search: string;
  propertyType: string;
  status: string;
  priceRange: [number, number];
  bedrooms: string;
  bathrooms: string;
  petsAllowed: boolean;
}

interface PropertyFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  className?: string;
}

export function PropertyFilters({ onFilterChange, className = "" }: PropertyFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    search: "",
    propertyType: "",
    status: "",
    priceRange: [500, 5000],
    bedrooms: "",
    bathrooms: "",
    petsAllowed: false
  });

  const handleFilterChange = (key: keyof FilterValues, value: any) => {
    const newFilters = { ...filters, [key]: value } as FilterValues;
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterValues = {
      search: "",
      propertyType: "",
      status: "",
      priceRange: [500, 5000],
      bedrooms: "",
      bathrooms: "",
      petsAllowed: false
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            className="pl-8"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>
        
        {/* Quick filters */}
        <div className="flex gap-2">
          <Select 
            value={filters.propertyType} 
            onValueChange={(value) => handleFilterChange("propertyType", value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={filters.status} 
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="vacant">Vacant</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Advanced filters */}
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Advanced Filters</SheetTitle>
                <SheetDescription>
                  Refine your property search
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <Label>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Label>
                  <Slider
                    defaultValue={[500, 5000]}
                    min={0}
                    max={10000}
                    step={100}
                    value={filters.priceRange}
                    onValueChange={(value) => handleFilterChange("priceRange", value)}
                    className="mt-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Bedrooms</Label>
                  <Select 
                    value={filters.bedrooms} 
                    onValueChange={(value) => handleFilterChange("bedrooms", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Bathrooms</Label>
                  <Select 
                    value={filters.bathrooms} 
                    onValueChange={(value) => handleFilterChange("bathrooms", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="1.5">1.5+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="pets-allowed">Pets Allowed</Label>
                  <Switch 
                    id="pets-allowed"
                    checked={filters.petsAllowed}
                    onCheckedChange={(checked) => handleFilterChange("petsAllowed", checked)}
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="w-full" onClick={resetFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                  <Button className="w-full" onClick={() => setIsFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
