import React, { useState, useEffect } from 'react';
import { ChevronDown, Trophy, Users, Lightbulb, Target, Rocket, Code, Zap, Brain, Shield } from 'lucide-react';

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const missionItems = [
    {
      icon: Brain,
      title: "AI Innovation",
      description: "Developing cutting-edge artificial intelligence solutions"
    },
    {
      icon: Code,
      title: "Technical Excellence",
      description: "Writing clean, scalable, and efficient code"
    },
    {
      icon: Rocket,
      title: "Competition Ready",
      description: "Building winning solutions for hackathons"
    },
    {
      icon: Shield,
      title: "Reliable Solutions",
      description: "Creating robust and secure applications"
    }
  ];

  return (
    <div className="min-h-screen mt-2">
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
        {/* Enhanced Circuit Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-400 rotate-45 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-green-400 rotate-12 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 border border-cyan-400 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/3 w-20 h-20 border border-green-400 rotate-45 animate-pulse delay-1500"></div>
          <div className="absolute bottom-1/3 right-1/4 w-12 h-12 border border-cyan-400 rounded-full animate-pulse delay-700"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-green-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping delay-500"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center text-center max-w-7xl mx-auto">
            
            {/* Badge */}
            <div className="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-cyan-400/10 to-green-400/10 border border-cyan-400/20 rounded-full backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <Trophy className="h-5 w-5 text-cyan-400 mr-3 animate-pulse" />
              <span className="text-sm font-medium text-cyan-400">AUAT Techfest 2025 Winners</span>
            </div>

            {/* Headline */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-4 leading-none">
                <span className="bg-gradient-to-r from-white via-cyan-400 to-green-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block">
                  Qbrain
                </span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-300">
                Where Innovation Meets Excellence
              </h2>
            </div>

            {/* Subheading */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-12 max-w-4xl leading-relaxed">
              Building Tomorrow's Technology Today - Your Gateway to Hackathon Success and Technical Mastery
            </p>

            {/* Mission Section */}
            <div className="w-full max-w-6xl mb-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-400/5 to-green-400/5 border border-cyan-400/10 rounded-full backdrop-blur-sm mb-6">
                  <Target className="h-5 w-5 text-cyan-400 mr-2" />
                  <span className="text-sm font-medium text-cyan-400">Our Mission</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Transforming Ideas into Reality
                </h3>
                <p className="text-gray-400 max-w-3xl mx-auto">
                  We're dedicated to pushing the boundaries of technology through innovative solutions, competitive excellence, and collaborative teamwork.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {missionItems.map((item, index) => {
                  const Icon = item.icon;
                  const isEven = index % 2 === 0;
                  const colorClasses = isEven 
                    ? 'from-cyan-400/10 to-cyan-400/5 border-cyan-400/20 hover:border-cyan-400/40 text-cyan-400'
                    : 'from-green-400/10 to-green-400/5 border-green-400/20 hover:border-green-400/40 text-green-400';
                  
                  return (
                    <div key={index} className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.split(' ').slice(0, 2).join(' ')} rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                      <div className={`relative bg-slate-800/50 border ${colorClasses.split(' ').slice(2, 4).join(' ')} rounded-xl p-6 backdrop-blur-sm transition-all duration-300 text-center group-hover:transform group-hover:scale-105 h-full flex flex-col`}>
                        <Icon className={`h-10 w-10 ${colorClasses.split(' ').slice(4).join(' ')} mx-auto mb-4`} />
                        <h4 className="text-lg font-bold text-white mb-3">{item.title}</h4>
                        <p className="text-sm text-gray-400 leading-relaxed flex-grow">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => scrollToSection('join')}
                className="relative px-12 py-5 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold text-lg rounded-full hover:shadow-2xl hover:shadow-cyan-400/30 transition-all duration-300 transform hover:scale-110 group min-w-52"
              >
                <span className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Join Our Team
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 rounded-full transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => scrollToSection('achievements')}
                className="relative px-12 py-5 border-2 border-cyan-400/50 text-cyan-400 font-semibold text-lg rounded-full hover:bg-cyan-400/15 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm min-w-52 group"
              >
                <span className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  View Projects
                </span>
              </button>
            </div>

            {/* Enhanced Stats Counter */}
            <div className="w-full max-w-5xl">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-white mb-2">Our Achievements</h3>
                <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 to-green-400/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-slate-800/60 border border-cyan-400/30 rounded-3xl p-10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 h-full transform group-hover:scale-105">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="p-4 bg-gradient-to-r from-cyan-400/20 to-green-400/20 rounded-full mb-6">
                        <Lightbulb className="h-12 w-12 text-cyan-400" />
                      </div>
                      <div className="text-5xl font-bold text-white mb-4">{stats.projects}+</div>
                      <div className="text-base text-gray-400 font-medium">Projects Completed</div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/15 to-cyan-400/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-slate-800/60 border border-green-400/30 rounded-3xl p-10 backdrop-blur-sm hover:border-green-400/50 transition-all duration-300 h-full transform group-hover:scale-105">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="p-4 bg-gradient-to-r from-green-400/20 to-cyan-400/20 rounded-full mb-6">
                        <Trophy className="h-12 w-12 text-green-400" />
                      </div>
                      <div className="text-5xl font-bold text-white mb-4">{stats.hackathons}+</div>
                      <div className="text-base text-gray-400 font-medium">Hackathons Won</div>
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 to-green-400/15 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-slate-800/60 border border-cyan-400/30 rounded-3xl p-10 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300 h-full transform group-hover:scale-105">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="p-4 bg-gradient-to-r from-cyan-400/20 to-green-400/20 rounded-full mb-6">
                        <Users className="h-12 w-12 text-cyan-400" />
                      </div>
                      <div className="text-5xl font-bold text-white mb-4">{stats.members}</div>
                      <div className="text-base text-gray-400 font-medium">Specialized Roles</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center animate-bounce">
              <span className="text-xs text-gray-500 mb-2">Discover More</span>
              <button
                onClick={() => scrollToSection('about')}
                className="text-cyan-400 hover:text-green-400 transition-colors duration-300 p-3 rounded-full hover:bg-cyan-400/10"
              >
                <ChevronDown className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;