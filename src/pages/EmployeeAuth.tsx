import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EmployeeAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect authenticated users to employee dashboard
    if (user) {
      navigate("/employee-dashboard");
    }
  }, [user, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      // Check if user has an employee profile
      const { data: employeeProfile, error: profileError } = await supabase
        .from('employee_profiles')
        .select('*')
        .eq('user_id', authData.user.id)
        .eq('is_active', true)
        .single();

      if (profileError || !employeeProfile) {
        // Sign out if not an employee
        await supabase.auth.signOut();
        
        toast({
          title: "Access Denied",
          description: "This login is for employees only. Please contact your administrator.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Welcome!",
        description: `Welcome back, ${employeeProfile.first_name}!`,
      });

      // Redirect to employee dashboard
      navigate("/employee-dashboard");

    } catch (error: any) {
      console.error('Employee sign in error:', error);
      toast({
        title: "Sign In Failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return null; // Prevent rendering while redirecting
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Employee Login</CardTitle>
              <CardDescription>
                Sign in to your employee account to access your dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    disabled={loading}
                    autoComplete="current-password"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>Forgot your password? Contact your administrator.</p>
                <p className="mt-2">
                  Not an employee? 
                  <Button variant="link" className="p-0 ml-1" onClick={() => navigate("/auth")}>
                    Sign in here
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}