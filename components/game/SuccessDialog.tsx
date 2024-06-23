"use client";
import * as React from "react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Loader2 } from "lucide-react";
import { connect, disconnect } from "starknetkit";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { on } from "events";

export default function SuccessDialog({
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
  onLeaveGame: () => void;
}) {
  const [loadingLeave, setLoadingLeave] = React.useState(false);
  const [connection, setConnection] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);

  const handleClaimAndLeave = async () => {
    await onContinue();
    const connection: any = await connect({
      webWalletUrl: "https://web.argent.xyz",
    });

    if (connection && connection.isConnected) {
      setConnection(connection);
      setProvider(connection.account);
      setAddress(connection.selectedAddress);
      const tx = await connection.account.execute({
        //let's assume this is an erc20 contract
        contractAddress: "0x...",
        selector: "transfer",
        calldata: [
          "0x...",
          // ...
        ],
      });
      await tx.wait();
    }

    setLoadingLeave(false);
  };
  return (
    <Dialog open={open}>
      <DialogContent className="w-full">
        <div className="w-full">
          <div className="p-2 flex flex-col items-center justify-center">
            <Image
              src={imageUrl}
              width={500}
              height={500}
              alt={"game"}
              className="aspect-square rounded-md m-1"
            />
            <p className="text-xl font-semibold  m-2">Mystery solved 🎉</p>
            <div className="bg-amber-50 m-1 p-3 rounded-lg ">
              Solution: {correctAnswer}
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <Button
                variant="outline"
                className="rounded-lg  mt-1 w-full border-gray-400"
                onClick={onContinue}
              >
                Continue
                <ChevronRight size={20} className="ml-0.5 w-4 h-4" />
              </Button>
              <Button
                className="rounded-lg mt-1 border-gray-500 w-full"
                onClick={handleClaimAndLeave}
              >
                Claim NFT and End game
                {loadingLeave && <Loader2 size={20} className="animate-spin" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
