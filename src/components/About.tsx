import React from 'react';
import { Target, Eye, Heart, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'Pushing boundaries with cutting-edge technology solutions',
      color: 'cyan'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Striving for perfection in every project and competition',
      color: 'green'
    },
    {
      icon: Heart,
      title: 'Teamwork',
      description: 'Collaborative spirit driving collective success',
      color: 'cyan'
    },
    {
      icon: Eye,
      title: 'Technical Mastery',
      description: 'Deep expertise across AI, IoT, and emerging technologies',
      color: 'green'
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-900/30 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              About Qbrain
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6"></div>
            <p className="text-xl text-gray-400 leading-relaxed">
              An elite B.Tech student team specializing in AI, IoT, and cutting-edge technology solutions for hackathons and competitions
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Mission */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-green-400/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/50 border border-cyan-400/20 rounded-2xl p-8 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Operating on an annual innovation cycle, we participate in major hackathons and competitions to showcase our technical prowess and build impactful technology solutions that solve real-world problems.
                </p>
                <div className="flex items-center text-cyan-400">
                  <Target className="h-5 w-5 mr-2" />
                  <span className="text-sm font-semibold">Innovation Excellence</span>
                </div>
              </div>
            </div>

            {/* Leadership */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-cyan-400/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/50 border border-green-400/20 rounded-2xl p-8 backdrop-blur-sm hover:border-green-400/40 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4">Team Leadership</h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center text-black font-bold text-lg">
                    N
                  </div>
                  <div className="ml-4">
                    <div className="text-white font-semibold">Nurkausar Alam</div>
                    <div className="text-sm text-gray-400">Team Leader & Founder</div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  B.Tech CSE AI & Robotics, First Year - Driving vision and strategy for technical excellence and competition success.
                </p>
              </div>
            </div>
          </div>

          {/* Vision Statement */}
          <div className="text-center mb-16">
            <div className="relative group max-w-3xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-green-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/50 border border-cyan-400/20 rounded-2xl p-8 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  To become the most recognized student technology team in the region, consistently delivering innovative solutions that win competitions while nurturing the next generation of tech leaders through hands-on experience and mentorship.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              const colorClasses = value.color === 'cyan' 
                ? 'from-cyan-400/20 to-cyan-400/5 border-cyan-400/20 hover:border-cyan-400/40 text-cyan-400'
                : 'from-green-400/20 to-green-400/5 border-green-400/20 hover:border-green-400/40 text-green-400';
              
              return (
                <div key={index} className="relative group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.split(' ').slice(0, 2).join(' ')} rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300`}></div>
                  <div className={`relative bg-slate-800/50 border ${colorClasses.split(' ').slice(2, 4).join(' ')} rounded-xl p-6 backdrop-blur-sm transition-all duration-300 text-center`}>
                    <Icon className={`h-8 w-8 ${colorClasses.split(' ').slice(4).join(' ')} mx-auto mb-3`} />
                    <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;