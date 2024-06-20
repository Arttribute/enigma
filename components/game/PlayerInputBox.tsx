import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PlayerInput() {
  return (
    <>
      <div className="w-full m-1 mt-2">
        <p className="text-sm font-medium m-0.5">Your guess</p>
        <Input type="text" placeholder="Type something" />
        <Button className="w-full mt-2">Submit</Button>
      </div>
    </>
  );
}
