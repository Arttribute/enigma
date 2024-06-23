import { useDojo } from "@/lib/dojo/useDojo";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const BurnerAccounts = () => {
  const {
    account,
    setup: {
      systemCalls: { spawn },
    },
  } = useDojo();
  const [clipboardStatus, setClipboardStatus] = useState({
    message: "",
    isError: false,
  });

  const handleRestoreBurners = async () => {
    try {
      await account?.applyFromClipboard();
      setClipboardStatus({
        message: "Burners restored successfully!",
        isError: false,
      });
    } catch (error) {
      setClipboardStatus({
        message: `Failed to restore burners from clipboard`,
        isError: true,
      });
    }
  };

  useEffect(() => {
    if (clipboardStatus.message) {
      const timer = setTimeout(() => {
        setClipboardStatus({ message: "", isError: false });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [clipboardStatus.message]);

  return (
    <>
      <Button disabled={account?.isDeploying} onClick={() => account?.create()}>
        {account?.isDeploying ? "Deploying Burner" : "Create Burner"}
      </Button>
      {account && account?.list().length > 0 && (
        <Button onClick={async () => await account?.copyToClipboard()}>
          Save Burners to Clipboard
        </Button>
      )}
      <Button onClick={handleRestoreBurners}>
        Restore Burners from Clipboard
      </Button>
      {clipboardStatus.message && (
        <div
          className={clipboardStatus.isError ? "text-error" : "text-success"}
        >
          {clipboardStatus.message}
        </div>
      )}

      <div className="flex justify-between">
        <Select
          value={account ? account.account.address : ""}
          onValueChange={(val) => account.select(val)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Signer" />
          </SelectTrigger>
          <SelectContent className="">
            {account?.list().map((account, index) => (
              <SelectItem value={account.address} key={index}>
                {account.address}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={() => account.clear()}>Clear burners</Button>
      </div>

      <Button onClick={() => spawn(account.account)}>Init</Button>
    </>
  );
};

export default BurnerAccounts;
