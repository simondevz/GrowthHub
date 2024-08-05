import { Address } from "viem";
import { addressToId, contributorTo, projects, users } from "../../state";
import { notice, report } from "../../utils";

export default function addProject({
  address,
  projectId,
}: {
  address: Address;
  projectId: string;
}) {
  // Check if project and user exists
  const project = projects?.[projectId];
  const userId = addressToId.get(address);

  if (project && userId) {
    project.contributors = [...project.contributors, address];
    contributorTo[address]?.push(project);
    return notice({ message: "project added", data: { project } });
  }

  return report({
    message: "Error Occured",
    data: {
      error: "Invalid user address or projectID",
    },
  });
}
