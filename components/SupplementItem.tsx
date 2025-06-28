
import React from 'react';
import type { Supplement } from '../types';

interface SupplementItemProps {
  supplement: Supplement;
  onTake: (id: string) => void;
  isTakenToday: boolean;
  isEditing: boolean;
  onUpdate?: (id: string, newName: string) => void;
  onDelete?: (id: string) => void;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

const PillIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
      <path d="M8.25 4.5l7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);


const SupplementItem: React.FC<SupplementItemProps> = ({ supplement, onTake, isTakenToday, isEditing, onUpdate, onDelete }) => {
  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 flex items-center gap-4 transition-all duration-300 ease-in-out">
        <input
          type="text"
          value={supplement.name}
          onChange={(e) => onUpdate?.(supplement.id, e.target.value)}
          className="flex-grow bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 text-lg font-semibold text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label={`Název doplňku ${supplement.name}`}
        />
        <button
          onClick={() => onDelete?.(supplement.id)}
          className="flex-shrink-0 p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900 dark:hover:text-red-400 transition-colors"
          aria-label={`Smazat ${supplement.name}`}
        >
          <TrashIcon className="w-6 h-6"/>
        </button>
      </div>
    )
  }

  return (
    <div className={`
        bg-white dark:bg-gray-800 
        rounded-2xl shadow-lg 
        p-4 flex items-center justify-between 
        transition-all duration-300 ease-in-out
        ${isTakenToday ? 'opacity-70' : 'opacity-100'}`}>

        <div className="flex items-center">
            <div className={`
                flex items-center justify-center 
                w-12 h-12 rounded-full mr-4
                transition-colors duration-300
                ${isTakenToday ? 'bg-green-100 dark:bg-green-900' : 'bg-indigo-100 dark:bg-indigo-900'}`}>
                {isTakenToday 
                    ? <CheckIcon className="w-6 h-6 text-green-500 dark:text-green-400" /> 
                    : <PillIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                }
            </div>
            <span className={`
                font-semibold text-lg 
                transition-colors duration-300
                ${isTakenToday ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-200'}`}>
                {supplement.name}
            </span>
        </div>
      
        <button
            onClick={() => onTake(supplement.id)}
            disabled={isTakenToday}
            className={`
                px-5 py-2.5 rounded-xl 
                font-bold text-white 
                transition-all duration-300 ease-in-out
                transform active:scale-95
                focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900
                disabled:cursor-not-allowed
                ${isTakenToday
                    ? 'bg-green-500 dark:bg-green-600 focus:ring-green-500'
                    : 'bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:ring-indigo-500'
                }`}
        >
            {isTakenToday ? 'Užito' : 'Vzít'}
        </button>
    </div>
  );
};

export default SupplementItem;
