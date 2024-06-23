"use client";

import { DojoProvider } from "@/lib/dojo/DojoContext";
import { dojoConfig } from "@/dojoConfig";
import { setup } from "@/lib/dojo/generated/setup";
import { useEffect, useState } from "react";
import App from "./App";

export default function Play() {
  const [setupResult, setSetupResult] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const torii = await import("@dojoengine/torii-client");
        const setupRes = await setup(torii, dojoConfig);
        setSetupResult(setupRes);
      } catch (error) {
        console.error("Error loading module:", error);
      }
    }

    load();
  }, []);

  if (!setupResult) {
    return <h1>Loading...</h1>;
  }

  return (
    <DojoProvider value={setupResult}>
      <App />
    </DojoProvider>
  );
}
