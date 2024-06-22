import EnigmaAgent from "./EnigmaAgent";
import EnigmaImage from "./EnigmaImage";

export default function GameScreen({
  correctAnswer,
  setCorrectAnswer,
  playerAnswer,
  setPlayerAnswer,
  imagesData,
}: {
  correctAnswer: string;
  setCorrectAnswer: (value: string) => void;
  playerAnswer: string;
  setPlayerAnswer: (value: string) => void;
  imagesData: string[];
}) {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-7 mr-3">
          <EnigmaImage imagesData={imagesData} />
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
