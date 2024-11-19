import React from 'react';
import { MessageSquare, Heart, Share2, MoreHorizontal } from 'lucide-react';
import DataCard from './DataCard';

interface SocialFeedProps {
  isDarkMode: boolean;
  activeNetwork: string;
}

const posts = [
  {
    id: 1,
    network: 'instagram',
    author: 'Palombaggia Hotel',
    content: 'Profitez d\'un coucher de soleil magique sur notre plage privée 🌅',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    likes: 245,
    comments: 12,
    shares: 8,
    time: '2h'
  },
  {
    id: 2,
    network: 'facebook',
    author: 'Palombaggia Hotel',
    content: 'Notre nouveau menu d\'été est arrivé ! Venez découvrir les créations de notre Chef 👨‍🍳',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    likes: 189,
    comments: 23,
    shares: 15,
    time: '5h'
  }
];

const SocialFeed: React.FC<SocialFeedProps> = ({ isDarkMode, activeNetwork }) => {
  const filteredPosts = activeNetwork === 'all' 
    ? posts 
    : posts.filter(post => post.network === activeNetwork);

  return (
    <DataCard
      title="Publications récentes"
      isDarkMode={isDarkMode}
    >
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div 
            key={post.id}
            className={`p-4 rounded-lg ${
              isDarkMode 
                ? 'bg-slate-800 hover:bg-slate-700' 
                : 'bg-gray-50 hover:bg-gray-100'
            } transition-colors`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium">{post.author}</h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {post.time}
                </p>
              </div>
              <button className={`p-1 rounded-lg ${
                isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-200'
              }`}>
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <p className="mb-4">{post.content}</p>

            {post.image && (
              <img 
                src={post.image} 
                alt="Post" 
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                <span>{post.shares}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </DataCard>
  );
};

export default SocialFeed;