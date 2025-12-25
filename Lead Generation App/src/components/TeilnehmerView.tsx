import { useState } from 'react';
import { Navigation } from './Navigation';
import { Dashboard } from './Dashboard';
import { Schulungsvideos } from './Schulungsvideos';
import { ZielgruppenAnalyse } from './ZielgruppenAnalyse';
import { LeadManager } from './LeadManager';
import { NachrichtenGenerator } from './NachrichtenGenerator';
import { Inbox } from './Inbox';
import { TradingJournal } from './TradingJournal';
import { AudioGenerator } from './AudioGenerator';
import { Einstellungen } from './Einstellungen';
import type { Page, User, Lead } from '../App';

interface TeilnehmerViewProps {
  currentUser: User;
  onLogout: () => void;
  onSelectLead: (lead: Lead) => void;
  selectedLead: Lead | null;
}

export function TeilnehmerView({ currentUser, onLogout, onSelectLead, selectedLead }: TeilnehmerViewProps) {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} currentUser={currentUser} />;
      case 'schulungen':
        return <Schulungsvideos currentUser={currentUser} />;
      case 'analyse':
        return <ZielgruppenAnalyse onNavigate={setCurrentPage} />;
      case 'leads':
        return <LeadManager onSelectLead={onSelectLead} currentUserId={currentUser.id} isManager={false} />;
      case 'nachrichten':
        return <NachrichtenGenerator lead={selectedLead} onBack={() => setCurrentPage('leads')} />;
      case 'inbox':
        return <Inbox onNavigate={setCurrentPage} />;
      case 'journal':
        return <TradingJournal currentUser={currentUser} />;
      case 'audio':
        return <AudioGenerator onBack={() => setCurrentPage('inbox')} />;
      case 'einstellungen':
        return <Einstellungen />;
      default:
        return <Dashboard onNavigate={setCurrentPage} currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors">
      <Navigation
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        currentUser={currentUser}
        onLogout={onLogout}
      />
      <main className="ml-64 p-8 relative z-10">
        {renderPage()}
      </main>
    </div>
  );
}