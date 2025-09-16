import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Users, 
  Trophy, 
  Settings, 
  Rocket,
  Zap,
  Globe,
  Star,
  Crown,
  Target
} from "lucide-react";

interface GameMode {
  id: string;
  name: string;
  description: string;
  playerCount: string;
  icon: any;
  difficulty: "Easy" | "Medium" | "Hard";
  isPopular?: boolean;
}

const gameModes: GameMode[] = [
  {
    id: "battle-royale",
    name: "Battle Royale",
    description: "Last pilot flying wins the ultimate sky battle",
    playerCount: "8-16 Players",
    icon: Crown,
    difficulty: "Hard",
    isPopular: true,
  },
  {
    id: "team-deathmatch",
    name: "Team Deathmatch",
    description: "Squadron vs squadron aerial combat",
    playerCount: "4v4 Players",
    icon: Users,
    difficulty: "Medium",
    isPopular: true,
  },
  {
    id: "free-for-all",
    name: "Free For All",
    description: "Every pilot for themselves in chaotic combat",
    playerCount: "6-8 Players",
    icon: Target,
    difficulty: "Medium",
  },
  {
    id: "capture-orb",
    name: "Capture the Orb",
    description: "Secure and defend the cosmic energy orb",
    playerCount: "3v3 Players",
    icon: Star,
    difficulty: "Easy",
  },
];

export const GameMenu = ({ onModeSelect }: { onModeSelect: (mode: string) => void }) => {
  const [selectedMode, setSelectedMode] = useState("battle-royale");

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-primary/20 rounded-full glow-primary animate-pulse-glow">
              <Rocket className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="text-6xl font-bold gradient-primary bg-clip-text text-transparent">
                JETPACK
              </h1>
              <h2 className="text-4xl font-bold text-foreground -mt-2">SKY WARS</h2>
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the skies in epic multiplayer aerial combat. 
            Soar through floating islands and outmaneuver your opponents with advanced jetpack technology.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Game Modes */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">Select Battle Mode</h3>
              <Badge variant="secondary" className="animate-pulse">
                <Globe className="h-3 w-3 mr-1" />
                2,847 Players Online
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gameModes.map((mode) => {
                const Icon = mode.icon;
                const isSelected = selectedMode === mode.id;
                
                return (
                  <Card
                    key={mode.id}
                    className={`
                      relative cursor-pointer transition-all duration-300 hover:scale-105
                      ${isSelected 
                        ? 'gradient-card border-primary glow-primary' 
                        : 'gradient-card border-primary/20 hover:border-primary/50'
                      }
                    `}
                    onClick={() => setSelectedMode(mode.id)}
                  >
                    <div className="p-6">
                      {mode.isPopular && (
                        <Badge 
                          variant="secondary" 
                          className="absolute -top-2 -right-2 glow-secondary animate-pulse"
                        >
                          HOT
                        </Badge>
                      )}
                      
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${isSelected ? 'bg-primary/20 glow-primary' : 'bg-muted/20'}`}>
                          <Icon className={`h-6 w-6 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-foreground mb-2">{mode.name}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{mode.description}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">{mode.playerCount}</span>
                            <Badge 
                              variant={mode.difficulty === "Easy" ? "secondary" : mode.difficulty === "Medium" ? "outline" : "destructive"}
                              className="text-xs"
                            >
                              {mode.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                variant="hero" 
                size="lg" 
                className="flex-1 text-lg py-6 animate-pulse-glow"
                onClick={() => onModeSelect('quick-match')}
              >
                <Play className="h-6 w-6 mr-3" />
                QUICK MATCH
              </Button>
              
              <Button 
                variant="cyber" 
                size="lg" 
                className="flex-1 text-lg py-6"
                onClick={() => onModeSelect('create-room')}
              >
                <Users className="h-6 w-6 mr-3" />
                CREATE ROOM
              </Button>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            
            {/* Player Profile */}
            <Card className="gradient-card border-primary/20 p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center glow-primary">
                  <Rocket className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">SkyCommander</h3>
                <Badge variant="secondary" className="mb-4">Level 12 Ace Pilot</Badge>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">247</div>
                    <div className="text-xs text-muted-foreground">Wins</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">1.8</div>
                    <div className="text-xs text-muted-foreground">K/D</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">89h</div>
                    <div className="text-xs text-muted-foreground">Flight Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">#15</div>
                    <div className="text-xs text-muted-foreground">Global Rank</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Leaderboard */}
            <Card className="gradient-card border-primary/20 p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-accent" />
                Top Pilots Today
              </h3>
              
              <div className="space-y-3">
                {[
                  { rank: 1, name: "AerialAce", score: 2847 },
                  { rank: 2, name: "SkyHunter", score: 2691 },
                  { rank: 3, name: "JetMaster", score: 2534 },
                  { rank: 4, name: "CloudRider", score: 2387 },
                  { rank: 5, name: "StormPilot", score: 2298 },
                ].map((player) => (
                  <div key={player.rank} className="flex items-center gap-3">
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                      ${player.rank === 1 ? 'bg-accent text-accent-foreground glow-accent' : 
                        player.rank === 2 ? 'bg-secondary text-secondary-foreground' :
                        player.rank === 3 ? 'bg-primary text-primary-foreground' :
                        'bg-muted text-muted-foreground'}
                    `}>
                      {player.rank}
                    </div>
                    <span className="flex-1 text-sm font-medium text-foreground">{player.name}</span>
                    <span className="text-xs text-muted-foreground">{player.score.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Settings & Links */}
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="flex-1">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="flex-1">
                <Trophy className="h-4 w-4" />
              </Button>
              <Button variant="neon" size="icon" className="flex-1">
                <Zap className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};