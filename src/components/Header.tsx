import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-cyan-400/20' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="relative">
              <Zap className="h-8 w-8 text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Qbrain
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['About', 'Achievements', 'Team', 'Join', 'Tech', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="relative text-gray-300 hover:text-cyan-400 transition-colors duration-300 group"
              >
                {item}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-green-400 group-hover:w-full transition-all duration-300"></div>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('join')}
              className="relative px-6 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300 transform hover:scale-105"
            >
              Join Team
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-400 opacity-0 hover:opacity-20 rounded-full transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700/50">
            <div className="flex flex-col space-y-3 pt-4">
              {['About', 'Achievements', 'Team', 'Join', 'Tech', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-left"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('join')}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-full transition-all duration-300"
              >
                Join Team
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;