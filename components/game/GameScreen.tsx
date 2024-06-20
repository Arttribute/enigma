import EnigmaAgent from "./EnigmaAgent";
import EnigmaImage from "./EnigmaImage";
import PlayerInputBox from "./PlayerInputBox";

export default function GameScreen() {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-7">
          <EnigmaImage />
        </div>
        <div className="col-span-5 m-1">
          <EnigmaAgent />
          <PlayerInputBox />
        </div>
      </div>
    </>
  );
}
