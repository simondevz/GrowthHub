import { Address, encodeFunctionData } from "viem";
import {
  accomplishments,
  milestones,
  projects,
  rewards,
  statistics,
  statisticsCounter,
  usernameToId,
  users,
} from "../../state";
import { Milestone } from "../../state/state.types";
import { notice, report } from "../../utils";
import nftContractAbi from "../../contracts/abi/simpleNFTAbi.json";

export default function processMergedRequest({
  username,
  projectId,
  taskComplexity,
  sender,
  app,
}: {
  username: string;
  projectId: string;
  taskComplexity: number;
  sender: Address;
  app: any;
}) {
  const userId = usernameToId.get(username);
  if (!userId)
    return report({ message: "No user with username registered", data: {} });

  const project = projects[projectId];
  if (!project)
    return report({ message: "No project with Id Registered", data: {} });

  const projectMillestones = milestones[projectId];
  if (!projectMillestones || projectMillestones.length === 0)
    return report({ message: "Project has no milestones", data: {} });

  const user = users[userId];
  const stat = statistics?.[user!.address]?.[projectId];
  const newAchievements: { milestone: Milestone; redeemed: boolean }[] = [];

  let contribNo = 0;
  let impact = 0;
  let prevContribNo = 0;
  let prevImpact = 0;

  if (!stat) {
    statistics[user!.address] = {
      [projectId]: {
        id: statisticsCounter.value.toString(),
        projectId: projectId,
        userId: userId,
        contributionNo: 1,
        impact: taskComplexity,
      },
    };

    statisticsCounter.value++;
    contribNo = 1;
    impact = taskComplexity;
  } else {
    prevContribNo = stat.contributionNo;
    prevImpact = stat.impact;
    contribNo = stat.contributionNo + 1;
    impact = stat.impact + taskComplexity;
    stat.contributionNo = contribNo;
    stat.impact = impact;
  }

  for (let index = 0; index < projectMillestones.length; index++) {
    const milestone = projectMillestones[index];
    const milestoneValue = milestone?.details.achievement.value || 0;
    if (milestone?.details.achievement.metric === "contribCount") {
      // Check that the user just reached or passed the milestone
      if (milestoneValue === 0) continue;
      if (prevContribNo >= milestoneValue) continue;

      if (contribNo >= milestoneValue) {
        // prepare voucher
        const rewardContractAddress = rewards[projectId]?.find(
          (reward) => reward.id === milestone.rewardId
        )?.address;
        const callData = encodeFunctionData({
          abi: nftContractAbi,
          functionName: "mintTo",
          args: [sender],
        });

        // generate voucher
        if (!rewardContractAddress) continue;
        app.createVoucher({
          destination: rewardContractAddress,
          payload: callData,
        });

        // Update user achievenemts
        newAchievements.push({ milestone, redeemed: false });
        continue;
      }
    }

    if (milestone?.details.achievement.metric === "impact") {
      // Check that the user just reached or passed the milestone
      if (milestoneValue === 0) continue;
      if (prevImpact >= milestoneValue) continue;

      if (impact >= milestoneValue) {
        // prepare voucher
        const rewardContractAddress = rewards[projectId]?.find(
          (reward) => reward.id === milestone.rewardId
        )?.address;
        const callData = encodeFunctionData({
          abi: nftContractAbi,
          functionName: "mintTo",
          args: [sender],
        });

        // generate voucher
        if (!rewardContractAddress) continue;
        app.createVoucher({
          destination: rewardContractAddress,
          payload: callData,
        });
        // Update user achievenemts
        newAchievements.push({ milestone, redeemed: false });
        continue;
      }
    }
  }

  accomplishments[user!.address] = [
    ...(accomplishments[user!.address] || []),
    ...newAchievements,
  ];
  return notice({
    message: "Mergeed Pull Request Processed",
    data: { achievements: newAchievements },
  });
}
