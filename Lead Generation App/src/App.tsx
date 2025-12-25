import { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoginScreen } from './components/LoginScreen';
import { ManagerView } from './components/ManagerView';
import { TeilnehmerView } from './components/TeilnehmerView';

export type Page = 'dashboard' | 'analyse' | 'leads' | 'nachrichten' | 'inbox' | 'audio' | 'einstellungen' | 'team' | 'performance' | 'schulungen' | 'journal';

export type UserRole = 'manager' | 'teilnehmer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  managerId?: string; // For team members - which manager they belong to
  instagramConnected: boolean;
  tiktokConnected: boolean;
  instagramUsername?: string;
  tiktokUsername?: string;
  stats: {
    neueLeads: number;
    antworten: number;
    offeneNachrichten: number;
    conversionRate: number;
  };
  joinedDate: string;
}

export interface Lead {
  id: string;
  name: string;
  username: string;
  platform: 'instagram' | 'tiktok';
  profileImage: string;
  beschreibung: string;
  relevanz: 'hoch' | 'mittel' | 'gering';
  interessen: string[];
  engagementLevel: number;
  userId: string;
}

export interface BeitrittsAnfrage {
  id: string;
  name: string;
  email: string;
  managerId: string; // Which manager this request is for
  datum: string;
}

export interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  uploadedBy: string;
  uploadedAt: string;
  category: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  trades: {
    asset: string;
    type: 'buy' | 'sell';
    quantity: number;
    entryPrice: number;
    exitPrice?: number;
    result: 'success' | 'failed' | 'pending';
    notes: string;
    profitLoss?: number;
  }[];
  mood: string;
  learnings: string;
  goalsForTomorrow: string;
  totalProfitLoss: number;
}

function AppContent() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
  };

  if (!currentUser) {
    return <LoginScreen onLogin={setCurrentUser} />;
  }

  if (currentUser.role === 'manager') {
    return <ManagerView currentUser={currentUser} onLogout={() => setCurrentUser(null)} onSelectLead={handleSelectLead} selectedLead={selectedLead} />;
  }

  return <TeilnehmerView currentUser={currentUser} onLogout={() => setCurrentUser(null)} onSelectLead={handleSelectLead} selectedLead={selectedLead} />;
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
