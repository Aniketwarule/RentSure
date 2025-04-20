import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
 
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" }
  ];
 
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-background/30 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div
                className="text-3xl font-bold text-gradient cursor-pointer"
                onClick={() => navigate("/")}
              >
                RentSure
              </div>
            </div>
           
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  className="font-medium"
                  onClick={() => navigate(link.path)}
                >
                  {link.name}
                </Button>
              ))}
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Button
                  onClick={() => navigate("/login")}
                >
                  Get Started
                </Button>
              </div>
            </nav>
           
            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle />
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="ml-1">
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
     
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-background/80 backdrop-blur-md border-b border-border animate-fade-in">
          <div className="p-4 space-y-2">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                className="w-full justify-start font-medium"
                onClick={() => {
                  navigate(link.path);
                  closeMenu();
                }}
              >
                {link.name}
              </Button>
            ))}
            <div className="pt-2 grid grid-cols-2 gap-2">
              <Button
                className="w-full"
                onClick={() => {
                  navigate("/login");
                  closeMenu();
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}