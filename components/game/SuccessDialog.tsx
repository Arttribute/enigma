"use client";
import * as React from "react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Loader2 } from "lucide-react";
import { connect } from "starknetkit";

import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Input } from "../ui/input";

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
  onLeaveGame: (web3address: string, name: string) => Promise<void>;
}) {
  const [loadingLeave, setLoadingLeave] = React.useState(false);
  const [connection, setConnection] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState("");

  const handleClaimAndLeave = async () => {
    setLoadingLeave(true);
    onContinue();
    await onLeaveGame(address, name || "Anonymous");
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
            <Input
              type="text"
              placeholder="Stand out with a unique name!"
              onChange={(e) => {
                setName(e.target.value);
                console.log(name);
              }}
              className="w-full"
            />
            <div className="flex items-center  gap-2 justify-center w-full">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="rounded-lg  mt-1 w-full border-gray-400"
                  onClick={onContinue}
                >
                  Continue
                  <ChevronRight size={20} className="ml-0.5 w-4 h-4" />
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  className="rounded-lg mt-1 border-gray-500 w-full"
                  disabled={loadingLeave}
                  onClick={handleClaimAndLeave}
                >
                  Claim NFT and End game
                  {loadingLeave && (
                    <Loader2 size={20} className="animate-spin" />
                  )}
                </Button>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
