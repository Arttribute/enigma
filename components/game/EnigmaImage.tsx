"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import StartGameScreen from "./StartGameScreen";
import { Timer } from "lucide-react";
import { set } from "zod";

export default function EnigmaImage({
  imagesData,
  timeGiven,
  setTimeGiven,
}: {
  imagesData: string[];
  timeGiven: number;
  setTimeGiven: (value: number) => void;
}) {
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeGiven > 0) {
        setTimeGiven(timeGiven - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeGiven]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      <div className="border  m-2 p-0.5 rounded-lg border-black bg-white">
        {imagesData && imagesData.length > 0 ? (
          <div className=" rounded-lg relative">
            <Image
              src={imagesData[0]}
              alt="Enigma"
              width={500}
              height={500}
              className="m-1 rounded-lg"
            />
            <div className="absolute top-2 left-4 bg-white bg-opacity-80 p-2 rounded-lg text-lg">
              <div className="flex items-center text-base">
                <Timer className="w-4 h-4 mr-1 mb-0.5" />{" "}
                {formatTime(timeGiven)}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full w-full p-8">
            <StartGameScreen />
          </div>
        )}
      </div>
    </>
  );
}
