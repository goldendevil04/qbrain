import React from 'react';
import { Trophy, Calendar, Users, Target, Award, TrendingUp } from 'lucide-react';

const Achievements = () => {
  const milestones = [
    {
      year: '2024',
      title: 'AUAT Techfest Victory',
      description: 'Won first place with AI-powered Smart Helmet',
      status: 'completed'
    },
    {
      year: '2024',
      title: 'Team Formation',
      description: 'Assembled specialized 6-member tech team',
      status: 'completed'
    },
    {
      year: '2025',
      title: 'SIH Qualification',
      description: 'Target: Smart India Hackathon participation',
      status: 'upcoming'
    },
    {
      year: '2025',
      title: 'National Recognition',
      description: 'Goal: Top 10 finish in national competition',
      status: 'upcoming'
    }
  ];

  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Our Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Celebrating our journey of innovation, competition victories, and technical excellence
            </p>
          </div>

          {/* Featured Achievement */}
          <div className="mb-16">
            <div className="relative group max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-yellow-400/30 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <Trophy className="h-16 w-16 text-yellow-400" />
                    <div className="absolute inset-0 bg-yellow-400/30 blur-xl rounded-full"></div>
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    🏆 AUAT Techfest 2024 Winners
                  </h3>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Our flagship achievement - First Place victory with our revolutionary AI-powered Smart Helmet
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-slate-700/50 rounded-xl border border-cyan-400/20">
                    <Award className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                    <div className="text-lg font-semibold text-white">Innovation Award</div>
                    <div className="text-sm text-gray-400">Best Technical Solution</div>
                  </div>
                  
                  <div className="text-center p-4 bg-slate-700/50 rounded-xl border border-green-400/20">
                    <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="text-lg font-semibold text-white">Team Excellence</div>
                    <div className="text-sm text-gray-400">Outstanding Collaboration</div>
                  </div>
                  
                  <div className="text-center p-4 bg-slate-700/50 rounded-xl border border-yellow-400/20">
                    <Target className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-lg font-semibold text-white">Impact Focus</div>
                    <div className="text-sm text-gray-400">Real-world Application</div>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/30">
                  <h4 className="text-xl font-semibold text-white mb-3">Smart Helmet Project Highlights:</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-gray-300">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>AI-powered impact detection and emergency response system</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Real-time health monitoring with IoT connectivity</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Advanced sensor integration for workplace safety</div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <div>Machine learning algorithms for predictive analysis</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-white mb-12">Our Journey Timeline</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-cyan-400 via-green-400 to-cyan-400"></div>
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full border-4 border-slate-900 z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-r ${milestone.status === 'completed' ? 'from-green-400/10 to-cyan-400/10' : 'from-cyan-400/10 to-blue-400/10'} rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                      <div className={`relative bg-slate-800/50 border ${milestone.status === 'completed' ? 'border-green-400/20 hover:border-green-400/40' : 'border-cyan-400/20 hover:border-cyan-400/40'} rounded-xl p-6 backdrop-blur-sm transition-all duration-300`}>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-2xl font-bold ${milestone.status === 'completed' ? 'text-green-400' : 'text-cyan-400'}`}>
                            {milestone.year}
                          </span>
                          {milestone.status === 'completed' ? (
                            <Trophy className="h-5 w-5 text-green-400" />
                          ) : (
                            <TrendingUp className="h-5 w-5 text-cyan-400" />
                          )}
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">{milestone.title}</h4>
                        <p className="text-gray-400 text-sm">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;