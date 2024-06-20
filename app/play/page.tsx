import GameScreen from "@/components/game/GameScreen";
import LeaderBoard from "@/components/leaderboard/Leaderboard";

export default function Play() {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-20">
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <LeaderBoard />
        </div>
        <div className="col-span-9">
          <GameScreen />
        </div>
      </div>
    </div>
  );
}
