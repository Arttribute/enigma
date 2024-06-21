"use client";
import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PlayerInputBox from "./PlayerInputBox";

export default function EnigmaAgent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const hiddenPattern = /\*\*(.*?)\*\*/;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    //set the correct answer to the word between the double asterisks
    const answer = messages.find((message) => message.role !== "user");
    if (answer) {
      const match = answer.content.match(hiddenPattern);
      console.log("match", match);
      if (match) {
        setCorrectAnswer(match[1]);
      }
    }
  }, [messages]);

  return (
    <>
      <ScrollArea className="h-96 border rounded-lg m-1 p-2">
        <div className="flex flex-col w-46 ">
          {messages.map((message) => (
            <div key={message.id} className="flex">
              {message.role !== "user" && (
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`w-72 m-1 p-3 rounded-lg text-sm  ${
                  message.role === "user"
                    ? " bg-amber-50 ml-auto"
                    : "bg-indigo-50"
                }`}
              >
                {message.content.replace(/\*\*[^*]+\*\*/g, "")}
              </div>
              <br />
              <br />
            </div>
          ))}
          <div ref={bottomRef} />
          answer: {correctAnswer}
        </div>
      </ScrollArea>
      <PlayerInputBox
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
