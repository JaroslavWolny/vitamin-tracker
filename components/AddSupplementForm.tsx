
import React, { useState } from 'react';

interface AddSupplementFormProps {
    onAdd: (name: string) => void;
}

const AddSupplementForm: React.FC<AddSupplementFormProps> = ({ onAdd }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onAdd(name.trim());
            setName('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Název nového doplňku..."
                className="flex-grow bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 text-lg font-semibold text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Název nového doplňku"
            />
            <button
                type="submit"
                className="px-5 py-2.5 rounded-xl font-bold text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors disabled:opacity-50"
                disabled={!name.trim()}
                aria-label="Přidat nový doplněk"
            >
                Přidat
            </button>
        </form>
    );
};

export default AddSupplementForm;
