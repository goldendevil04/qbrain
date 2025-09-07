import React, { useState, useEffect } from 'react';
import { ChevronDown, Trophy, Users, Lightbulb } from 'lucide-react';

const Hero = () => {
  const [stats, setStats] = useState({ projects: 0, hackathons: 0, members: 0 });
  const finalStats = { projects: 15, hackathons: 8, members: 6 };

  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const steps = 50;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setStats({
          projects: Math.floor(finalStats.projects * progress),
          hackathons: Math.floor(finalStats.hackathons * progress),
          members: Math.floor(finalStats.members * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setStats(finalStats);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    };

    const timeout = setTimeout(animateStats, 500);
    return () => clearTimeout(timeout);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-400 rotate-45"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-green-400 rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-cyan-400 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 mb-8 bg-gradient-to-r from-cyan-400/10 to-green-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm">
            <Trophy className="h-4 w-4 text-cyan-400 mr-2" />
            <span className="text-sm font-medium text-cyan-400">AUAT Techfest 2024 Winners</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-400 to-green-400 bg-clip-text text-transparent">
              Qbrain
            </span>
            <br />
            <span className="text-2xl md:text-4xl font-normal text-gray-300">
              Where Innovation Meets Excellence
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Building Tomorrow's Technology Today - Your Gateway to Hackathon Success and Technical Mastery
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => scrollToSection('join')}
              className="relative px-8 py-4 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold rounded-full hover:shadow-xl hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-105 group"
            >
              Join Our Team
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300"></div>
            </button>
            
            <button
              onClick={() => scrollToSection('achievements')}
              className="relative px-8 py-4 border-2 border-cyan-400/50 text-cyan-400 font-semibold rounded-full hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
            >
              View Projects
            </button>
          </div>

          {/* Stats Counter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/50 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300">
                <Lightbulb className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">{stats.projects}+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-cyan-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/50 border border-green-400/20 rounded-2xl p-6 backdrop-blur-sm hover:border-green-400/40 transition-all duration-300">
                <Trophy className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">{stats.hackathons}+</div>
                <div className="text-sm text-gray-400">Hackathons Won</div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/50 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300">
                <Users className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-2">{stats.members}</div>
                <div className="text-sm text-gray-400">Specialized Roles</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => scrollToSection('about')}
            className="text-cyan-400 hover:text-green-400 transition-colors duration-300"
          >
            <ChevronDown className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;