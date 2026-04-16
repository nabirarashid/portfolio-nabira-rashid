import React from 'react';

interface MediaItem {
  title: string;
  category: string;
  note?: string;
}

export const CurrentlyConsuming: React.FC = () => {
  const mediaItems: MediaItem[] = [
    {
      title: 'yc startup podcast',
      category: 'podcast',
    },
    {
      title: 'catgpt',
      category: 'instagram',
      note: '@askcatgpt',
    },
    {
      title: 'northrop frye works',
      category: 'books',
      note: 'had to read one for school but i loved it sm',
    },
    {
      title: 'linkedin doomscrolling',
      category: 'social media',
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="text-center mb-8 w-full">
        <p className="coffee-text font-light mb-6 text-center">ᯓ★ currently consuming</p>
      </div>

      <div className="space-y-3 w-full max-w-xs">
        {mediaItems.map((item, index) => (
          <div key={index} className="py-2 flex gap-3">
            <span className="coffee-text text-sm mt-0.5 flex-shrink-0">•</span>
            <div className="flex-1">
              <p className="coffee-text font-light text-sm">{item.title}</p>
              <p className="coffee-text text-xs font-light opacity-60">{item.category}</p>
              {item.note && (
                <p className="coffee-text text-xs italic opacity-50 mt-0.5">{item.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="coffee-text font-light text-xs text-center mt-6">
        always finding something new to enjoy 📖
      </p>
    </div>
  );
};

export default CurrentlyConsuming;
