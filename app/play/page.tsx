"use client";
import GameScreen from "@/components/game/GameScreen";
import LeaderBoard from "@/components/leaderboard/Leaderboard";
import { useGameLogic } from "@/hooks/useGameLogic";

export default function Play() {
  const {
    correctAnswer,
    setCorrectAnswer,
    playerAnswer,
    setPlayerAnswer,
    imagesData,
  } = useGameLogic();
  return (
    <div className="flex flex-col items-center justify-center w-full mt-20">
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <LeaderBoard />
        </div>
        <div className="col-span-9">
          <GameScreen
            correctAnswer={correctAnswer}
            setCorrectAnswer={setCorrectAnswer}
            playerAnswer={playerAnswer}
            setPlayerAnswer={setPlayerAnswer}
            imagesData={imagesData}
          />
        </div>
      </div>
    </div>
  );
}
