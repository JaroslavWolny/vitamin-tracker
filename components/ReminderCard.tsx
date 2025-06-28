
import React from 'react';

interface ReminderCardProps {
  show: boolean;
}

const BellIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);


const ReminderCard: React.FC<ReminderCardProps> = ({ show }) => {
  if (!show) {
    return null;
  }

  return (
    <div 
        className="bg-yellow-50 dark:bg-gray-800 border-l-4 border-yellow-400 dark:border-yellow-500 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg shadow-md"
        role="alert">
      <div className="flex">
        <div className="py-1">
            <BellIcon className="w-6 h-6 text-yellow-500 mr-4"/>
        </div>
        <div>
          <p className="font-bold">Připomínka</p>
          <p className="text-sm">Nezapomeň si dnes vzít své doplňky!</p>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;
