import { AccountInterface } from "starknet";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { ContractComponents } from "./generated/contractComponents";
import type { IWorld } from "./generated/generated";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { client }: { client: IWorld },
  _contractComponents: ContractComponents,
  { Leaderboard }: ClientComponents
) {
  const spawn = async (account: AccountInterface) => {
    try {
      const { transaction_hash } = await client.actions.spawn({
        account,
      });

      await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e) {
      console.log(e);
    }
  };

  const move = async (account: AccountInterface, score: number) => {
    const entityId = getEntityIdFromKeys([BigInt(account.address)]) as Entity;

    try {
      const { transaction_hash } = await client.actions.move({
        account,
        score,
      });

      await account.waitForTransaction(transaction_hash, {
        retryInterval: 100,
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (e) {
      console.log(e);
      // Position.removeOverride(positionId);
      // Moves.removeOverride(movesId);
    } finally {
      // Position.removeOverride(positionId);
      // Moves.removeOverride(movesId);
    }
  };

  return {
    spawn,
    move,
  };
}
