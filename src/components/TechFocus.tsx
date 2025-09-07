import React from 'react';
import { 
  Brain, 
  Wifi, 
  Smartphone, 
  Cpu, 
  BarChart3, 
  Code,
  Lightbulb,
  Zap,
  Target,
  Layers
} from 'lucide-react';

const TechFocus = () => {
  const techAreas = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Smart solutions powered by artificial intelligence',
      features: ['Predictive Analytics', 'Computer Vision', 'Natural Language Processing', 'Deep Learning Models'],
      color: 'from-purple-400 to-pink-400',
      borderColor: 'border-purple-400/20 hover:border-purple-400/40',
      projects: 'Smart Helmet AI System, Predictive Maintenance'
    },
    {
      icon: Wifi,
      title: 'IoT & Embedded Systems',
      description: 'Connected devices and intelligent automation',
      features: ['Sensor Networks', 'Real-time Monitoring', 'Edge Computing', 'Device Integration'],
      color: 'from-green-400 to-teal-400',
      borderColor: 'border-green-400/20 hover:border-green-400/40',
      projects: 'Smart Home Automation, Industrial IoT Solutions'
    },
    {
      icon: Smartphone,
      title: 'Mobile & Web Development',
      description: 'Cross-platform applications and responsive web solutions',
      features: ['React Native', 'Progressive Web Apps', 'Cloud Integration', 'Modern UI/UX'],
      color: 'from-cyan-400 to-blue-400',
      borderColor: 'border-cyan-400/20 hover:border-cyan-400/40',
      projects: 'Team Management App, Competition Tracker'
    },
    {
      icon: Cpu,
      title: 'Hardware Integration',
      description: 'Circuit design, prototyping, and system optimization',
      features: ['PCB Design', 'Microcontroller Programming', '3D Prototyping', 'Hardware Testing'],
      color: 'from-orange-400 to-red-400',
      borderColor: 'border-orange-400/20 hover:border-orange-400/40',
      projects: 'Custom Circuit Boards, Sensor Modules'
    },
    {
      icon: BarChart3,
      title: 'Data Science & Analytics',
      description: 'Data-driven insights and intelligent visualization',
      features: ['Statistical Analysis', 'Data Visualization', 'Big Data Processing', 'Performance Metrics'],
      color: 'from-indigo-400 to-purple-400',
      borderColor: 'border-indigo-400/20 hover:border-indigo-400/40',
      projects: 'Hackathon Analytics, Team Performance Dashboard'
    },
    {
      icon: Code,
      title: 'System Architecture',
      description: 'Scalable backend solutions and cloud infrastructure',
      features: ['Microservices', 'API Development', 'Cloud Deployment', 'Database Design'],
      color: 'from-yellow-400 to-orange-400',
      borderColor: 'border-yellow-400/20 hover:border-yellow-400/40',
      projects: 'Competition Platform, Team Collaboration System'
    }
  ];

  const innovations = [
    {
      icon: Lightbulb,
      title: 'Innovation-First Approach',
      description: 'Every project starts with a unique problem-solving perspective'
    },
    {
      icon: Zap,
      title: 'Rapid Prototyping',
      description: 'Quick iteration cycles to validate ideas and improve solutions'
    },
    {
      icon: Target,
      title: 'Competition-Ready',
      description: 'Solutions designed to win hackathons and impress judges'
    },
    {
      icon: Layers,
      title: 'Full-Stack Expertise',
      description: 'End-to-end development from hardware to cloud deployment'
    }
  ];

  return (
    <section id="tech" className="py-20 bg-slate-900/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Technology Focus Areas
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              We specialize in cutting-edge technologies that drive innovation and create competitive advantages in hackathons
            </p>
          </div>

          {/* Tech Areas Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {techAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div key={index} className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-5 rounded-2xl blur-xl group-hover:opacity-10 group-hover:blur-2xl transition-all duration-300`}></div>
                  <div className={`relative bg-slate-800/50 border ${area.borderColor} rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 h-full`}>
                    <div className="flex items-start space-x-4 mb-6">
                      <div className={`p-3 bg-gradient-to-br ${area.color} rounded-xl`}>
                        <Icon className="h-6 w-6 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{area.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{area.description}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Key Capabilities</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {area.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-slate-700/50 pt-4">
                      <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">Recent Projects</h4>
                      <p className="text-sm text-gray-400">{area.projects}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Innovation Highlights */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-white mb-8">Our Innovation Edge</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {innovations.map((innovation, index) => {
                const Icon = innovation.icon;
                return (
                  <div key={index} className="relative group text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300">
                      <Icon className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                      <h4 className="text-lg font-semibold text-white mb-2">{innovation.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{innovation.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tech Stack */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-cyan-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/50 border border-purple-400/20 rounded-2xl p-8 backdrop-blur-sm text-center">
                <h3 className="text-2xl font-bold text-white mb-6">Our Technology Stack</h3>
                
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <h4 className="text-cyan-400 font-semibold mb-3">Frontend</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>React / React Native</div>
                      <div>TypeScript</div>
                      <div>Tailwind CSS</div>
                      <div>Next.js</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-green-400 font-semibold mb-3">Backend</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>Node.js / Python</div>
                      <div>Express / FastAPI</div>
                      <div>PostgreSQL / MongoDB</div>
                      <div>Redis</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-purple-400 font-semibold mb-3">AI/ML</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>TensorFlow / PyTorch</div>
                      <div>OpenCV</div>
                      <div>Scikit-learn</div>
                      <div>Pandas / NumPy</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-yellow-400 font-semibold mb-3">Hardware</h4>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div>Arduino / Raspberry Pi</div>
                      <div>ESP32 / ESP8266</div>
                      <div>KiCad / Eagle</div>
                      <div>3D Printing</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechFocus;