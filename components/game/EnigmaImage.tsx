import Image from "next/image";

export default function EnigmaImage() {
  return (
    <>
      <div className="border m-2 p-0.5 rounded-lg">
        <Image src="/enigma.jpg" alt="Enigma" width={500} height={500} />
      </div>
    </>
  );
}
