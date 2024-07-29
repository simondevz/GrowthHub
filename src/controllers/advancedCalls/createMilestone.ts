import { Address } from "viem";
import { Milestone, MilestoneDetails } from "../../state/state.types";
import {
  addressToId,
  milestoneCounter,
  milestones,
  projects,
} from "../../state";
import { isManager, notice, report } from "../../utils";

export default function createMilestone({
  address,
  projectId,
  milestonDetails,
}: {
  address: Address;
  projectId: string;
  milestonDetails: { details: MilestoneDetails; rewardId: string }[];
}) {
  const project = projects?.[projectId];
  const id = milestoneCounter.value.toString();
  let milestoneLocal: Milestone[] = [];

  if (project && addressToId.has(address) && isManager(project, address)) {
    for (let index = 0; index < milestonDetails.length; index++) {
      const milestonDetail = milestonDetails[index];
      if (
        !milestonDetail?.details.achievement.metric ||
        !milestonDetail.details.achievement.value ||
        !milestonDetail.details.description ||
        !milestonDetail.rewardId
      ) {
        return report(
          "Check that your metric, value, description and rewardId are all properly configured in each"
        );
      }

      const milestone: Milestone = {
        id,
        projectId: project.id,
        details: milestonDetail!.details,
        rewardId: milestonDetail!.rewardId,
      };
      milestoneLocal = [...milestoneLocal, milestone];
    }

    milestones[projectId] = milestoneLocal;
    milestoneCounter.value++;
    return notice({
      message: "Milestones created",
      data: { milestones: milestoneLocal },
    });
  }

  return report("Not Authorized to create rewards for this project");
}
