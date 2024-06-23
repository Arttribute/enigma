"use client";
import * as React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Loader2 } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "../ui/input";

export default function FailDialog({
  open,
  imageUrl,
  correctAnswer,
  onContinue,
  onLeaveGame,
}: {
  open: boolean;
  imageUrl: string;
  correctAnswer: string;
  onContinue: () => void;
  onLeaveGame: (name: string) => void;
}) {
  const [loadingLeave, setLoadingLeave] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleLeavegame = async () => {
    setLoadingLeave(true);
    await onLeaveGame(name);
    setLoadingLeave(false);
  };
  return (
    <Dialog open={false}>
      <DialogContent className="w-full">
        <div className="w-full">
          <div className="p-2 flex flex-col items-center justify-center">
            <Image
              src={imageUrl}
              width={500}
              height={400}
              alt={"game"}
              className="aspect-square rounded-md m-1"
            />
            <p className="text-xl font-semibold  m-2">Mystery failed 😔</p>
            <div className="bg-amber-50 m-1 p-3 rounded-lg ">
              Solution: {correctAnswer}
            </div>
            <Input
              type="text"
              placeholder="Show others you tried!"
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
            <div className="flex flex-col items-center justify-center w-full">
              <Button
                variant="outline"
                className="rounded-lg  mt-1 w-full border-gray-400"
                onClick={onContinue}
              >
                Play Again
                <ChevronRight size={20} className="ml-0.5 w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="rounded-lg  mt-1 w-full border-gray-400"
                disabled={loadingLeave}
                onClick={handleLeavegame}
              >
                {loadingLeave && (
                  <Loader2 className="animate-spin w-4 h-4 mr-2" />
                )}
                Save Score
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
