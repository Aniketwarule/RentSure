
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  DollarSign, 
  Settings, 
  MessageSquare,
  LayoutDashboard
} from "lucide-react";

export const DashboardSidebar = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  
  const navItems = [
    { icon: LayoutDashboard, name: "Dashboard", path: "/dashboard" },
    { icon: FileText, name: "Create Property", path: "/create-property" },
    { icon: Home, name: "Properties", path: "/properties" },
    { icon: FileText, name: "Agrreements", path: "/create-agreement" },
    { icon: DollarSign, name: "Payments", path: "/payments" },
    { icon: MessageSquare, name: "Messages", path: "/messages" }
  ];
  
  return (
    <div className={`border-r bg-card transition-all duration-300 ease-in-out ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name} className="px-2">
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${collapsed ? 'px-2' : 'px-4'}`}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className={`${collapsed ? 'mr-0' : 'mr-2'} h-5 w-5`} />
                  {!collapsed && <span>{item.name}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t mt-auto">
          <Button 
            variant="outline" 
            className={`w-full ${collapsed ? 'p-2' : ''}`}
            onClick={() => navigate('/account')}
          >
            {collapsed ? (
              <Settings className="h-5 w-5" />
            ) : (
              <>
                <Settings className="mr-2 h-4 w-4" />
                Account
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
