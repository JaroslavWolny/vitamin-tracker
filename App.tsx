
import React, { useState, useEffect, useMemo } from 'react';
import type { Supplement } from './types';
import Header from './components/Header';
import SupplementItem from './components/SupplementItem';
import ReminderCard from './components/ReminderCard';
import AddSupplementForm from './components/AddSupplementForm';
import { getTodayDateString } from './utils/dateUtils';

const INITIAL_SUPPLEMENTS: Supplement[] = [
  { id: 'sup_1672531200000', name: 'Vitamíny', lastTakenDate: null },
  { id: 'sup_1672531200001', name: 'Kreatin', lastTakenDate: null },
];

const App: React.FC = () => {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Load data from localStorage on initial render
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('supplementTrackerData');
      const today = getTodayDateString();
      let supplementsToLoad: Supplement[];

      if (storedData) {
        const parsedData: Supplement[] = JSON.parse(storedData);
        // Reset lastTakenDate if it's not today
        supplementsToLoad = parsedData.map(sup => ({
          ...sup,
          lastTakenDate: sup.lastTakenDate === today ? today : null,
        }));
      } else {
        supplementsToLoad = INITIAL_SUPPLEMENTS;
      }
      setSupplements(supplementsToLoad);
    } catch (error) {
      console.error("Failed to load data from localStorage:", error);
      setSupplements(INITIAL_SUPPLEMENTS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save data to localStorage whenever supplements change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('supplementTrackerData', JSON.stringify(supplements));
      } catch (error) {
        console.error("Failed to save data to localStorage:", error);
      }
    }
  }, [supplements, isLoaded]);
  
  // Notification logic
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || isEditing) return;

    const allTaken = supplements.every(sup => sup.lastTakenDate === getTodayDateString());

    if (allTaken || !('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    const now = new Date();
    const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0); // 7 PM

    if (now >= reminderTime) {
      return;
    }

    const timeUntil7PM = reminderTime.getTime() - now.getTime();
    const reminderTimeout = setTimeout(() => {
      // Re-check state at 7 PM
      const currentSupplements = JSON.parse(localStorage.getItem('supplementTrackerData') || '[]');
      const today = getTodayDateString();
      const allTakenNow = currentSupplements.every((s: Supplement) => s.lastTakenDate === today);

      if (!allTakenNow) {
        new Notification('Připomínka', {
          body: 'Nezapomeň si dnes vzít své doplňky!',
          icon: '/vite.svg',
          tag: 'supplement-reminder'
        });
      }
    }, timeUntil7PM);

    return () => clearTimeout(reminderTimeout);
  }, [isLoaded, supplements, isEditing]);


  const handleTakeSupplement = (id: string) => {
    const today = getTodayDateString();
    setSupplements(prevSupplements =>
      prevSupplements.map(sup =>
        sup.id === id ? { ...sup, lastTakenDate: today } : sup
      )
    );
  };
  
  const handleToggleEdit = () => setIsEditing(prev => !prev);

  const handleAddSupplement = (name: string) => {
    if (name.trim() === '') return;
    const newSupplement: Supplement = {
      id: `sup_${Date.now()}`,
      name: name.trim(),
      lastTakenDate: null
    };
    setSupplements(prev => [...prev, newSupplement]);
  };

  const handleUpdateSupplement = (id: string, newName: string) => {
    setSupplements(prev => prev.map(s => s.id === id ? { ...s, name: newName } : s));
  };
  
  const handleDeleteSupplement = (id: string) => {
    setSupplements(prev => prev.filter(s => s.id !== id));
  };

  const allTaken = useMemo(() => {
    if (supplements.length === 0) return true;
    return supplements.every(sup => sup.lastTakenDate === getTodayDateString());
  }, [supplements]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-sans">
      <div className="container mx-auto max-w-md p-4">
        <Header isEditing={isEditing} onToggleEdit={handleToggleEdit} />
        <main className="mt-8 space-y-6">
          {!isLoaded ? (
             <p className="text-center text-gray-500">Načítání dat...</p>
          ) : isEditing ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 px-1">Spravovat seznam</h2>
              {supplements.map(sup => (
                <SupplementItem
                  key={sup.id}
                  supplement={sup}
                  onTake={handleTakeSupplement}
                  isTakenToday={false} // Not relevant in edit mode
                  isEditing={isEditing}
                  onUpdate={handleUpdateSupplement}
                  onDelete={handleDeleteSupplement}
                />
              ))}
              <AddSupplementForm onAdd={handleAddSupplement}/>
            </div>
          ) : (
            <>
              <ReminderCard show={!allTaken && supplements.length > 0} />
              <div className="space-y-4">
                {supplements.length > 0 ? (
                  supplements.map(sup => (
                    <SupplementItem
                      key={sup.id}
                      supplement={sup}
                      onTake={handleTakeSupplement}
                      isTakenToday={sup.lastTakenDate === getTodayDateString()}
                      isEditing={isEditing}
                    />
                  ))
                ) : (
                  <div className="text-center py-10 px-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">Žádné doplňky nebyly přidány.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Klikni na "Upravit" pro přidání nových.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 mt-12 pb-4">
          <p>Vytvořeno pro jednoduché sledování.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
