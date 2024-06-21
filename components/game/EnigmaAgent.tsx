"use client";
import { useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function EnigmaAgent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <ScrollArea className="h-96  border rounded-lg m-1 p-4">
        <div className="flex-1 overflow-y-auto ">
          {messages.map((message) => (
            <div
              key={message.id}
              className="whitespace-pre-wrap"
              style={{ color: message.role === "user" ? "black" : "green" }}
            >
              <strong>{`${message.role}: `}</strong>
              {message.content}
              <br />
              <br />
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </>
  );
}
