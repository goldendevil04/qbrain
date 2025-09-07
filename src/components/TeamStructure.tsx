import React from 'react';
import { 
  Crown, 
  Cpu, 
  Wifi, 
  Brain, 
  Network, 
  Palette, 
  IndianRupee,
  Users,
  BookOpen,
  TrendingUp
} from 'lucide-react';

const TeamStructure = () => {
  const roles = [
    {
      id: 1,
      title: 'Team Leader (Occupied ✅)',
      icon: Crown,
      description: 'Strategic leadership, mobile/web development, project coordination',
      skills: ['Leadership', 'React/React Native', 'Project Management', 'Full-stack Development'],
      color: 'from-yellow-400 to-orange-400',
      borderColor: 'border-yellow-400/20 hover:border-yellow-400/40'
    },
    {
      id: 2,
      title: 'Hardware & Circuit Designer',
      icon: Cpu,
      description: 'PCB design, embedded systems, hardware prototyping',
      skills: ['PCB Design', 'Electronics', 'CAD Tools', 'Prototyping'],
      color: 'from-cyan-400 to-blue-400',
      borderColor: 'border-cyan-400/20 hover:border-cyan-400/40'
    },
    {
      id: 3,
      title: 'Embedded/IoT Specialist',
      icon: Wifi,
      description: 'IoT solutions, sensor integration, embedded programming',
      skills: ['Arduino/Raspberry Pi', 'IoT Protocols', 'C/C++', 'Sensor Integration'],
      color: 'from-green-400 to-teal-400',
      borderColor: 'border-green-400/20 hover:border-green-400/40'
    },
    {
      id: 4,
      title: 'AI/ML Engineer',
      icon: Brain,
      description: 'Machine learning models, data analysis, AI integration',
      skills: ['Python/TensorFlow', 'Data Science', 'Deep Learning', 'Computer Vision'],
      color: 'from-purple-400 to-pink-400',
      borderColor: 'border-purple-400/20 hover:border-purple-400/40'
    },
    {
      id: 5,
      title: 'Networking/Communication Specialist',
      icon: Network,
      description: 'Network protocols, communication systems, backend development',
      skills: ['Network Protocols', 'API Development', 'Database Design', 'System Architecture'],
      color: 'from-indigo-400 to-cyan-400',
      borderColor: 'border-indigo-400/20 hover:border-indigo-400/40'
    },
    {
      id: 6,
      title: 'UI/UX & Testing Engineer',
      icon: Palette,
      description: 'User interface design, user experience, quality assurance',
      skills: ['UI/UX Design', 'Testing Frameworks', 'Figma/Adobe XD', 'User Research'],
      color: 'from-pink-400 to-rose-400',
      borderColor: 'border-pink-400/20 hover:border-pink-400/40'
    }
  ];

  const benefits = [
    {
      icon: IndianRupee,
      title: '₹500 Monthly Stipend',
      description: 'Competitive financial support for dedicated team members'
    },
    {
      icon: BookOpen,
      title: 'Skill Development',
      description: 'Hands-on experience with cutting-edge technologies'
    },
    {
      icon: Users,
      title: 'Professional Network',
      description: 'Connect with industry professionals and mentors'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Portfolio building and leadership opportunities'
    }
  ];

  return (
    <section id="team" className="py-20 bg-slate-900/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Team Structure
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Join our elite team of 6 specialized roles, each crucial for hackathon success and technical excellence
            </p>
          </div>

          {/* Team Roles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div key={role.id} className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-5 rounded-2xl blur-xl group-hover:opacity-10 group-hover:blur-2xl transition-all duration-300`}></div>
                  <div className={`relative bg-slate-800/50 border ${role.borderColor} rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 h-full`}>
                    <div className="flex items-center mb-4">
                      <div className={`p-3 bg-gradient-to-br ${role.color} rounded-xl mr-3`}>
                        <Icon className="h-6 w-6 text-black" />
                      </div>
                      <div className="text-sm font-semibold text-gray-400">Role #{role.id}</div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                      {role.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {role.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Key Skills
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-slate-700/50 border border-slate-600/30 rounded-md text-xs text-gray-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Benefits Section */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-white mb-8">Why Join Qbrain?</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300 text-center">
                      <Icon className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                      <h4 className="text-lg font-semibold text-white mb-2">{benefit.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Eligibility */}
          <div className="mt-16">
            <div className="relative group max-w-3xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-cyan-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/50 border border-green-400/20 rounded-2xl p-8 backdrop-blur-sm text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Eligibility Requirements</h3>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h4 className="text-lg font-semibold text-green-400 mb-3">Academic Requirements</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>• B.Tech students (all streams welcome)</li>
                      <li>• Strong academic performance</li>
                      <li>• Passion for technology and innovation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-cyan-400 mb-3">Skills & Commitment</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Relevant technical skills for chosen role</li>
                      <li>• Dedication to team goals and projects</li>
                      <li>• Availability for hackathons and competitions</li>
                    </ul>
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

export default TeamStructure;