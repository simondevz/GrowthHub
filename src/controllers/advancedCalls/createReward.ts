import { Address } from "viem";
import { addressToId, projects, rewardCounter, rewards } from "../../state";
import { Reward, RewardType } from "../../state/state.types";
import { isManager, notice, report } from "../../utils";

export default function createReward({
  address,
  projectId,
  contractAddress,
  type,
  amount,
  description,
}: {
  address: Address;
  projectId: string;
  contractAddress: Address;
  type?: RewardType;
  amount?: number;
  description: string;
}) {
  const id = rewardCounter.value.toString();
  const project = projects?.[projectId];

  if (addressToId.has(address) && project && isManager(project, address)) {
    const reward: Reward = {
      id,
      address: contractAddress,
      type: type || "NFTs",
      amount: BigInt(amount || 1n),
      description,
    };

    rewards[projectId]?.push(reward);
    rewardCounter.value++;
    return notice({
      message: "Reward for project" + projectId + " created",
      data: { reward },
    });
  }

  return report("Not Authorized to create rewards for this project");
}
