import { useState } from "react";
import { GameMenu } from "@/components/GameMenu";
import { GameLobby } from "@/components/GameLobby";
import { GameArena } from "@/components/GameArena";

type GameState = "menu" | "lobby" | "arena";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("menu");

  const handleModeSelect = (mode: string) => {
    if (mode === "quick-match") {
      setGameState("arena");
    } else if (mode === "create-room") {
      setGameState("lobby");
    }
  };

  const renderGame = () => {
    switch (gameState) {
      case "menu":
        return <GameMenu onModeSelect={handleModeSelect} />;
      case "lobby":
        return <GameLobby />;
      case "arena":
        return <GameArena />;
      default:
        return <GameMenu onModeSelect={handleModeSelect} />;
    }
  };

  return <div className="w-full">{renderGame()}</div>;
};

export default Index;
