import { useState } from "react";
import { GameMenu } from "@/components/GameMenu";
import { GameLobby } from "@/components/GameLobby";
import { GameArena } from "@/components/GameArena";
import { SinglePlayerArena } from "@/components/SinglePlayerArena";

type GameState = "menu" | "lobby" | "arena" | "single-player";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("menu");

  const handleModeSelect = (mode: string) => {
    switch (mode) {
      case "single-player":
        setGameState("single-player");
        break;
      case "battle-royale":
      case "team-deathmatch":
      case "free-for-all":
      case "capture-orb":
        setGameState("arena");
        break;
      case "create-room":
        setGameState("lobby");
        break;
      default:
        setGameState("arena");
    }
  };

  const handleBack = () => {
    setGameState("menu");
  };

  const renderGame = () => {
    switch (gameState) {
      case "menu":
        return <GameMenu onModeSelect={handleModeSelect} />;
      case "lobby":
        return <GameLobby onBack={handleBack} />;
      case "arena":
        return <GameArena onBack={handleBack} />;
      case "single-player":
        return <SinglePlayerArena onBack={handleBack} />;
      default:
        return <GameMenu onModeSelect={handleModeSelect} />;
    }
  };

  return <div className="w-full">{renderGame()}</div>;
};

export default Index;
