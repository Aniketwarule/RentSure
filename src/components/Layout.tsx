
import { Navbar } from "./Navbar";
import { AuthNavbar } from "./AuthNavbar";
import { DashboardNavbar } from "./DashboardNavbar";
import { Footer } from "./Footer";
import { ThemeProvider } from "./ThemeProvider";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  
  // Define route patterns
  const isAuthPage = ["/login", "/register"].some(path => location.pathname === path);
  const isDashboardPage = [
    "/dashboard", 
    "/landlord-dashboard", 
    "/tenant-dashboard",
    "/properties", 
    "/property",
    "/payments", 
    "/tenants",
    "/messages",
    "/maintenance",
    "/create-property",
    "/create-agreement",
    "/settings",
    "/profile"
  ].some(path => location.pathname.startsWith(path));
  
  // Hydration fix for theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex min-h-screen flex-col">
        {isAuthPage ? (
          <AuthNavbar />
        ) : isDashboardPage ? (
          <DashboardNavbar />
        ) : (
          <Navbar />
        )}
        <main className={`flex-1 ${isDashboardPage ? 'mt-0' : isAuthPage ? 'mt-0' : 'pt-16'}`}>
          {children}
        </main>
        {!isDashboardPage && <Footer />}
      </div>
    </ThemeProvider>
  );
}
