import EnigmaAgent from "./EnigmaAgent";
import EnigmaImage from "./EnigmaImage";

export default function GameScreen({
  correctAnswer,
  setCorrectAnswer,
  playerAnswer,
  setPlayerAnswer,
  imagesData,
  score,
  timeGiven,
  setTimeGiven,
  mysterySolved,
}: {
  correctAnswer: string;
  setCorrectAnswer: (value: string) => void;
  playerAnswer: string;
  setPlayerAnswer: (value: string) => void;
  imagesData: string[];
  score: number;
  timeGiven: number;
  setTimeGiven: (value: number) => void;
  mysterySolved: boolean;
}) {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-7 mr-3">
          <EnigmaImage
            imagesData={imagesData}
            timeGiven={timeGiven}
            setTimeGiven={setTimeGiven}
          />
        </div>
        <div className="col-span-5 m-1">
          <EnigmaAgent
            correctAnswer={correctAnswer}
            setCorrectAnswer={setCorrectAnswer}
            setPlayerAnswer={setPlayerAnswer}
          />
        </div>
      </div>
    </>
  );
}
