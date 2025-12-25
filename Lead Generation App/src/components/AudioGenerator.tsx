import { useState } from 'react';
import { ArrowLeft, Sparkles, RefreshCw, Mic, Play, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface AudioGeneratorProps {
  onBack: () => void;
}

export function AudioGenerator({ onBack }: AudioGeneratorProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  const audioScript = `Hey Sarah! 👋

Danke für deine Nachricht - ich freu mich total, dass dich das interessiert!

Also, im Grunde geht es darum, wie du mit KI-gestützten Tools deine Akquise auf Social Media komplett automatisieren kannst. Nicht im Sinne von Spam, sondern wirklich personalisiert und authentisch.

Du weißt ja selbst, wie zeitaufwendig es ist, die richtigen Leute zu finden, sie anzuschreiben und dann auch noch am Ball zu bleiben. Genau da setzen wir an.

Das System analysiert automatisch deine Zielgruppe, erstellt personalisierte Nachrichtenvorschläge basierend auf den Interessen der Person, und hilft dir, den Überblick über alle Gespräche zu behalten.

Das Beste: Du behältst die volle Kontrolle. Alle Nachrichten werden von dir manuell gesendet - das ist wichtig für die Authentizität und auch plattformkonform.

Hast du Lust, dass ich dir das mal in einem kurzen Call zeige? Ich denke, das könnte für deinen Content Creator Business wirklich wertvoll sein!

Was meinst du? 😊`;

  const handleCopy = () => {
    navigator.clipboard.writeText(audioScript);
    setShowCopySuccess(true);
    setTimeout(() => setShowCopySuccess(false), 2000);
  };

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      setHasRecording(true);
    }
  };

  return (
    <div className="space-y-8">
      <Button onClick={onBack} variant="outline" className="mb-4">
        <ArrowLeft size={18} className="mr-2" />
        Zurück zur Inbox
      </Button>

      <div>
        <h2 className="text-foreground">Audio-Antwort Generator 🎙️</h2>
        <p className="text-muted-foreground mt-1">KI erstellt ein Skript für deine gesprochene Audio-Antwort</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Audio Script */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles size={20} className="text-blue-600" />
                Vorgeschlagenes Audio-Skript
              </span>
              <Button variant="outline" size="sm">
                <RefreshCw size={16} className="mr-2" />
                Neu generieren
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted rounded-xl border border-border max-h-96 overflow-y-auto">
              <p className="text-foreground whitespace-pre-wrap leading-relaxed">{audioScript}</p>
            </div>

            <Button onClick={handleCopy} variant="outline" className="w-full">
              <Copy size={18} className="mr-2" />
              {showCopySuccess ? '✓ Skript kopiert!' : 'Skript in Zwischenablage kopieren'}
            </Button>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-sm text-blue-800">
                💡 <strong>Tipp:</strong> Lies das Skript ein paar Mal durch, bevor du aufnimmst. Es muss nicht wortwörtlich
                sein - bleib natürlich und authentisch!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recording Interface */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic size={20} className="text-purple-600" />
              Audio aufnehmen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Visual Indicator */}
            <div className="flex items-center justify-center h-64">
              <div
                className={`relative w-48 h-48 rounded-full flex items-center justify-center transition-all ${
                  isRecording
                    ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse shadow-2xl shadow-red-500/50'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-xl shadow-blue-500/30'
                }`}
              >
                <Mic size={64} className="text-white" />
                {isRecording && (
                  <>
                    <div className="absolute inset-0 rounded-full bg-red-500 opacity-30 animate-ping" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-pulse" />
                  </>
                )}
              </div>
            </div>

            {/* Recording Timer */}
            {isRecording && (
              <div className="text-center">
                <p className="text-red-600 text-xl">● Aufnahme läuft...</p>
                <p className="text-muted-foreground text-sm mt-1">00:23</p>
              </div>
            )}

            {/* Controls */}
            <div className="space-y-3">
              <Button
                onClick={handleRecord}
                className={`w-full h-14 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                } shadow-lg`}
              >
                <Mic size={20} className="mr-2" />
                {isRecording ? 'Aufnahme beenden' : 'Audio aufnehmen'}
              </Button>

              {hasRecording && !isRecording && (
                <>
                  <Button variant="outline" className="w-full h-14 border-slate-300">
                    <Play size={20} className="mr-2" />
                    Aufnahme anhören
                  </Button>
                  <Button className="w-full h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    Audio speichern & zu Instagram/TikTok
                  </Button>
                </>
              )}
            </div>

            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
              <p className="text-sm text-purple-800">
                💡 <strong>Hinweis:</strong> Die Audio-Nachricht wird manuell vom Nutzer aufgenommen und über
                Instagram/TikTok gesendet. Achte auf gute Audioqualität!
              </p>
            </div>

            {/* Tips */}
            <div className="space-y-2">
              <p className="text-sm text-foreground">📌 Tipps für bessere Audio-Nachrichten:</p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Sprich in einer ruhigen Umgebung</li>
                <li>• Halte das Handy nah am Mund</li>
                <li>• Sprich langsam und deutlich</li>
                <li>• Lächle beim Sprechen - man hört es! 😊</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}