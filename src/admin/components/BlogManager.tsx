import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter, Save, X } from 'lucide-react';
import { getBlogPosts, deleteBlogPost } from '../../services/blogService';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import BlogEditor from './BlogEditor';

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const result = await getBlogPosts();
    if (result.success) {
      setPosts(result.data);
    }
    setLoading(false);
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleDelete = async (post: any) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const result = await deleteBlogPost(post.id, post.featuredImage);
      if (result.success) {
        toast.success('Blog post deleted successfully!');
        fetchPosts();
      } else {
        toast.error('Failed to delete blog post');
      }
    }
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setEditingPost(null);
    fetchPosts();
  };

  const filteredPosts = posts.filter((post: any) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (showEditor) {
    return (
      <BlogEditor
        post={editingPost}
        onClose={handleEditorClose}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Blog Management</h2>
        <button
          onClick={() => setShowEditor(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
        >
          <Plus className="h-4 w-4" />
          <span>New Post</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:outline-none"
          >
            <option value="all">All Posts</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin h-8 w-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading posts...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No blog posts found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post: any) => (
            <div key={post.id} className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-slate-600/50 transition-all duration-300">
              {post.featuredImage && (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'published' 
                      ? 'bg-green-400/20 text-green-400' 
                      : 'bg-yellow-400/20 text-yellow-400'
                  }`}>
                    {post.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {post.readTime} min read
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>By {post.author}</span>
                  <span>
                    {post.createdAt?.toDate ? 
                      format(post.createdAt.toDate(), 'MMM dd, yyyy') : 
                      'Unknown'
                    }
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-cyan-400/20 text-cyan-400 rounded-lg hover:bg-cyan-400/30 transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  
                  <button
                    onClick={() => handleDelete(post)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-400/20 text-red-400 rounded-lg hover:bg-red-400/30 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManager;