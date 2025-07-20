import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Users, Award, Target, TrendingUp, Clock, CheckCircle } from "lucide-react";

const HamaraAcademy = () => {
  const courses = [
    {
      icon: GraduationCap,
      title: "Professional Skills Development",
      description: "Comprehensive training programs to enhance workplace skills",
      duration: "4-6 weeks",
      level: "Beginner to Advanced",
      features: ["Communication Skills", "Leadership Training", "Time Management", "Problem Solving"]
    },
    {
      icon: Target,
      title: "Industry-Specific Training",
      description: "Specialized courses tailored for various industry requirements",
      duration: "2-8 weeks",
      level: "Intermediate",
      features: ["IT Skills", "Manufacturing", "Healthcare", "Retail Operations"]
    },
    {
      icon: TrendingUp,
      title: "Career Advancement Programs",
      description: "Upskilling programs for career growth and promotion readiness",
      duration: "6-12 weeks",
      level: "Advanced",
      features: ["Management Training", "Strategic Thinking", "Digital Skills", "Project Management"]
    },
    {
      icon: Award,
      title: "Certification Courses",
      description: "Industry-recognized certifications to boost your credentials",
      duration: "3-4 months",
      level: "All Levels",
      features: ["PMP Certification", "Digital Marketing", "Data Analytics", "Quality Management"]
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "100% Placement Support",
      description: "Direct placement assistance with our partner companies"
    },
    {
      icon: Users,
      title: "Expert Trainers",
      description: "Learn from industry professionals with real-world experience"
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Online and offline modes with flexible timing options"
    },
    {
      icon: BookOpen,
      title: "Practical Learning",
      description: "Hands-on training with real projects and case studies"
    }
  ];

  return (
    <section id="hamara-academy" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <GraduationCap className="h-5 w-5" />
            <span className="font-semibold">Hamara Academy</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Empowering Careers Through
            <span className="text-primary"> Skill Development</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bridge the skill gap with our comprehensive training programs designed to enhance 
            employability and career growth. From basic skills to advanced certifications, 
            we prepare you for success in today's competitive job market.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {courses.map((course, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/30">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <course.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{course.duration}</Badge>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                </div>
                <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm text-card-foreground">Course Highlights:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {course.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 bg-accent rounded-full flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-card border border-border rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <GraduationCap className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4 text-card-foreground">
              Ready to Transform Your Career?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Join thousands of professionals who have successfully upgraded their skills and 
              advanced their careers through Hamara Academy. Start your learning journey today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Enroll Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HamaraAcademy;