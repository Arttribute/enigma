import EnigmaAgent from "./EnigmaAgent";
import EnigmaImage from "./EnigmaImage";
import PlayerInputBox from "./PlayerInputBox";

export default function GameScreen() {
  return (
    <div>
      <EnigmaAgent />
      <EnigmaImage />
      <PlayerInputBox />
    </div>
  );
}
