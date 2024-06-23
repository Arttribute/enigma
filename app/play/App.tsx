import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "@/lib/dojo/useDojo";

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
import BurnerAccounts from "@/components/game/BurnerAccounts";
import { useEffect } from "react";

function App() {
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

  const {
    setup: {
      systemCalls: { move },
      clientComponents: { Leaderboard },
    },
    account,
  } = useDojo();

  // entity id we are syncing
  const entityId = getEntityIdFromKeys([
    BigInt(account?.account.address),
  ]) as Entity;

  // get current component values
  const leaderboard = useComponentValue(Leaderboard, entityId);

  console.log("leaderboard", leaderboard);

  useEffect(() => {
    async function saveLeaderboard() {
      if (mysterySolved || mysteryFailed) {
        move(account.account, score);
      }
    }
    saveLeaderboard();
  }, [mysterySolved, mysteryFailed]);

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
              {leaderboard ? `Score: ${leaderboard.score}` : "Initialize"}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            {leaderboard ? (
              <>
                <ScoreDisplay score={score} highscore={0} mysteriesCount={0} />
                <LeaderBoard newPlay={leaderboard} />
              </>
            ) : (
              <BurnerAccounts />
            )}
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

export default App;
