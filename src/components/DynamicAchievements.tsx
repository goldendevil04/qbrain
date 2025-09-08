import React from 'react';
import { Trophy, Calendar, Users, Target, Award, TrendingUp, MapPin, Star, Zap } from 'lucide-react';
import { useHackathons } from '../hooks/useFirebaseData';
import { format } from 'date-fns';

const DynamicAchievements = () => {
  const { hackathons, loading } = useHackathons();

  const staticMilestones = [
    {
      year: '2025',
      title: 'Team Formation',
      description: 'Assembling specialized tech team',
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

  if (loading) {
    return (
      <section id="achievements" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading achievements...</p>
          </div>
        </div>
      </section>
    );
  }

  const completedHackathons = hackathons.filter((h: any) => h.status === 'completed');
  const featuredHackathon = completedHackathons.find((h: any) => h.result?.toLowerCase().includes('first') || h.result?.toLowerCase().includes('winner')) || completedHackathons[0];

  const categories = [
    { value: 'hackathon', label: 'Hackathon', icon: Trophy, color: 'cyan' },
    { value: 'competition', label: 'Competition', icon: Award, color: 'green' },
    { value: 'project', label: 'Project', icon: Users, color: 'purple' },
    { value: 'recognition', label: 'Recognition', icon: Star, color: 'yellow' }
  ];
  return (
    <section id="achievements" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                Our Achievements
              </h2>
              <div className="absolute -top-3 -right-3">
                <Zap className="h-8 w-8 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Celebrating our journey of innovation, competition victories, and technical excellence with visual proof of our success
            </p>
          </div>

          {/* Featured Achievement */}
          {featuredHackathon && (
            <div className="mb-16">
              <div className="relative group max-w-4xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-2 border-yellow-400/40 rounded-3xl overflow-hidden backdrop-blur-sm">
                  {featuredHackathon.imageUrl && (
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <img
                        src={featuredHackathon.imageUrl}
                        alt={featuredHackathon.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Trophy className="h-8 w-8 text-yellow-400" />
                            <span className="text-yellow-400 font-bold text-lg">Featured Achievement</span>
                          </div>
                          {featuredHackathon.result && (
                            <span className="px-4 py-2 bg-yellow-400 text-black font-bold rounded-full">
                              {featuredHackathon.result}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-8 md:p-12">
                    <div className="text-center mb-8">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {featuredHackathon.title}
                      </h3>
                      <p className="text-xl text-gray-300 leading-relaxed mb-6">
                        {featuredHackathon.description}
                      </p>
                      
                      <div className="flex flex-wrap justify-center gap-4 text-sm">
                        {featuredHackathon.date?.toDate && (
                          <div className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 rounded-full">
                            <Calendar className="h-4 w-4 text-cyan-400" />
                            <span className="text-gray-300">{format(featuredHackathon.date.toDate(), 'MMMM yyyy')}</span>
                          </div>
                        )}
                        {featuredHackathon.location && (
                          <div className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 rounded-full">
                            <MapPin className="h-4 w-4 text-green-400" />
                            <span className="text-gray-300">{featuredHackathon.location}</span>
                          </div>
                        )}
                        {featuredHackathon.teamSize && (
                          <div className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 rounded-full">
                            <Users className="h-4 w-4 text-purple-400" />
                            <span className="text-gray-300">{featuredHackathon.teamSize}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {featuredHackathon.technologies && (
                      <div className="flex flex-wrap justify-center gap-3 mb-8">
                        {featuredHackathon.technologies.map((tech: string, index: number) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-cyan-400/20 to-green-400/20 border border-cyan-400/30 rounded-full text-sm text-white font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {featuredHackathon.highlights && Array.isArray(featuredHackathon.highlights) && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {featuredHackathon.highlights.map((highlight: string, index: number) => (
                          <div key={index} className="flex items-start space-x-3 p-4 bg-slate-700/30 rounded-lg">
                            <Star className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {featuredHackathon.impact && (
                      <div className="mt-8 p-6 bg-gradient-to-r from-cyan-400/10 to-green-400/10 border border-cyan-400/20 rounded-xl">
                        <h4 className="text-lg font-bold text-white mb-3">Impact & Significance</h4>
                        <p className="text-gray-300 leading-relaxed">{featuredHackathon.impact}</p>
                      </div>
                    )}
                    </div>
                </div>
              </div>
            </div>
          )}

          {/* All Hackathons Grid */}
          {hackathons.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                  <Award className="h-8 w-8 text-cyan-400" />
                  Achievement Gallery
                  <Award className="h-8 w-8 text-green-400" />
                </h3>
                <p className="text-gray-400 text-lg">Our complete track record of success and innovation</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hackathons.map((hackathon: any) => (
                  <div key={hackathon.id} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300">
                      {hackathon.imageUrl && (
                        <img
                          src={hackathon.imageUrl}
                          alt={hackathon.title}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                      )}
                      
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-white">{hackathon.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          hackathon.status === 'completed' ? 'bg-green-400/20 text-green-400' :
                          hackathon.status === 'ongoing' ? 'bg-yellow-400/20 text-yellow-400' :
                          'bg-blue-400/20 text-blue-400'
                        }`}>
                          {hackathon.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <Calendar className="h-4 w-4 mr-1" />
                        {hackathon.date?.toDate ? format(hackathon.date.toDate(), 'MMM yyyy') : 'TBD'}
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3">{hackathon.description}</p>
                      
                      {hackathon.result && (
                        <div className="text-green-400 text-sm font-medium mb-3">
                          🏆 {hackathon.result}
                        </div>
                      )}
                      
                      {hackathon.technologies && (
                        <div className="flex flex-wrap gap-1">
                          {hackathon.technologies.slice(0, 3).map((tech: string, index: number) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {hackathon.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded">
                              +{hackathon.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-center text-white mb-12">Our Journey Timeline</h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-cyan-400 via-green-400 to-cyan-400"></div>
              
              {/* Dynamic hackathon milestones */}
              {completedHackathons.map((hackathon: any, index: number) => (
                <div key={hackathon.id} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full border-4 border-slate-900 z-10"></div>
                  
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-cyan-400/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-slate-800/50 border border-green-400/20 hover:border-green-400/40 rounded-xl p-6 backdrop-blur-sm transition-all duration-300">
                  const categoryInfo = categories.find(cat => cat.value === hackathon.category) || categories[0];
                  const CategoryIcon = categoryInfo.icon;
                  
                        <div className="flex items-center justify-between mb-3">
                    <div key={hackathon.id} className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 to-green-400/15 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                      <div className="relative bg-slate-800/60 border-2 border-slate-700/50 rounded-2xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500 hover:transform hover:scale-105">
                          <Trophy className="h-5 w-5 text-green-400" />
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={hackathon.imageUrl}
                              alt={hackathon.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute top-4 left-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                categoryInfo.color === 'cyan' ? 'bg-cyan-400/90 text-black' :
                                categoryInfo.color === 'green' ? 'bg-green-400/90 text-black' :
                                categoryInfo.color === 'purple' ? 'bg-purple-400/90 text-black' :
                                'bg-yellow-400/90 text-black'
                              }`}>
                                <CategoryIcon className="h-3 w-3 mr-1" />
                                {categoryInfo.label}
                              </span>
                            </div>
                            {hackathon.result && (
                              <div className="absolute bottom-4 left-4">
                                <span className="inline-flex items-center px-3 py-1 bg-yellow-400/90 text-black rounded-full text-sm font-bold">
                                  <Trophy className="h-3 w-3 mr-1" />
                                  {hackathon.result}
                                </span>
                              </div>
                            )}
                          
                          <div className="space-y-2 text-xs text-gray-500 mb-4">
                            {hackathon.date?.toDate && (
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-2" />
                                {format(hackathon.date.toDate(), 'MMM dd, yyyy')}
                              </div>
                          <h4 className="text-lg font-semibold text-white mb-2">{milestone.title}</h4>
                            {hackathon.location && (
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-2" />
                                {hackathon.location}
                              </div>
                            )}
                            {hackathon.teamSize && (
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-2" />
                                {hackathon.teamSize}
                              </div>
                            )}
                          <p className="text-gray-400 text-sm">{milestone.description}</p>
                          
                          {hackathon.technologies && (
                            <div className="flex flex-wrap gap-2">
                              {hackathon.technologies.slice(0, 3).map((tech: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-slate-700/60 border border-slate-600/40 text-xs text-gray-200 rounded-md font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                              {hackathon.technologies.length > 3 && (
                                <span className="px-2 py-1 bg-cyan-400/20 text-cyan-400 text-xs rounded-md font-bold">
                                  +{hackathon.technologies.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicAchievements;