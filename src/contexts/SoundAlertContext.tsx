import React, { createContext, useContext, useState, useEffect } from 'react';

interface SoundAlertContextType {
  playAlert: () => void;
  playManualAudio: (audioNumber: string) => void;
  alertMode: 'automatic' | 'manual';
  setAlertMode: (mode: 'automatic' | 'manual') => void;
}

const SoundAlertContext = createContext<SoundAlertContextType | undefined>(undefined);

export function SoundAlertProvider({ children }: { children: React.ReactNode }) {
  const [alertMode, setAlertMode] = useState<'automatic' | 'manual'>(() => {
    return (localStorage.getItem('alert_mode') as 'automatic' | 'manual') || 'automatic';
  });

  useEffect(() => {
    localStorage.setItem('alert_mode', alertMode);
  }, [alertMode]);

  const playAlert = () => {
    try {
      const audio = new Audio('/sounds/alert.mp3');
      audio.play().catch(err => console.log('Erro ao tocar alerta:', err));
    } catch (error) {
      console.log('Erro ao criar áudio:', error);
    }
  };

  const playManualAudio = (audioNumber: string) => {
    try {
      const audio = new Audio(`/sounds/audio${audioNumber}.mp3`);
      audio.play().catch(err => console.log('Erro ao tocar áudio manual:', err));
    } catch (error) {
      console.log('Erro ao criar áudio manual:', error);
    }
  };

  return (
    <SoundAlertContext.Provider value={{ playAlert, playManualAudio, alertMode, setAlertMode }}>
      {children}
    </SoundAlertContext.Provider>
  );
}

export function useSoundAlert() {
  const context = useContext(SoundAlertContext);
  if (context === undefined) {
    throw new Error('useSoundAlert must be used within a SoundAlertProvider');
  }
  return context;
}
