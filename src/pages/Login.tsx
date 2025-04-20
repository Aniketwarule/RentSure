import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "../components/Layout";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  onAuthStateChanged 
} from "firebase/auth";

import { getAnalytics } from "firebase/analytics";
import { baseUrl } from "@/App";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwu6Xw2g-bwFY0tRHclI8yur-TXQrkkvY",
  authDomain: "rentsure-c99b1.firebaseapp.com",
  projectId: "rentsure-c99b1",
  storageBucket: "rentsure-c99b1.firebasestorage.app",
  messagingSenderId: "176317735849",
  appId: "1:176317735849:web:0c51c3bd6382248d3f5ab8",
  measurementId: "G-MV1ZB19VKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const LandlordLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   // Check if landlord is already logged in
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // Store the token based on remember me preference
  //       user.getIdToken().then(token => {
  //         if (rememberMe) {
  //           localStorage.setItem('authToken', token);
  //         } else {
  //           sessionStorage.setItem('authToken', token);
  //         }
  //         navigate('/landlord-dashboard');
  //       });
  //     }
  //   });
    
  //   return () => unsubscribe();
  // }, []);
  
  // Function to store user data in MongoDB using Axios
  const storeUserInMongoDB = async (userData) => {
    try {
      const response = await axios.post(`${baseUrl}/api/landlords/`, userData);
      return response.data;
    } catch (error) {
      console.error('Error storing user in MongoDB:', error);
      // Continue with login flow despite MongoDB error
      toast.error('Warning: User profile data could not be saved to database');
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get ID token
      const idToken = await user.getIdToken();
      
      // Prepare user data for MongoDB
      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || null,
        photoURL: user.photoURL || null,
        emailVerified: user.emailVerified,
        authProvider: 'email',
      };
      
      // Store in MongoDB
      await storeUserInMongoDB(userData);
      
      // Store the token based on remember me preference
      if (rememberMe) {
        localStorage.setItem('authToken', idToken);
      } else {
        sessionStorage.setItem('authToken', idToken);
      }
      
      toast.success('Logged in successfully');
      navigate('/landlord-dashboard');
      
    } catch (error) {
      console.error("Login error:", error);
      
      let errorMessage = "Failed to login. Please check your credentials and try again.";
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        errorMessage = "Invalid email or password";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed login attempts. Please try again later.";
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      // Sign in with Google using Firebase
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Get ID token
      const idToken = await user.getIdToken();
      
      // Prepare user data for MongoDB with Google profile info
      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        authProvider: 'google',
        // Additional Google account metadata
        googleProfile: {
          providerId: result.providerId || 'google.com',
        }
      };
      
      // Store in MongoDB using Axios
      await storeUserInMongoDB(userData);
      
      // Store the token based on remember me preference
      localStorage.setItem('authToken', idToken);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userName', user.displayName || '');
      localStorage.setItem('userUid', user.uid);
      localStorage.setItem('userProvider', user.providerId);
      localStorage.setItem('userPhotoURL', user.photoURL || '');
      localStorage.setItem('userAuthProvider', 'google');
      localStorage.setItem('userGoogleProfile', JSON.stringify(userData.googleProfile));
    
      sessionStorage.setItem('authToken', idToken);
      sessionStorage.setItem('userEmail', user.email);
      sessionStorage.setItem('userName', user.displayName || '');
      sessionStorage.setItem('userUid', user.uid);
      sessionStorage.setItem('userProvider', user.providerId);
      sessionStorage.setItem('userPhotoURL', user.photoURL || '');
      sessionStorage.setItem('userAuthProvider', 'google');
      sessionStorage.setItem('userGoogleProfile', JSON.stringify(userData.googleProfile));
      
      toast.success('Logged in successfully with Google');
      navigate('/landlord-dashboard');

    } catch (error) {
      console.error('Google login error:', error);
      
      let errorMessage = "Failed to login with Google. Please try again.";
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Google sign-in was canceled.";
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = "Pop-up was blocked by your browser. Please allow pop-ups for this site.";
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Card className="border animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Landlord Login</CardTitle>
              <CardDescription>
                Sign in to your RentSure landlord account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground"
                  >
                    Remember me for 30 days
                  </label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-2 text-xs text-muted-foreground">
                    OR CONTINUE WITH
                  </span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24 12.0004 24Z"
                    fill="#34A853"
                  />
                </svg>
                Sign in with Google
              </Button>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/landlord-register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LandlordLogin;