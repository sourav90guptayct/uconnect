import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, MapPin, Clock, Building, Users, Search, Filter, TrendingUp, Star } from "lucide-react";

const HamaraJobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const jobCategories = [
    { name: "Information Technology", count: 450, growth: "+15%" },
    { name: "Manufacturing", count: 320, growth: "+8%" },
    { name: "Healthcare", count: 280, growth: "+12%" },
    { name: "Retail & E-commerce", count: 200, growth: "+20%" },
    { name: "Banking & Finance", count: 180, growth: "+6%" },
    { name: "Education", count: 150, growth: "+10%" }
  ];

  const featuredJobs = [
    {
      title: "Software Developer",
      company: "TechCorp Solutions",
      location: "Bangalore, Karnataka",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹6-10 LPA",
      skills: ["Java", "Spring Boot", "React", "MySQL"],
      posted: "2 days ago"
    },
    {
      title: "Manufacturing Supervisor",
      company: "Industrial Systems Ltd",
      location: "Chennai, Tamil Nadu",
      type: "Full-time",
      experience: "3-6 years",
      salary: "₹4-7 LPA",
      skills: ["Quality Control", "Lean Manufacturing", "Team Leadership"],
      posted: "1 day ago"
    },
    {
      title: "Registered Nurse",
      company: "Apollo Health Group",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      experience: "1-3 years",
      salary: "₹3-5 LPA",
      skills: ["Patient Care", "Medical Equipment", "Documentation"],
      posted: "3 days ago"
    },
    {
      title: "Sales Executive",
      company: "RetailMax India",
      location: "Delhi, NCR",
      type: "Full-time",
      experience: "1-2 years",
      salary: "₹3-6 LPA",
      skills: ["Customer Relations", "Sales Strategy", "CRM"],
      posted: "1 day ago"
    }
  ];

  const stats = [
    { label: "Active Jobs", value: "2000+", icon: Briefcase },
    { label: "Companies", value: "500+", icon: Building },
    { label: "Job Seekers", value: "10K+", icon: Users },
    { label: "Success Rate", value: "95%", icon: Star }
  ];

  return (
    <section id="hamara-jobs" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Briefcase className="h-5 w-5" />
            <span className="font-semibold">Hamara Jobs</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Your Gateway to
            <span className="text-primary"> Dream Careers</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover thousands of job opportunities across various industries. Whether you're a 
            fresh graduate or an experienced professional, find the perfect role that matches 
            your skills and aspirations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search Section */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-card-foreground">
            Find Your Perfect Job
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Job title, skills, or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bangalore">Bangalore</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="delhi">Delhi NCR</SelectItem>
                <SelectItem value="chennai">Chennai</SelectItem>
                <SelectItem value="hyderabad">Hyderabad</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
              </SelectContent>
            </Select>
            <Button size="lg" className="w-full">
              Search Jobs
            </Button>
          </div>
        </div>

        {/* Job Categories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
            Browse by Category
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h4>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {category.growth}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-sm">{category.count} jobs available</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Jobs */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-foreground">Featured Jobs</h3>
            <Button variant="outline">View All Jobs</Button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredJobs.map((job, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-card-foreground hover:text-primary transition-colors cursor-pointer">
                        {job.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Building className="h-4 w-4" />
                        {job.company}
                      </CardDescription>
                    </div>
                    <Badge variant={job.type === "Full-time" ? "default" : "secondary"}>
                      {job.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.posted}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Experience: {job.experience}</span>
                      <span className="font-semibold text-foreground">{job.salary}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button size="sm" className="w-full mt-4">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <Briefcase className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4 text-card-foreground">
              Ready to Take the Next Step?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Join our platform and get access to exclusive job opportunities. Upload your resume 
              today and let employers find you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Upload Resume
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Post a Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HamaraJobs;