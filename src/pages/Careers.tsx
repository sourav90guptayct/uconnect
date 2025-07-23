import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Users, Award, Heart, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const CareersPage = () => {
  const jobOpenings = [
    {
      title: "Network Engineer",
      department: "Networks",
      location: "Remote / On-site",
      type: "Full-time",
      description: "Join our network team to design, implement, and maintain cutting-edge network infrastructure solutions.",
      requirements: ["Bachelor's degree in Network Engineering or related field", "3+ years of network administration experience", "CCNA/CCNP certification preferred", "Experience with network monitoring tools"]
    },
    {
      title: "Digital Transformation Specialist",
      department: "Digital Transformation",
      location: "Hybrid",
      type: "Full-time",
      description: "Lead digital transformation initiatives and help organizations modernize their IT infrastructure and processes.",
      requirements: ["5+ years in digital transformation projects", "Experience with cloud platforms (AWS, Azure, GCP)", "Strong project management skills", "Knowledge of enterprise architecture"]
    },
    {
      title: "Resource Management Coordinator",
      department: "Resource Management",
      location: "Remote",
      type: "Full-time",
      description: "Manage technology staffing and resource allocation to optimize workforce efficiency and project delivery.",
      requirements: ["3+ years in resource management or HR", "Experience with workforce optimization tools", "Strong communication skills", "Understanding of technology roles and skills"]
    },
    {
      title: "Infrastructure Installation Technician",
      department: "Infra Installation",
      location: "Field Work",
      type: "Full-time",
      description: "Install and maintain telecommunications infrastructure including towers, poles, and support systems.",
      requirements: ["Technical certification in telecommunications", "Experience with tower installation and maintenance", "Physical fitness for field work", "Safety certification required"]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, dental, and wellness programs"
    },
    {
      icon: Zap,
      title: "Professional Growth",
      description: "Continuous learning opportunities and career advancement paths"
    },
    {
      icon: Users,
      title: "Team Culture",
      description: "Collaborative work environment with supportive team members"
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Performance-based bonuses and recognition programs"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground">
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-primary-foreground/90 max-w-3xl">
            Be part of uConnect Technologies and help shape the future of technology solutions. 
            We're looking for passionate individuals who want to make a difference.
          </p>
        </div>
      </div>

      {/* Hero Image Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=6000&q=80"
              alt="Team collaboration"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              Why Choose uConnect Technologies?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer more than just a job - we provide a platform for growth, innovation, and meaningful impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              Current Openings
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore exciting career opportunities across our different service areas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                      <Badge variant="secondary" className="mb-2">{job.department}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {job.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{job.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="space-y-1">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full flex-shrink-0 mt-2" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link to="/?section=contact">
                    <Button className="w-full">
                      Apply Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4 text-card-foreground">
                Don't See the Perfect Role?
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                We're always looking for talented individuals to join our team. 
                Send us your resume and let us know how you'd like to contribute.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/?section=contact">
                  <Button size="lg">
                    Send Your Resume
                  </Button>
                </Link>
                <Link to="/?section=contact">
                  <Button variant="outline" size="lg">
                    Contact HR
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;