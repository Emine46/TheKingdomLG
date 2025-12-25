import { useState } from 'react';
import { Play, Upload, Trash2, Calendar, Clock, User, Filter, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Badge } from './ui/badge';
import type { TrainingVideo, User } from '../App';

interface SchulungsvideosProps {
  currentUser: User;
}

const mockVideos: TrainingVideo[] = [
  {
    id: '1',
    title: 'Instagram DM Strategie für Anfänger',
    description: 'Lerne die Grundlagen der Instagram DM-Akquise und wie du effektiv Leads generierst.',
    videoUrl: 'https://example.com/video1.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1649006865582-7267627f500c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    duration: '15:30',
    uploadedBy: 'Yavuz',
    uploadedAt: '2024-01-10',
    category: 'Instagram Basics',
  },
  {
    id: '2',
    title: 'TikTok Lead Generation Masterclass',
    description: 'Fortgeschrittene Techniken für die Lead-Generierung auf TikTok.',
    videoUrl: 'https://example.com/video2.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1758599879065-46fd59235166?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    duration: '22:15',
    uploadedBy: 'Yavuz',
    uploadedAt: '2024-01-08',
    category: 'TikTok Advanced',
  },
  {
    id: '3',
    title: 'Perfekte Nachrichten schreiben',
    description: 'Wie du Nachrichten schreibst, die hohe Antwortquoten erzielen.',
    videoUrl: 'https://example.com/video3.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1588912914074-b93851ff14b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    duration: '18:45',
    uploadedBy: 'Yavuz',
    uploadedAt: '2024-01-05',
    category: 'Kommunikation',
  },
  {
    id: '4',
    title: 'Audio-Antworten effektiv nutzen',
    description: 'Wie du mit Audio-Nachrichten eine persönliche Verbindung aufbaust.',
    videoUrl: 'https://example.com/video4.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    duration: '12:20',
    uploadedBy: 'Yavuz',
    uploadedAt: '2024-01-03',
    category: 'Kommunikation',
  },
  {
    id: '5',
    title: 'Lead Management Best Practices',
    description: 'Organisiere deine Leads professionell und steigere deine Conversion.',
    videoUrl: 'https://example.com/video5.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    duration: '20:10',
    uploadedBy: 'Yavuz',
    uploadedAt: '2024-01-01',
    category: 'Lead Management',
  },
];

export function Schulungsvideos({ currentUser }: SchulungsvideosProps) {
  const [videos, setVideos] = useState<TrainingVideo[]>(mockVideos);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<TrainingVideo | null>(null);

  // Upload form state
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    category: '',
    duration: '',
    videoUrl: '',
    thumbnailUrl: '',
  });

  const categories = ['all', 'Instagram Basics', 'TikTok Advanced', 'Kommunikation', 'Lead Management'];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

  const handleUploadVideo = () => {
    if (!newVideo.title || !newVideo.category) return;

    const video: TrainingVideo = {
      id: Date.now().toString(),
      title: newVideo.title,
      description: newVideo.description,
      videoUrl: newVideo.videoUrl || 'https://example.com/video.mp4',
      thumbnailUrl: newVideo.thumbnailUrl || 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400',
      duration: newVideo.duration || '10:00',
      uploadedBy: currentUser.name,
      uploadedAt: new Date().toISOString().split('T')[0],
      category: newVideo.category,
    };

    setVideos([video, ...videos]);
    setNewVideo({
      title: '',
      description: '',
      category: '',
      duration: '',
      videoUrl: '',
      thumbnailUrl: '',
    });
    setIsUploadDialogOpen(false);
  };

  const handleDeleteVideo = (videoId: string) => {
    setVideos(videos.filter(v => v.id !== videoId));
  };

  return (
    <div className="flex h-full gap-6">
      {/* Left Sidebar - Categories (Discord Style) */}
      <div className="w-64 flex-shrink-0 space-y-2">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={24} className="text-primary" />
            <h3 className="text-foreground">Kategorien</h3>
          </div>
          
          {currentUser.role === 'manager' && (
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-primary hover:bg-primary/90 mb-4">
                  <Upload className="mr-2 h-4 w-4" />
                  Video hochladen
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Neues Schulungsvideo hochladen</DialogTitle>
                  <DialogDescription>
                    Füge ein neues Video für dein Team hinzu
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titel</Label>
                    <Input
                      id="title"
                      value={newVideo.title}
                      onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                      placeholder="z.B. Instagram DM Strategie"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Beschreibung</Label>
                    <Textarea
                      id="description"
                      value={newVideo.description}
                      onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                      placeholder="Kurze Beschreibung des Inhalts..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategorie</Label>
                    <Select
                      value={newVideo.category}
                      onValueChange={(value) => setNewVideo({ ...newVideo, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Kategorie wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(c => c !== 'all').map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Dauer (mm:ss)</Label>
                    <Input
                      id="duration"
                      value={newVideo.duration}
                      onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                      placeholder="z.B. 15:30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="videoUrl">Video URL</Label>
                    <Input
                      id="videoUrl"
                      value={newVideo.videoUrl}
                      onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                    <Input
                      id="thumbnailUrl"
                      value={newVideo.thumbnailUrl}
                      onChange={(e) => setNewVideo({ ...newVideo, thumbnailUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <Button onClick={handleUploadVideo} className="w-full bg-primary hover:bg-primary/90">
                    Video hochladen
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Category Buttons */}
        <div className="space-y-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="capitalize">
                  {category === 'all' ? '📚 Alle Videos' : `# ${category}`}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {category === 'all' 
                    ? videos.length 
                    : videos.filter(v => v.category === category).length}
                </Badge>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Videos List (Discord Style) */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-2">
        <div className="mb-6">
          <h2 className="text-foreground mb-1">
            {selectedCategory === 'all' ? 'Alle Schulungsvideos' : selectedCategory}
          </h2>
          <p className="text-muted-foreground text-sm">
            {filteredVideos.length} {filteredVideos.length === 1 ? 'Video' : 'Videos'} verfügbar
          </p>
        </div>

        {filteredVideos.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <GraduationCap size={48} className="mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-foreground mb-2">Keine Videos in dieser Kategorie</p>
              <p className="text-muted-foreground text-sm">
                {currentUser.role === 'manager' 
                  ? 'Lade das erste Video in dieser Kategorie hoch'
                  : 'Der Manager hat noch keine Videos in dieser Kategorie hochgeladen'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredVideos.map((video) => (
            <Card 
              key={video.id} 
              className="border-0 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-48 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                        <Play size={24} className="text-primary-foreground ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/80 text-white text-xs font-medium">
                      {video.duration}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-foreground font-medium line-clamp-1">{video.title}</h3>
                      {currentUser.role === 'manager' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteVideo(video.id);
                          }}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 flex-shrink-0"
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {video.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{video.uploadedBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{new Date(video.uploadedAt).toLocaleDateString('de-DE')}</span>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {video.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Video Player Dialog */}
      {selectedVideo && (
        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedVideo.title}</DialogTitle>
              <DialogDescription>{selectedVideo.description}</DialogDescription>
            </DialogHeader>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play size={64} className="mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Video Player (Demo)</p>
                <p className="text-sm text-muted-foreground mt-2">URL: {selectedVideo.videoUrl}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
