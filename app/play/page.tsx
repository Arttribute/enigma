"use client";
import GameScreen from "@/components/game/GameScreen";
import LeaderBoard from "@/components/leaderboard/Leaderboard";
import AppBar from "@/components/layout/AppBar";
import { useGameLogic } from "@/hooks/useGameLogic";
import SuccessDialog from "@/components/game/SuccessDialog";
import FailDialog from "@/components/game/FailDialog";
import ScoreDisplay from "@/components/game/ScoreDisplay";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Play() {
  const {
    correctAnswer,
    setCorrectAnswer,
    playerAnswer,
    setPlayerAnswer,
    mysterySolved,
    imagesData,
    score,
    timeGiven,
    mysteryFailed,
    setTimeGiven,
    handleNextMystery,
  } = useGameLogic();
  return (
    <>
      <AppBar />
      <div className="flex flex-col items-center justify-center w-full mt-16">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="border rounded-lg p-1 px-6 -mb-5 mt-1 border-black bg-purple-50 z-10"
            >
              Score: {score}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <ScoreDisplay score={score} highscore={0} mysteriesCount={0} />
            <LeaderBoard />
          </DialogContent>
        </Dialog>
        <div className=" m-2 border rounded-lg p-2 border-black bg-purple-50">
          <GameScreen
            correctAnswer={correctAnswer}
            setCorrectAnswer={setCorrectAnswer}
            playerAnswer={playerAnswer}
            setPlayerAnswer={setPlayerAnswer}
            imagesData={imagesData}
            score={score}
            timeGiven={timeGiven}
            setTimeGiven={setTimeGiven}
            mysterySolved={mysterySolved}
          />
          <SuccessDialog
            open={mysterySolved}
            correctAnswer={correctAnswer}
            imageUrl={imagesData[0]}
            onContinue={handleNextMystery}
            onLeaveGame={() => {}}
          />
          <FailDialog
            open={mysteryFailed}
            correctAnswer={correctAnswer}
            imageUrl={imagesData[0]}
            onContinue={handleNextMystery}
            onLeaveGame={() => {}}
          />
        </div>
      </div>
    </>
  );
}
