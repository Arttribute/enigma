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
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface LeaderBoard {
  id: number;
  web3address: string;
  name: string;
  score: number;
  created_at: Date;
}

export default function LeaderBoard() {
  const supabase = createClient();

  const [leaderboard, setLeaderboard] = useState<LeaderBoard[]>([]);

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      const { data, error } = await supabase.from("leaderboard").select("*");

      if (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
      console.log(data);
      setLeaderboard(data as LeaderBoard[]);
    };
    fetchLeaderBoard();
  }, []);

  return (
    <>
      <div className=" flex ml-2 mt-2 font-semibold items-center justify-center">
        <p className="text-gray-700">Live leaderboard</p>
        <Trophy className="h-4 w-4 ml-1 text-amber-500" />
      </div>
      <ScrollArea className="m-2 border border-black rounded-lg p-4 h-72 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Player</TableHead>
              <TableHead></TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {leaderboard
              .sort((a, b) => b.score - a.score)
              .map((score) => (
                <TableRow key={score.id}>
                  <TableCell className="font-medium py-1.5">
                    <Image
                      src="https://github.com/shadcn.png"
                      alt="submission"
                      width={32}
                      height={32}
                      className="rounded-full object-cover transition-all aspect-[1]"
                    />
                  </TableCell>
                  <TableCell className="w-[200px]">{score.name}</TableCell>
                  <TableCell className="text-right">{score.score} </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
}
