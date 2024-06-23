"use client";
import { useState, useEffect, use } from "react";
import axios from "axios";
import { set } from "zod";

export const useGameLogic = () => {
  const [generationId, setGenerationId] = useState<string>("");
  const [imagesData, setImagesData] = useState<any[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [mysterySolved, setMysterySolved] = useState<boolean>(false);
  const [mysteryFailed, setMysteryFailed] = useState<boolean>(false);
  const [playerAnswer, setPlayerAnswer] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [guesses, setGuesses] = useState<number>(0);
  const [timeGiven, setTimeGiven] = useState<number>(45);

  useEffect(() => {
    if (correctAnswer) {
      generatePuzzleImage(correctAnswer);
    }
  }, [correctAnswer]);

  useEffect(() => {
    if (playerAnswer && correctAnswer && playerAnswer === correctAnswer) {
      setMysterySolved(true);
      setScore(score + 100);
      setTimeGiven(45);
      setGuesses(0);
    }
  }, [playerAnswer, correctAnswer]);

  useEffect(() => {
    setGuesses(guesses + 1);
  }, [playerAnswer]);

  useEffect(() => {
    if (correctAnswer !== "" && timeGiven === 0) {
      setMysteryFailed(true);
      setGuesses(0);
    }
  }, [correctAnswer, timeGiven]);

  useEffect(() => {
    if (generationId && imagesData.length === 0) {
      getPuzzleImage(generationId, "690204");
    }
    console.log("fetching imagesData", imagesData);
  }, [generationId, imagesData]);

  const generatePuzzleImage = async (imagePrompt: string) => {
    try {
      const textToImageObject = {
        text: imagePrompt,
        negative_prompt: "",
        super_resolution: true,
        face_correct: true,
        num_images: 1,
        callback: 0,
      };
      const res = await axios.post("/api/generation", {
        textToImageObject,
        modelId: "690204",
      });
      console.log("initiating image generation...");
      const generationData = await res.data;
      const generationId = generationData.id.toString();
      setGenerationId(generationId);
    } catch (error) {
      console.error(error);
    }
  };

  const getPuzzleImage = async (generationId: string, modelId: string) => {
    try {
      const result = await axios.get(`/api/generation/${generationId}`, {
        params: { model_id: modelId, prompt_id: generationId },
      });
      console.log("getting image data...");
      setImagesData(result.data.data.images);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNextMystery = () => {
    setCorrectAnswer("");
    setPlayerAnswer("");
    setMysterySolved(false);
    setMysteryFailed(false);
    setGenerationId("");
    setImagesData([]);
  };
  return {
    correctAnswer,
    playerAnswer,
    imagesData,
    mysterySolved,
    score,
    guesses,
    timeGiven,
    mysteryFailed,
    setCorrectAnswer,
    setPlayerAnswer,
    setScore,
    setGuesses,
    setMysterySolved,
    setTimeGiven,
    setMysteryFailed,
    handleNextMystery,
  };
};
