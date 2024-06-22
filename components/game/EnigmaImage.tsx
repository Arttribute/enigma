import Image from "next/image";
import StartGameScreen from "./StartGameScreen";
export default function EnigmaImage({ imagesData }: { imagesData: string[] }) {
  return (
    <>
      <div className="border m-2 p-0.5 rounded-lg  ">
        {imagesData && imagesData.length > 0 ? (
          <Image
            src={imagesData[0]}
            alt="Enigma"
            width={500}
            height={500}
            className="m-2 rounded-lg"
          />
        ) : (
          <div className="flex justify-center items-center h-full w-full p-8">
            <StartGameScreen />
          </div>
        )}
      </div>
    </>
  );
}
