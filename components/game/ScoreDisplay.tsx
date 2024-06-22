import * as React from "react";

import { Star, SearchCheck } from "lucide-react";

export default function ScoreDisplay({
  score,
  highscore,
  mysteriesCount,
}: {
  score: number;
  highscore: number;
  mysteriesCount: number;
}) {
  return (
    <div className=" mt-1 p-0.5 rounded-lg w-full">
      <div className="flex flex-col items-center p-3 rounded-lg">
        <p className="text-4xl font-semibold">{score}</p>
        <p className="text-sm font-medium ">Score</p>
        <div className="flex items-center py-1 px-2 mt-1 border rounded-lg">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          <p className="text-xs font-medium ">Your highscore: {highscore}</p>
        </div>
        <div className="flex items-center py-1 px-2 mt-1 rounded-lg">
          <SearchCheck className="h-4 w-4 text-green-500 mr-1" />
          <p className="text-xs font-medium ">
            Mysteries solved: {mysteriesCount}
          </p>
        </div>
      </div>
    </div>
  );
}
