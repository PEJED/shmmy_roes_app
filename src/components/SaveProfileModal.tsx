import React, { useState, useEffect, useRef } from 'react';

interface SaveProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  defaultName: string;
}

const SaveProfileModal: React.FC<SaveProfileModalProps> = ({ isOpen, onClose, onSave, defaultName }) => {
  const [name, setName] = useState(defaultName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(defaultName);
      setTimeout(() => inputRef.current?.select(), 50);
    }
  }, [isOpen, defaultName]);

  if (!isOpen) return null;

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave(trimmed);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-sm w-full"
        style={{ animation: 'modalIn 0.18s ease' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Icon + Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 bg-blue-100 dark:bg-blue-900/40 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          </div>
          <div>
            <h3 className="font-black text-gray-900 dark:text-gray-100 text-lg leading-tight">Αποθήκευση Προφίλ</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Δώστε όνομα στην επιλογή σας</p>
          </div>
        </div>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="π.χ. Κατεύθυνση Υπολογιστών"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 outline-none transition-colors text-sm font-medium mb-5"
        />

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Ακύρωση
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:text-gray-400 text-white text-sm font-bold transition-colors shadow-sm"
          >
            Αποθήκευση
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity:0; transform: scale(0.92) translateY(8px); }
          to   { opacity:1; transform: scale(1)    translateY(0);   }
        }
      `}</style>
    </div>
  );
};

export default SaveProfileModal;
