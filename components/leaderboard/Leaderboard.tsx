import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Trophy } from "lucide-react";

const gamescores = [
  {
    _id: "1",
    player: {
      name: "John Doe",
      picture: "https://github.com/shadcn.png",
    },
    score_value: 100,
  },
  {
    _id: "2",
    player: {
      name: "Jane Doe",
      picture: "https://github.com/shadcn.png",
    },
    score_value: 200,
  },
  {
    _id: "3",
    player: {
      name: "Shadrach",
      picture: "https://github.com/shadcn.png",
    },
    score_value: 300,
  },
];

export default function LeaderBoard() {
  return (
    <>
      <div className=" flex ml-2 mt-2 font-semibold items-center justify-center">
        <p className="text-gray-700">Live leaderboard</p>
        <Trophy className="h-4 w-4 ml-1 text-amber-500" />
      </div>
      <ScrollArea className="m-2 border rounded-lg p-4 w-72 h-72">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Player</TableHead>
              <TableHead></TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {gamescores.map((score) => (
              <TableRow key={score._id}>
                <TableCell className="font-medium py-1.5">
                  <Image
                    src={score.player?.picture}
                    alt="submission"
                    width={32}
                    height={32}
                    className="rounded-full object-cover transition-all aspect-[1]"
                  />
                </TableCell>
                <TableCell className="w-[200px]">
                  {score.player?.name}
                </TableCell>
                <TableCell className="text-right">
                  {score.score_value}{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
}
