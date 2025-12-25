import { useState } from 'react';
import { ArrowLeft, Sparkles, RefreshCw, Copy, Send, Instagram } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import type { Lead } from '../App';

interface NachrichtenGeneratorProps {
  lead: Lead | null;
  onBack: () => void;
}

export function NachrichtenGenerator({ lead, onBack }: NachrichtenGeneratorProps) {
  const [selectedVersion, setSelectedVersion] = useState(1);
  const [customMessage, setCustomMessage] = useState('');
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  if (!lead) {
    return (
      <div className="space-y-8">
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ArrowLeft size={18} className="mr-2" />
          Zurück zur Leadliste
        </Button>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">Kein Lead ausgewählt. Bitte wähle einen Lead aus der Liste.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const messageVersions = [
    {
      id: 1,
      title: 'Persönlich & Warm',
      message: `Hey ${lead.name.split(' ')[0]}! 👋\n\nMir ist aufgefallen, dass du richtig spannenden Content zu ${lead.interessen[0]} machst. Besonders dein letzter Post hat mich inspiriert!\n\nIch arbeite gerade an etwas, das perfekt zu deinem Interesse an ${lead.interessen[1]} passen könnte. Hättest du Lust auf einen kurzen Austausch?\n\nLG`,
    },
    {
      id: 2,
      title: 'Direkt & Professionell',
      message: `Hallo ${lead.name},\n\nals jemand, der sich ebenfalls für ${lead.interessen[0]} und ${lead.interessen[1]} begeistert, würde ich gerne mit dir in Kontakt treten.\n\nIch habe eine Lösung entwickelt, die dir bei deinem Thema ${lead.interessen[2]} helfen könnte. Interesse an einem Austausch?\n\nBeste Grüße`,
    },
    {
      id: 3,
      title: 'Kreativ & Aufmerksamkeitsstark',
      message: `${lead.name.split(' ')[0]}, ich hab eine Frage! 🎯\n\nWie schaffst du es, so konsistent Content zu ${lead.interessen[0]} zu produzieren? Ich bin echt beeindruckt von deinem Engagement-Level!\n\nIch hab da was entwickelt, das dir vielleicht gefallen könnte - hat direkt mit ${lead.interessen[1]} zu tun. Darf ich dir mehr erzählen?\n\n✨`,
    },
  ];

  const currentMessage = messageVersions.find((v) => v.id === selectedVersion)?.message || '';

  const handleCopy = () => {
    const textToCopy = customMessage || currentMessage;
    navigator.clipboard.writeText(textToCopy);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  const handleGenerateNew = () => {
    setSelectedVersion((prev) => (prev % 3) + 1);
  };

  return (
    <div className="space-y-8">
      <Button onClick={onBack} variant="outline" className="mb-4">
        <ArrowLeft size={18} className="mr-2" />
        Zurück zur Leadliste
      </Button>

      <div>
        <h2>Nachrichten-Generator ✨</h2>
        <p className="text-slate-600 mt-1">KI-generierte, personalisierte Nachrichten für deinen Lead</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Lead Info */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Lead-Informationen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white">
                {lead.profileImage}
              </div>
              <div>
                <p className="text-foreground">{lead.name}</p>
                <p className="text-muted-foreground text-sm">{lead.username}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-1">Plattform</p>
              <div className="flex items-center gap-2">
                <Instagram size={16} className="text-pink-500" />
                <span className="text-slate-900 capitalize">{lead.platform}</span>
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-1">Beschreibung</p>
              <p className="text-slate-700 text-sm">{lead.beschreibung}</p>
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-2">Interessen</p>
              <div className="flex flex-wrap gap-2">
                {lead.interessen.map((interesse, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs border border-blue-200"
                  >
                    {interesse}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-slate-600 mb-2">Engagement-Level</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{ width: `${lead.engagementLevel}%` }}
                  />
                </div>
                <span className="text-blue-600 text-sm">{lead.engagementLevel}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Generator */}
        <div className="col-span-2 space-y-6">
          {/* Version Selection */}
          <div className="grid grid-cols-3 gap-4">
            {messageVersions.map((version) => (
              <Card
                key={version.id}
                className={`border-2 cursor-pointer transition-all ${
                  selectedVersion === version.id
                    ? 'border-blue-500 shadow-lg shadow-blue-500/30'
                    : 'border-slate-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedVersion(version.id)}
              >
                <CardContent className="p-4 text-center">
                  <Sparkles
                    size={24}
                    className={`mx-auto mb-2 ${selectedVersion === version.id ? 'text-blue-600' : 'text-slate-400'}`}
                  />
                  <p className={`text-sm ${selectedVersion === version.id ? 'text-blue-600' : 'text-slate-600'}`}>
                    {version.title}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Message Preview */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sparkles size={20} className="text-blue-600" />
                  KI-Nachrichtenvorschlag
                </span>
                <Button onClick={handleGenerateNew} variant="outline" size="sm">
                  <RefreshCw size={16} className="mr-2" />
                  Neu generieren
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-slate-700 whitespace-pre-wrap">{currentMessage}</p>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-2">Nachricht bearbeiten (optional)</p>
                <Textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Passe die Nachricht nach deinen Wünschen an..."
                  className="min-h-32 rounded-xl border-slate-200"
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleCopy} variant="outline" className="flex-1">
                  <Copy size={18} className="mr-2" />
                  {showCopySuccess ? '✓ Kopiert!' : 'In Zwischenablage kopieren'}
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/30">
                  <Send size={18} className="mr-2" />
                  Zu Instagram/TikTok
                </Button>
              </div>

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-800">
                  💡 <strong>Hinweis:</strong> Diese Nachricht wird manuell über Instagram/TikTok gesendet. Kopiere die
                  Nachricht und füge sie in der jeweiligen App ein.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}