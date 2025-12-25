import { useState } from 'react';
import { Navigation } from './Navigation';
import { ManagerDashboard } from './ManagerDashboard';
import { TeamManagement } from './TeamManagement';
import { PerformanceView } from './PerformanceView';
import { Schulungsvideos } from './Schulungsvideos';
import { ZielgruppenAnalyse } from './ZielgruppenAnalyse';
import { LeadManager } from './LeadManager';
import { NachrichtenGenerator } from './NachrichtenGenerator';
import { Inbox } from './Inbox';
import { TradingJournal } from './TradingJournal';
import { AudioGenerator } from './AudioGenerator';
import { Einstellungen } from './Einstellungen';
import type { Page, User, Lead } from '../App';

interface ManagerViewProps {
  currentUser: User;
  onLogout: () => void;
  onSelectLead: (lead: Lead) => void;
  selectedLead: Lead | null;
}

export function ManagerView({ currentUser, onLogout, onSelectLead, selectedLead }: ManagerViewProps) {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <ManagerDashboard onNavigate={setCurrentPage} />;
      case 'team':
        return <TeamManagement />;
      case 'performance':
        return <PerformanceView />;
      case 'schulungen':
        return <Schulungsvideos currentUser={currentUser} />;
      case 'analyse':
        return <ZielgruppenAnalyse onNavigate={setCurrentPage} />;
      case 'leads':
        return <LeadManager onSelectLead={onSelectLead} currentUserId={currentUser.id} isManager={true} />;
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
        return <ManagerDashboard onNavigate={setCurrentPage} />;
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