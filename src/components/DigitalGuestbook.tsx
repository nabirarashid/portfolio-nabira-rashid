import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  rotate: number;
}

export const DigitalGuestbook: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([
    {
      id: '1',
      name: 'Coffee Lover ☕',
      message: 'amazing website! love the cafe vibes',
      timestamp: 'yesterday',
      rotate: -2,
    },
    {
      id: '2',
      name: 'Dev Friend 👨‍💻',
      message: 'the dark mode is so cool!',
      timestamp: '2 days ago',
      rotate: 2,
    },
  ]);

  const [newEntry, setNewEntry] = useState({ name: '', message: '' });

  const handleAddEntry = () => {
    if (newEntry.name.trim() && newEntry.message.trim()) {
      const entry: GuestbookEntry = {
        id: Date.now().toString(),
        name: newEntry.name,
        message: newEntry.message,
        timestamp: 'just now',
        rotate: Math.random() * 4 - 2,
      };
      setEntries([entry, ...entries]);
      setNewEntry({ name: '', message: '' });
    }
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  return (
    <div className="py-20 px-8 coffee-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif font-light coffee-text text-center mb-2 tracking-wide">
          community board
        </h2>
        <p className="text-center coffee-text/60 mb-12 font-light">leave a note for me</p>

        <div className="mb-12 bg-white dark:bg-slate-700 rounded-sm p-6 shadow-sm border border-cafe-espresso/20 dark:border-cafe-cream/20">
          <input
            type="text"
            placeholder="your name..."
            value={newEntry.name}
            onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })}
            className="w-full mb-4 px-4 py-2 border border-cafe-espresso/30 dark:border-cafe-cream/30 rounded-sm bg-cafe-cream dark:bg-slate-800 coffee-text outline-none focus:border-cafe-terracotta dark:focus:border-cafe-matcha font-light"
          />
          <textarea
            placeholder="leave a message..."
            value={newEntry.message}
            onChange={(e) => setNewEntry({ ...newEntry, message: e.target.value })}
            rows={3}
            className="w-full mb-4 px-4 py-2 border border-cafe-espresso/30 dark:border-cafe-cream/30 rounded-sm bg-cafe-cream dark:bg-slate-800 coffee-text outline-none focus:border-cafe-terracotta dark:focus:border-cafe-matcha resize-none font-light"
          />
          <button
            onClick={handleAddEntry}
            className="w-full px-6 py-2 border border-cafe-espresso dark:border-cafe-cream coffee-text hover:bg-cafe-espresso/10 dark:hover:bg-cafe-cream/10 transition-all duration-300 font-light tracking-wide text-sm"
          >
            pin my note
          </button>
        </div>

        {/* Corkboard */}
        <div className="corkboard p-12 rounded-lg min-h-96 relative shadow-2xl border-4 border-orange-700 dark:border-orange-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className="relative group"
                style={{ transform: `rotate(${entry.rotate}deg)` }}
              >
                {/* Pin */}
                <div className={`pin left-1/2 -top-4 -translate-x-1/2`} />

                {/* Sticky Note */}
                <div className="sticky-note-coffee bg-yellow-200 dark:bg-yellow-700 p-4 shadow-lg hover:shadow-xl transition-all">
                  <div className="text-sm font-semibold coffee-text mb-2 flex justify-between items-start">
                    <span>{entry.name}</span>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                      title="Delete note"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="coffee-text text-sm leading-relaxed italic">"{entry.message}"</p>
                  <div className="text-xs coffee-text/50 mt-3 text-right">{entry.timestamp}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative pins */}
          <div className="pin top-8 left-12 opacity-50"></div>
          <div className="pin bottom-12 right-16 opacity-50"></div>
          <div className="pin top-1/3 right-8 opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default DigitalGuestbook;
