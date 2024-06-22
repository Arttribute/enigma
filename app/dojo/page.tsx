"use client";

import { dojoConfig } from "@/dojoConfig";
import { DojoProvider } from "@/lib/dojo/DojoContext";
import { setup } from "@/lib/dojo/generated/setup";
import "./page.css";
import { useEffect, useState } from "react";
import App from "./App";

export default function Dojo() {
  const [setupResult, setSetupResult] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const torii = await import("@dojoengine/torii-client");
        const setupRes = await setup(torii, dojoConfig);
        console.log(setupRes);
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
