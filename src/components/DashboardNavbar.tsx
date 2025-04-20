import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  LogOut, 
  Menu, 
  MessageSquare, 
  Settings, 
  User, 
  X,
  Wallet
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { getAuth } from "firebase/auth";
import { useConnect, useAccount, useDisconnect } from 'wagmi';

export function DashboardNavbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  
  const { connectors, connect } = useConnect({
    onSuccess() {
      toast.success("Wallet connected successfully!");
      setIsWalletDialogOpen(false);
    },
    onError(error) {
      toast.error(`Connection failed: ${error.message}`);
    }
  });
  
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const name = localStorage.getItem('userName') || "User";
  
  const handleOpenWalletDialog = () => {
    setIsWalletDialogOpen(true);
  };
  
  const handleConnectWallet = (connector) => {
    try {
      console.log('Hiii')
      connect({ connector });
    } catch (error) {
      console.error("Wallet connection error:", error);
      toast.error("Failed to connect wallet. Please try again.");
    }
  };
  
  const handleDisconnectWallet = () => {
    disconnect();
    toast.success("Wallet disconnected successfully!");
  };
  
  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    getAuth().signOut()
      .then(() => {
        console.log('User signed out successfully');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
    navigate('/login');
    toast.success("Logged out successfully!");
  };
  
  // Format wallet address for display
  const formatWalletAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  
  return (
    <header className="sticky top-0 z-40 w-full bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div 
              className="text-3xl font-bold text-gradient cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              RentSure
            </div>
          </div>
              
          <div className="flex items-center space-x-2">
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    {formatWalletAddress(address)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => {
                    navigator.clipboard.writeText(address);
                    toast.success("Address copied to clipboard");
                  }}>
                    Copy Address
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDisconnectWallet}>
                    Disconnect Wallet
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleOpenWalletDialog}>
                Connect Wallet
              </Button>
            )}
                
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-auto">
                  <div className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">New maintenance request</p>
                      <p className="text-sm text-muted-foreground">
                        A tenant has submitted a new maintenance request.
                      </p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Payment received</p>
                      <p className="text-sm text-muted-foreground">
                        You have received a payment for $1,200.
                      </p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button variant="outline" className="w-full" size="sm">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Messages */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/messages")}
              className="relative"
            >
              <MessageSquare className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive"></span>
            </Button>
            
            <ThemeToggle />
            
            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-8 w-8 rounded-full"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border animate-in slide-in-from-left">
          <nav className="grid gap-2 p-4">
            <Button 
              variant="ghost" 
              className="justify-start" 
              onClick={() => {
                navigate("/dashboard");
                closeMenu();
              }}
            >
              Dashboard
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start" 
              onClick={() => {
                navigate("/properties");
                closeMenu();
              }}
            >
              Properties
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start" 
              onClick={() => {
                navigate("/tenants");
                closeMenu();
              }}
            >
              Tenants
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start" 
              onClick={() => {
                navigate("/payments");
                closeMenu();
              }}
            >
              Payments
            </Button>
            <Button 
              variant="ghost" 
              className="justify-start" 
              onClick={() => {
                navigate("/maintenance");
                closeMenu();
              }}
            >
              Maintenance
            </Button>
          </nav>
        </div>
      )}
      
      {/* Wallet Connection Dialog */}
      <Dialog open={isWalletDialogOpen} onOpenChange={setIsWalletDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect your wallet</DialogTitle>
            <DialogDescription>
              Select a wallet provider to connect with RentSure
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {connectors.map((connector) => (
              <Button
                key={connector.id}
                variant="outline"
                className="flex items-center justify-between p-4 h-auto"
                onClick={() => handleConnectWallet(connector)}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{connector.name}</span>
                  {/* {!connector.ready && <span className="text-xs text-muted-foreground">Not installed</span>} */}
                </div>
                {/* Icons could be added here based on wallet type */}
                {connector.id === 'metaMask' && (
                  <img src="/metamask-logo.svg" alt="MetaMask" className="h-6 w-6" />
                )}
              </Button>
            ))}
            
            {connectors.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                No wallet providers available. Please install MetaMask or another Web3 wallet.
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-muted-foreground text-center">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy
            </span>
            <Button variant="outline" onClick={() => setIsWalletDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}