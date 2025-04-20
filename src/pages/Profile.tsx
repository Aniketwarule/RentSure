import { Layout } from "../components/Layout";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, Home, History } from "lucide-react";

const Profile = () => {
  // State for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [authProvider, setAuthProvider] = useState("");
  const [uid, setUid] = useState("");
  const [formChanged, setFormChanged] = useState(false);
  
  // Load user data from localStorage on component mount
  useEffect(() => {
    const userName = localStorage.getItem('userName') || sessionStorage.getItem('userName') || "";
    const userEmail = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail') || "";
    const userUid = localStorage.getItem('userUid') || sessionStorage.getItem('userUid') || "";
    const userPhotoURL = localStorage.getItem('userPhotoURL') || sessionStorage.getItem('userPhotoURL') || "";
    const userAuthProvider = localStorage.getItem('userAuthProvider') || sessionStorage.getItem('userAuthProvider') || "";
    
    setFullName(userName);
    setEmail(userEmail);
    setUid(userUid);
    setPhotoURL(userPhotoURL);
    setAuthProvider(userAuthProvider);
    
    // Default phone and bio
    setPhone(phone || "");
    setBio(bio || "Tell us about yourself...");
  }, []);
  
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setFormChanged(true);
  };
  
  const handleSaveProfile = () => {
    // Here you would typically save the changes to your backend
    // For now, just update localStorage
    localStorage.setItem('userName', fullName);
    localStorage.setItem('userEmail', email);
    
    toast.success("Profile updated successfully");
    setFormChanged(false);
  };
  
  return (
    <Layout>
      <div className="flex min-h-screen bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6">
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold">My Profile</h1>
                  <p className="text-muted-foreground">
                    Manage your personal information and settings
                  </p>
                </div>
                {formChanged && (
                  <Button onClick={handleSaveProfile}>Save All Changes</Button>
                )}
              </div>
              
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid grid-cols-3 md:grid-cols-4 mb-6">
                  <TabsTrigger value="personal" className="flex items-center gap-2">
                    <User size={16} />
                    <span className="hidden md:inline">Personal Info</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-2">
                    <Settings size={16} />
                    <span className="hidden md:inline">Settings</span>
                  </TabsTrigger>
                  <TabsTrigger value="properties" className="flex items-center gap-2">
                    <Home size={16} />
                    <span className="hidden md:inline">Properties</span>
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="flex items-center gap-2">
                    <History size={16} />
                    <span className="hidden md:inline">Activity</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your account details and profile information</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="full-name">Full Name</Label>
                          <Input 
                            id="full-name" 
                            value={fullName}
                            onChange={handleInputChange(setFullName)}
                            placeholder="Your full name"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email"
                            value={email}
                            onChange={handleInputChange(setEmail)}
                            placeholder="your.email@example.com"
                            disabled={authProvider === "google"}
                          />
                          {authProvider === "google" && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Email managed by Google authentication
                            </p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={phone}
                            onChange={handleInputChange(setPhone)}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea 
                            id="bio" 
                            value={bio}
                            onChange={handleInputChange(setBio)}
                            rows={4}
                            placeholder="Tell us about yourself..."
                          />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between flex-wrap gap-2">
                        <div className="text-sm text-muted-foreground">
                          <span>User ID: </span>
                          <code className="bg-muted px-1 py-0.5 rounded">{uid.substring(0, 8)}...</code>
                        </div>
                        <Button onClick={handleSaveProfile} disabled={!formChanged}>Save Changes</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Picture</CardTitle>
                        <CardDescription>Your account image</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center space-y-4">
                        <Avatar className="h-40 w-40 border-2 border-primary/10">
                          <AvatarImage src={photoURL} alt={fullName} />
                          <AvatarFallback className="text-2xl bg-primary/10">{getInitials(fullName)}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex flex-col items-center gap-2 w-full">                          
                          <Badge variant={authProvider === "google" ? "default" : "outline"} className="mt-2">
                            {authProvider === "google" ? "Google Account" : "Email Login"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Preferences</CardTitle>
                      <CardDescription>Customize your application experience</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Settings panel content would go here</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="properties">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Properties</CardTitle>
                      <CardDescription>Manage your real estate portfolio</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Property management panel would go here</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="activity">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>View your recent account activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Activity log would go here</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;