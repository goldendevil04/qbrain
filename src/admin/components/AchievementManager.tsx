import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Trophy, Calendar, MapPin, Users, Award } from 'lucide-react';
import { useHackathons } from '../../hooks/useFirebaseData';
import { addHackathon, updateHackathon, deleteHackathon } from '../../services/firebaseService';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface AchievementManagerProps {
  onUpdate: () => void;
}

const AchievementManager: React.FC<AchievementManagerProps> = ({ onUpdate }) => {
  const { hackathons, loading, refetch } = useHackathons();
  const [showForm, setShowForm] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    status: 'completed',
    result: '',
    technologies: '',
    teamSize: '',
    prize: '',
    category: 'hackathon',
    highlights: '',
    impact: ''
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      location: '',
      status: 'completed',
      result: '',
      technologies: '',
      teamSize: '',
      prize: '',
      category: 'hackathon',
      highlights: '',
      impact: ''
    });
    setImageFiles([]);
    setImagePreviews([]);
    setEditingAchievement(null);
    setShowForm(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const achievementData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()),
        date: new Date(formData.date),
        highlights: formData.highlights.split('\n').filter(h => h.trim()),
        images: [] // Will be populated after upload
      };

      if (editingAchievement) {
        const result = await updateHackathon(editingAchievement.id, achievementData, imageFiles[0] || undefined);
        if (result.success) {
          toast.success('Achievement updated successfully!');
          resetForm();
          refetch();
          onUpdate();
        } else {
          toast.error('Failed to update achievement');
        }
      } else {
        const result = await addHackathon(achievementData, imageFiles[0] || undefined);
        if (result.success) {
          toast.success('Achievement added successfully!');
          resetForm();
          refetch();
          onUpdate();
        } else {
          toast.error('Failed to add achievement');
        }
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (achievement: any) => {
    setEditingAchievement(achievement);
    setFormData({
      title: achievement.title || '',
      description: achievement.description || '',
      date: achievement.date?.toDate ? format(achievement.date.toDate(), 'yyyy-MM-dd') : '',
      location: achievement.location || '',
      status: achievement.status || 'completed',
      result: achievement.result || '',
      technologies: Array.isArray(achievement.technologies) ? achievement.technologies.join(', ') : '',
      teamSize: achievement.teamSize || '',
      prize: achievement.prize || '',
      category: achievement.category || 'hackathon',
      highlights: Array.isArray(achievement.highlights) ? achievement.highlights.join('\n') : '',
      impact: achievement.impact || ''
    });
    if (achievement.imageUrl) {
      setImagePreviews([achievement.imageUrl]);
    }
    setShowForm(true);
  };

  const handleDelete = async (achievement: any) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      const result = await deleteHackathon(achievement.id, achievement.imageUrl);
      if (result.success) {
        toast.success('Achievement deleted successfully!');
        refetch();
        onUpdate();
      } else {
        toast.error('Failed to delete achievement');
      }
    }
  };

  const categories = [
    { value: 'hackathon', label: 'Hackathon', icon: Trophy },
    { value: 'competition', label: 'Competition', icon: Award },
    { value: 'project', label: 'Project', icon: Users },
    { value: 'recognition', label: 'Recognition', icon: Award }
  ];

  if (loading) {
    return <div className="text-white">Loading achievements...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Achievement Gallery</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800/50 border border-cyan-400/20 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">
              {editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
            </h3>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                rows={3}
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Result/Position</label>
                <input
                  type="text"
                  value={formData.result}
                  onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="1st Place, Winner, etc."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Team Size</label>
                <input
                  type="text"
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="4-6 members"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Prize/Recognition</label>
                <input
                  type="text"
                  value={formData.prize}
                  onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                  placeholder="₹50,000, Certificate, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Technologies Used</label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                placeholder="React, Node.js, AI/ML (comma separated)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Key Highlights</label>
              <textarea
                value={formData.highlights}
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                rows={4}
                placeholder="One highlight per line..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Impact & Significance</label>
              <textarea
                value={formData.impact}
                onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                rows={3}
                placeholder="Describe the impact and significance of this achievement..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Achievement Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
              />
              
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{submitting ? 'Saving...' : 'Save Achievement'}</span>
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hackathons.map((achievement: any) => {
          const categoryInfo = categories.find(cat => cat.value === achievement.category) || categories[0];
          const Icon = categoryInfo.icon;
          
          return (
            <div key={achievement.id} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-green-400/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-600/50 transition-all duration-300">
                
                {achievement.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={achievement.imageUrl}
                      alt={achievement.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        achievement.category === 'hackathon' ? 'bg-cyan-400/20 text-cyan-400' :
                        achievement.category === 'competition' ? 'bg-green-400/20 text-green-400' :
                        achievement.category === 'project' ? 'bg-purple-400/20 text-purple-400' :
                        'bg-yellow-400/20 text-yellow-400'
                      }`}>
                        <Icon className="h-3 w-3 mr-1" />
                        {categoryInfo.label}
                      </span>
                    </div>
                    {achievement.result && (
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 bg-yellow-400/90 text-black rounded-full text-sm font-bold">
                          <Trophy className="h-3 w-3 mr-1" />
                          {achievement.result}
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {achievement.title}
                    </h3>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleEdit(achievement)}
                        className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-lg transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(achievement)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {achievement.description}
                  </p>
                  
                  <div className="space-y-2 text-xs text-gray-500">
                    {achievement.date?.toDate && (
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-2" />
                        {format(achievement.date.toDate(), 'MMM dd, yyyy')}
                      </div>
                    )}
                    {achievement.location && (
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-2" />
                        {achievement.location}
                      </div>
                    )}
                    {achievement.teamSize && (
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-2" />
                        {achievement.teamSize}
                      </div>
                    )}
                  </div>
                  
                  {achievement.technologies && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {achievement.technologies.slice(0, 3).map((tech: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {achievement.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-slate-700/50 text-xs text-cyan-400 rounded">
                          +{achievement.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementManager;