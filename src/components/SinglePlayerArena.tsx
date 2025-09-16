import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Box, Sphere } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Fuel, 
  Crosshair, 
  Shield, 
  Zap,
  Timer,
  Trophy,
  Settings,
  ArrowLeft,
  Bot
} from "lucide-react";
import * as THREE from "three";

// Bot AI Player Component
const BotPlayer = ({ position, botId }: { position: [number, number, number], botId: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [targetPosition, setTargetPosition] = useState(position);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Simple AI movement pattern
      const time = state.clock.elapsedTime;
      const moveSpeed = 0.02;
      
      // Random movement pattern for each bot
      const offsetX = Math.sin(time * (0.5 + botId * 0.2)) * 5;
      const offsetZ = Math.cos(time * (0.3 + botId * 0.15)) * 5;
      const offsetY = position[1] + Math.sin(time * 2 + botId) * 2;
      
      groupRef.current.position.x = position[0] + offsetX;
      groupRef.current.position.z = position[2] + offsetZ;
      groupRef.current.position.y = offsetY;
      groupRef.current.rotation.y += moveSpeed;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Bot Body */}
      <Sphere args={[0.5]} position={[0, 0, 0]}>
        <meshLambertMaterial color="#FF4444" />
      </Sphere>
      {/* Bot Jetpack */}
      <Box args={[0.3, 0.8, 0.2]} position={[0, 0, 0.4]}>
        <meshLambertMaterial color="#880000" />
      </Box>
      {/* Bot Flames */}
      <Sphere args={[0.1, 0.3]} position={[0, -0.5, 0.5]}>
        <meshLambertMaterial color="#FF8800" transparent opacity={0.7} />
      </Sphere>
    </group>
  );
};

// Player Component
const Player = ({ position }: { position: [number, number, number] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Player Body */}
      <Sphere args={[0.5]} position={[0, 0, 0]}>
        <meshLambertMaterial color="#00FFAA" />
      </Sphere>
      {/* Jetpack */}
      <Box args={[0.3, 0.8, 0.2]} position={[0, 0, 0.4]}>
        <meshLambertMaterial color="#FF6600" />
      </Box>
      {/* Jetpack Flames */}
      <Sphere args={[0.1, 0.3]} position={[0, -0.5, 0.5]}>
        <meshLambertMaterial color="#FFAA00" transparent opacity={0.7} />
      </Sphere>
    </group>
  );
};

// Floating Platform Component
const FloatingPlatform = ({ position, color = "#00AAFF" }: { position: [number, number, number], color?: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <Box ref={meshRef} position={position} args={[4, 0.5, 4]}>
      <meshLambertMaterial color={color} transparent opacity={0.8} />
    </Box>
  );
};

// Power Orb Component
const PowerOrb = ({ position, color }: { position: [number, number, number], color: string }) => {
  const orbRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.x += 0.02;
      orbRef.current.rotation.y += 0.03;
      orbRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.5;
    }
  });

  return (
    <Sphere ref={orbRef} position={position} args={[0.3]}>
      <meshLambertMaterial color={color} transparent opacity={0.8} />
    </Sphere>
  );
};

// 3D Game Scene
const SinglePlayerScene = () => {
  return (
    <Canvas camera={{ position: [0, 10, 15], fov: 75 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00AAFF" />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#FF00AA" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      
      {/* Arena Platforms */}
      <FloatingPlatform position={[0, 0, 0]} color="#0088FF" />
      <FloatingPlatform position={[8, 3, -5]} color="#FF0088" />
      <FloatingPlatform position={[-6, 5, 8]} color="#00FF88" />
      <FloatingPlatform position={[5, -2, 12]} color="#FFAA00" />
      <FloatingPlatform position={[-8, 8, -8]} color="#AA00FF" />
      
      {/* Player */}
      <Player position={[0, 3, 2]} />
      
      {/* AI Bots */}
      <BotPlayer position={[-3, 6, -4]} botId={1} />
      <BotPlayer position={[6, 1, 8]} botId={2} />
      <BotPlayer position={[-8, 4, 5]} botId={3} />
      
      {/* Power Orbs */}
      <PowerOrb position={[0, 8, 0]} color="#FFFF00" />
      <PowerOrb position={[-10, 3, 5]} color="#FF0000" />
      <PowerOrb position={[12, 6, -3]} color="#00FF00" />
      
      {/* Arena Title */}
      <Text
        position={[0, 15, 0]}
        fontSize={3}
        color="#00AAFF"
        anchorX="center"
        anchorY="middle"
      >
        SINGLE PLAYER MODE
      </Text>
      
      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
};

// Single Player HUD Component
const SinglePlayerHUD = ({ onBack }: { onBack: () => void }) => {
  const [health, setHealth] = useState(100);
  const [fuel, setFuel] = useState(75);
  const [score, setScore] = useState(0);
  const [botsDefeated, setBotsDefeated] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
      // Simulate score increase
      setScore(prev => prev + Math.floor(Math.random() * 10));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top HUD */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <div className="bg-card/90 border border-primary/30 rounded-lg px-6 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-primary" />
              <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-destructive" />
              <span className="font-bold">{botsDefeated}/3 Bots Defeated</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-accent" />
              <span className="font-bold">Score: {score.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 pointer-events-auto">
        <Button 
          variant="ghost" 
          size="icon" 
          className="bg-card/90 backdrop-blur-sm"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      {/* Bottom Left - Player Stats */}
      <div className="absolute bottom-6 left-6 space-y-3 pointer-events-auto">
        <div className="bg-card/90 border border-primary/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="space-y-3">
            {/* Health */}
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-destructive" />
              <div className="flex-1">
                <Progress value={health} className="h-3" />
              </div>
              <span className="text-sm font-bold min-w-[3rem]">{health}/100</span>
            </div>
            
            {/* Fuel */}
            <div className="flex items-center gap-3">
              <Fuel className="h-5 w-5 text-accent" />
              <div className="flex-1">
                <Progress value={fuel} className="h-3" />
              </div>
              <span className="text-sm font-bold min-w-[3rem]">{fuel}/100</span>
            </div>
          </div>
        </div>

        {/* AI Difficulty */}
        <div className="bg-card/90 border border-primary/30 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex gap-2">
            <Badge variant="secondary" className="glow-secondary">
              <Bot className="h-3 w-3 mr-1" />
              AI: Normal
            </Badge>
            <Badge variant="outline" className="border-accent/50">
              <Zap className="h-3 w-3 mr-1" />
              Training Mode
            </Badge>
          </div>
        </div>
      </div>

      {/* Bottom Right - Controls */}
      <div className="absolute bottom-6 right-6 pointer-events-auto">
        <div className="bg-card/90 border border-primary/30 rounded-lg p-4 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div><kbd className="bg-muted px-2 py-1 rounded">WASD</kbd> Move</div>
            <div><kbd className="bg-muted px-2 py-1 rounded">SPACE</kbd> Jetpack</div>
            <div><kbd className="bg-muted px-2 py-1 rounded">SHIFT</kbd> Boost</div>
            <div><kbd className="bg-muted px-2 py-1 rounded">CLICK</kbd> Shoot</div>
          </div>
        </div>
      </div>

      {/* Top Right - Settings */}
      <div className="absolute top-6 right-6 pointer-events-auto">
        <Button variant="ghost" size="icon" className="bg-card/90 backdrop-blur-sm">
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Crosshair className="h-6 w-6 text-primary glow-primary" />
      </div>
    </div>
  );
};

export const SinglePlayerArena = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="h-screen w-full relative bg-background overflow-hidden">
      {/* 3D Game World */}
      <div className="absolute inset-0">
        <SinglePlayerScene />
      </div>
      
      {/* Game HUD Overlay */}
      <SinglePlayerHUD onBack={onBack} />
    </div>
  );
};