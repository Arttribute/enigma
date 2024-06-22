"use client";
import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

import { Play as PlayIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

export default function StartGameScreen() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="mt-4 flex">
          <div className="text-xl font-bold  bg-gradient-to-r from-orange-500 to-indigo-500 bg-clip-text text-transparent">
            Enigma
          </div>
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 text-xs mt-0.5 font-bold" />
        </div>
        <div className=" py-12 px-10 m-4  rounded-xl w-96 ">
          <div className=" flex flex-col items-center justify-center ">
            <div className="text-center mb-10">
              <p className="text-lg  ">Welcome to Enigma Mystery Game</p>

              <p className="text-sm text-gray-500 mt-8">
                Your goal is to solve the presented mystery before the image
                fully forms on the screen and time runs out
              </p>

              <p className="text-xs text-gray-500 mt-8">
                Hit the start button on the bottlom right to begin
              </p>
            </div>

            <div className="mt-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="rounded-lg mt-1 text-xs font-light text-gray-500 w-52"
                >
                  Exit Game
                  <ChevronRight size={20} className=" w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
