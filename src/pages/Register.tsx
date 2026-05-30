import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignUpForm from "@/components/registration/SignUpForm";
import SEO from "@/components/SEO";

export default function Register() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect authenticated users to profile page
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  if (user) {
    return null; // Prevent rendering while redirecting
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Create Account | uConnect Technologies" description="Create your uConnect Technologies account." path="/register" noindex />
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Create Your Account</CardTitle>
              <CardDescription>
                Join our platform and start applying for jobs. You can complete your detailed profile after registration.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <SignUpForm />
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}