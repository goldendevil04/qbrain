import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { 
  Users, 
  Trophy, 
  Mail, 
  UserPlus, 
  Calendar,
  MessageSquare,
  LogOut,
  BarChart3,
  FileText,
  Palette,
  Award
} from 'lucide-react';
import toast from 'react-hot-toast';
import TeamMemberManager from './components/TeamMemberManager';
import HackathonManager from './components/HackathonManager';
import ApplicationManager from './components/ApplicationManager';
import ContactManager from './components/ContactManager';
import BlogManager from './components/BlogManager';
import ThemeCustomizer from './components/ThemeCustomizer';
import AchievementManager from './components/AchievementManager';
import { getApplications, getContactMessages, getTeamMembers, getHackathons } from '../services/firebaseService';
import { getBlogPosts } from '../services/blogService';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    teamMembers: 0,
    hackathons: 0,
    applications: 0,
    messages: 0,
    blogPosts: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [membersResult, hackathonsResult, applicationsResult, messagesResult, blogResult] = await Promise.all([
        getTeamMembers(),
        getHackathons(),
        getApplications(),
        getContactMessages(),
        getBlogPosts()
      ]);

      setStats({
        teamMembers: membersResult.success ? membersResult.data.length : 0,
        hackathons: hackathonsResult.success ? hackathonsResult.data.length : 0,
        applications: applicationsResult.success ? applicationsResult.data.length : 0,
        messages: messagesResult.success ? messagesResult.data.length : 0,
        blogPosts: blogResult.success ? blogResult.data.length : 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'applications', label: 'Applications', icon: UserPlus },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'blog', label: 'Blog', icon: FileText },
    { id: 'theme', label: 'Theme', icon: Palette }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-cyan-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.teamMembers}</div>
                    <div className="text-sm text-gray-400">Team Members</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-yellow-400/20 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-yellow-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.hackathons}</div>
                    <div className="text-sm text-gray-400">Achievements</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-purple-400/20 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <UserPlus className="h-8 w-8 text-purple-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.applications}</div>
                    <div className="text-sm text-gray-400">Applications</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-green-400/20 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="h-8 w-8 text-green-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.messages}</div>
                    <div className="text-sm text-gray-400">Messages</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 border border-blue-400/20 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-400" />
                  <div>
                    <div className="text-2xl font-bold text-white">{stats.blogPosts}</div>
                    <div className="text-sm text-gray-400">Blog Posts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'team':
        return <TeamMemberManager onUpdate={fetchStats} />;
      case 'achievements':
        return <AchievementManager onUpdate={fetchStats} />;
      case 'applications':
        return <ApplicationManager />;
      case 'messages':
        return <ContactManager />;
      case 'blog':
        return <BlogManager />;
      case 'theme':
        return <ThemeCustomizer />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black overflow-x-hidden">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800/50 border-r border-slate-700/50 min-h-screen fixed lg:relative z-30">
          <div className="p-6">
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Qbrain Admin
            </h1>
          </div>
          
          <nav className="px-4 space-y-2 pb-20">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-400/20 to-green-400/20 border border-cyan-400/30 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
          
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all duration-300"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 ml-64 p-4 lg:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;