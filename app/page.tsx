"use client";
import { useState } from "react";
import AppBar from "@/components/layout/AppBar";

import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { connect } from "starknetkit";

export default function Home() {
  const [connection, setConnection] = useState<any>(null);
  const [provider, setProvider] = useState<any>(null);
  const [address, setAddress] = useState<any>(null);
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();

  const connectAndPlay = async () => {
    try {
      setDisabled(true);
      const connection: any = await connect({
        webWalletUrl: "https://web.argent.xyz",
      });

      if (connection && connection.isConnected) {
        setConnection(connection);
        setProvider(connection?.account);
        setAddress(connection.selectedAddress);
        localStorage.setItem(
          "account",
          JSON.stringify(connection.wallet.account)
        );
      }
      router.push(`/play`);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <AppBar />
      <div className=" my-20 mx-6 shadow-pink-800 ">
        <div className="flex flex-col items-center justify-center w-full ">
          <main className="flex flex-col items-center justify-center py-20 ">
            <div className="text-center ">
              <div className="flex flex-col items-center justify-center  ">
                <div className="flex">
                  <div className="text-7xl font-bold mb-4 bg-gradient-to-r py-2 from-orange-500 to-indigo-500 bg-clip-text text-transparent">
                    Enigma
                  </div>
                  <Sparkles className="w-10 h-10 text-indigo-500 text-xs mt-2 font-bold" />
                </div>
              </div>

              <h2 className="text-5xl font-semibold text-gray-700">
                The AI Art Mystery Game
              </h2>
              <p className="mt-3 text-lg text-gray-500 ">
                Solve stroy based mystery. Decipher AI art clues, guess the
                hidden objects,
                <br /> and race against time to secure your place on the
                leaderboard
              </p>
              <div className="mt-6">
                <Button className="px-12" onClick={connectAndPlay}>
                  Start Playing
                </Button>

                <div
                  className="absolute bottom-10 right-40 "
                  style={{
                    boxShadow:
                      "0 0 120px 20px #f8bbd0, 0 0 260px 140px #fffde7, 0 0 200px 160px #ede7f6, 0 0 200px 120px #ede7f6",
                    zIndex: -1,
                  }}
                ></div>
                <div
                  className="absolute bottom-40 left-40 "
                  style={{
                    boxShadow:
                      "0 0 120px 20px #f8bbd0, 0 0 260px 140px #ede7f6, 0 0 200px 160px #ede7f6, 0 0 200px 120px #ede7f6",
                    zIndex: -1,
                  }}
                ></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
