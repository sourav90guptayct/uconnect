import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69593679e76b36d16235e8723d0d60b36&profile_id=164&oauth2_token_id=57447761"
            type="video/mp4"
          />
          {/* Fallback for browsers that don't support video */}
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-8 leading-none tracking-tight">
            <span className="block">UCONNECT</span>
            <span className="block text-accent">TECHNOLOGIES</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Empowering the world with network & technology.
            <br />
            We value communication, connection, and YOU.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-4 h-auto shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/50 bg-white/10 text-white hover:bg-white hover:text-primary text-lg px-8 py-4 h-auto backdrop-blur-sm transition-all duration-300"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Our Story
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-accent mb-2">50+</div>
              <div className="text-lg text-gray-300 uppercase tracking-wide">Clients Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-accent mb-2">2000+</div>
              <div className="text-lg text-gray-300 uppercase tracking-wide">Successful Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-accent mb-2">75,000+</div>
              <div className="text-lg text-gray-300 uppercase tracking-wide">Hours of Excellence</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;