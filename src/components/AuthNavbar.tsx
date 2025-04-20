
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

export function AuthNavbar() {
  const navigate = useNavigate();
  
  return (
    <header className="w-full py-4 px-6 bg-background border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold text-gradient cursor-pointer"
            onClick={() => navigate("/")}
          >
            RentSure
          </div>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
