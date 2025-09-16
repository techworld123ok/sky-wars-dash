import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Rocket, Zap, Settings, Copy, Share } from "lucide-react";

interface Player {
  id: string;
  name: string;
  isReady: boolean;
  isHost: boolean;
}

export const GameLobby = () => {
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "SkyCommander", isReady: true, isHost: true },
    { id: "2", name: "JetPilot_42", isReady: false, isHost: false },
    { id: "3", name: "AerialAce", isReady: true, isHost: false },
  ]);
  
  const [roomCode] = useState("SKY-2024");
  const [playerName, setPlayerName] = useState("");

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Lobby Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="gradient-card border-primary/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg glow-primary">
                  <Rocket className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Sky Battle Arena</h1>
                  <p className="text-muted-foreground">Waiting for players to join...</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="font-mono text-lg px-4 py-2">
                  {roomCode}
                </Badge>
                <Button variant="ghost" size="icon" onClick={copyRoomCode}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="neon" size="sm">
                  <Share className="h-4 w-4 mr-2" />
                  Invite
                </Button>
              </div>
            </div>

            {/* Players List */}
            <div className="space-y-3 mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Players ({players.length}/8)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="bg-muted/20 border border-border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${player.isReady ? 'bg-secondary glow-secondary' : 'bg-muted'}`} />
                      <span className="font-medium text-foreground">{player.name}</span>
                      {player.isHost && (
                        <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                          HOST
                        </Badge>
                      )}
                    </div>
                    <span className={`text-sm ${player.isReady ? 'text-secondary' : 'text-muted-foreground'}`}>
                      {player.isReady ? 'READY' : 'Not Ready'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Enter your pilot name..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="bg-background/50 border-primary/30"
                />
                <Button variant="secondary">
                  Join Battle
                </Button>
              </div>
              
              <div className="flex gap-2">
                <Button variant="cyber" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="hero" size="lg" className="animate-pulse-glow">
                  <Zap className="h-5 w-5 mr-2" />
                  START BATTLE
                </Button>
              </div>
            </div>
          </Card>

          {/* Game Mode Selector */}
          <Card className="gradient-card border-primary/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Select Battle Mode</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="cyber" className="h-16 flex-col gap-2">
                <span className="font-bold">Battle Royale</span>
                <span className="text-xs text-muted-foreground">Last pilot flying wins</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <span className="font-bold">Team Deathmatch</span>
                <span className="text-xs text-muted-foreground">4v4 squadron battle</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <span className="font-bold">Free For All</span>
                <span className="text-xs text-muted-foreground">Every pilot for themselves</span>
              </Button>
              <Button variant="outline" className="h-16 flex-col gap-2">
                <span className="font-bold">Capture Orb</span>
                <span className="text-xs text-muted-foreground">Secure the cosmic orb</span>
              </Button>
            </div>
          </Card>
        </div>

        {/* Arena Preview & Stats */}
        <div className="space-y-6">
          <Card className="gradient-card border-primary/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Arena Preview</h3>
            <div className="aspect-square bg-background/30 rounded-lg border border-primary/20 mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <Rocket className="h-12 w-12 text-primary mx-auto mb-2 animate-float" />
                <p className="text-sm text-muted-foreground">Cloud City Arena</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Map:</span>
                <span className="text-foreground">Cloud City</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span className="text-foreground">Medium</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Gravity:</span>
                <span className="text-foreground">Low</span>
              </div>
            </div>
          </Card>

          <Card className="gradient-card border-primary/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Your Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pilot Level</span>
                <Badge variant="secondary">Level 12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Battles Won</span>
                <span className="text-primary font-bold">247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">K/D Ratio</span>
                <span className="text-secondary font-bold">1.8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Flight Hours</span>
                <span className="text-accent font-bold">89h</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};