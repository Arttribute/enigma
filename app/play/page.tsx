"use client";
import GameScreen from "@/components/game/GameScreen";
import LeaderBoard from "@/components/leaderboard/Leaderboard";
import AppBar from "@/components/layout/AppBar";
import { useGameLogic } from "@/hooks/useGameLogic";
import SuccessDialog from "@/components/game/SuccessDialog";
import ScoreDisplay from "@/components/game/ScoreDisplay";

export default function Play() {
  const {
    correctAnswer,
    setCorrectAnswer,
    playerAnswer,
    setPlayerAnswer,
    mysterySolved,
    imagesData,
  } = useGameLogic();
  return (
    <>
      <AppBar />
      <div className="flex flex-col items-center justify-center w-full mt-20">
        <div className="grid grid-cols-12">
          <div className="col-span-3">
            <div className="flex flex-col items-center justify-center border rounded-lg p-2 mt-2">
              <ScoreDisplay score={0} highscore={0} mysteriesCount={0} />
              <LeaderBoard />
            </div>
          </div>
          <div className="col-span-9">
            <GameScreen
              correctAnswer={correctAnswer}
              setCorrectAnswer={setCorrectAnswer}
              playerAnswer={playerAnswer}
              setPlayerAnswer={setPlayerAnswer}
              imagesData={imagesData}
            />
            <SuccessDialog
              open={mysterySolved}
              correctAnswer={correctAnswer}
              imageUrl={imagesData[0]}
              onContinue={() => {}}
              onLeaveGame={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  );
}
