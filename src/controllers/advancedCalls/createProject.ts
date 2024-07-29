import { Address } from "viem";
import { managerTo, projectCounter, projects } from "../../state";
import { notice } from "../../utils";

export default function createProject({
  address,
  url,
}: {
  address: Address;
  url: string;
}) {
  const id = projectCounter.value.toString();
  const project = {
    id,
    url,
    contributors: [],
    managers: [address],
  };

  projects[id] = project;
  managerTo[address]?.push(project);
  projectCounter.value++;
  return notice({ message: "Project created", data: { project } });
}
