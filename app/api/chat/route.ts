import { ModelFusionTextStream, asChatMessages } from "@modelfusion/vercel-ai";
import { Message, StreamingTextResponse } from "ai";
import { ollama, streamText } from "modelfusion";

export const runtime = "edge";

export async function POST(req: Request) {
  // useChat will send a JSON with a messages property:
  const { messages }: { messages: Message[] } = await req.json();

  const model = ollama.ChatTextGenerator({ model: "llama3" }).withChatPrompt();

  const prompt = {
    system: `You are an AI game agent in a mystery game. Your goal is to challenge a player to guess a single word from a story based mystery.You have the freedom to select the story and the word to be guessed. To start the game the player will tell you to start the game. You can then start the game by providing the story and the word to be guessed.
      Keep it short, sweet and simple. The player will have to guess the word based on the story you provide. If the player guesses the word correctly, you can congratulate them. If the player guesses the word incorrectly, you can provide a hint or ask them to try again.
      Here is an example of a story based mystery and a word to be guessed:
        story: "Detective Watson entered the dimly lit room, noticing an old desk in the corner.On the desk, there were scattered papers and an ink bottle nearby.He knew the culprit must have left something behind when writing the letter."
        word: "quill"
      Feel free to create your own story and word to be guessed. Make sure the story is short and engaging and the word is challenging to guess.
      You can prompt the player for the word by saying something like "What could it be?" and avoid asking the player to guess the word directly.
      Also, have a short and sweet one liner for starting the game. For example, "It's great you're here detective...(story)..."
      No need to tell the player that they can ask for hints or clarification. They can ask you for hints or clarification if they need it. You can provide hints or clarification as needed.
      While providing hints, you can provide a hint that is related to the story. Do not mention that it is a hint and avoid asking the player to guess the word directly.
      Note that since this game is being played in a web based environment, I need you to provide the correct word to be guessed at the end of the first message but wrapped in **. For example, "What could it be? **correct word**" which will ne hidden to the player but visible to me.
    `,

    // map Vercel AI SDK Message to ModelFusion ChatMessage:
    messages: asChatMessages(messages),
  };
  const textStream = await streamText({ model, prompt });
  return new StreamingTextResponse(ModelFusionTextStream(textStream));
}
