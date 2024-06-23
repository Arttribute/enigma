import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PlayerInput({
  input,
  handleInputChange,
  handleSubmit,
  setPlayerAnswer,
}: {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setPlayerAnswer: (value: string) => void;
}) {
  const handleSubmitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
    setPlayerAnswer(input);
  };
  return (
    <>
      <form onSubmit={handleSubmitAnswer}>
        <div className="w-full m-1 mt-2">
          <p className="text-sm font-medium m-0.5">Your answer</p>
          <Input
            type="text"
            placeholder="Type something"
            value={input}
            onChange={handleInputChange}
          />
          <Button className="w-full mt-2" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
