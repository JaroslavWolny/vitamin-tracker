
import React from 'react';
import { getFriendlyDate } from '../utils/dateUtils';

interface HeaderProps {
    isEditing: boolean;
    onToggleEdit: () => void;
}

const Header: React.FC<HeaderProps> = ({ isEditing, onToggleEdit }) => {
  const todayFriendly = getFriendlyDate();

  return (
    <header className="pt-8 text-center">
        <div className="relative">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white tracking-tight">
              {isEditing ? 'Správa doplňků' : 'Denní přehled'}
            </h1>
            <button
                onClick={onToggleEdit}
                className="absolute top-1/2 -translate-y-1/2 right-0 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-gray-800"
                aria-label={isEditing ? 'Dokončit úpravy' : 'Upravit seznam'}
            >
                {isEditing ? 'Hotovo' : 'Upravit'}
            </button>
        </div>
      
        {!isEditing && (
            <p className="text-lg text-indigo-500 dark:text-indigo-400 font-medium mt-2">
                {todayFriendly}
            </p>
        )}
    </header>
  );
};

export default Header;
