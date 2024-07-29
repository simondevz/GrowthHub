import { app } from "../index";
import { hexToString, stringToHex } from "viem";
import register from "./advancedCalls/register";
import createProject from "./advancedCalls/createProject";
import addProject from "./advancedCalls/addProject";
import createMilestone from "./advancedCalls/createMilestone";
import createReward from "./advancedCalls/createReward";
import { notice, report } from "../utils";

// Handle input encoded in hex
app.addAdvanceHandler(async ({ metadata, payload }) => {
  const payloadString = hexToString(payload);
  const jsonPayload = JSON.parse(payloadString);
  const sender = metadata.msg_sender;

  console.log("payload:", payloadString);
  console.log("sender : ", sender);

  switch (jsonPayload.method) {
    case "register":
      let username = jsonPayload.data.username;
      if (!username)
        return report("Error Occured. Crosscheck your payload data");
      return register({ username, address: sender });

    case "createProject": // for Project Manager
      let url = jsonPayload.data.url;
      if (!url) return report("Error Occured. Crosscheck your payload data");
      return createProject({ address: sender, url });

    case "addProject": // for contributor
      let projectId = jsonPayload.data.projectId;
      if (!projectId)
        return report("Error Occured. Crosscheck your payload data");
      return addProject({ address: sender, projectId });

    case "createMilestones":
      let milestonDetails = jsonPayload.data.milestoneDetails;
      projectId = jsonPayload.data.projectId;

      if (!projectId || !milestonDetails?.length)
        return report("Error Occured. Crosscheck your payload data");
      return createMilestone({ address: sender, projectId, milestonDetails });

    case "updateMilestone":
      milestonDetails = jsonPayload.data.milestoneDetails;
      projectId = jsonPayload.data.projectId;

      if (!projectId || !milestonDetails?.length)
        return report("Error Occured. Crosscheck your payload data");
      return createMilestone({ address: sender, projectId, milestonDetails });

    case "createReward":
      let contractAddress = jsonPayload.data?.contractAddress;
      let type = jsonPayload.data?.type;
      let amount = jsonPayload.data?.amount;
      let description = jsonPayload.data?.description;
      projectId = jsonPayload.data?.projectId;

      if (!projectId || !contractAddress || !description)
        return report("Error Occured. Crosscheck your payload data");
      return createReward({
        address: sender,
        projectId,
        contractAddress,
        type,
        amount,
        description,
      });

    case "processMergedProject":
      return report("Not Implemented!");

    default:
      return report("Invalid method");
  }
});

app.addInspectHandler(async ({ payload }) => {
  const url = hexToString(payload).split("/"); // inspect/balance/address
  let pathMethod = url[1];
  console.log("Inspect call:", url);

  switch (pathMethod) {
    case "users": // range
      break;

    case "projects": // range
      break;

    case "stat": // user address and projectId
      break;

    case "rewards": // projectId and range
      break;

    case "contributions": // address
      break;

    case "managing": // address
      break;

    case "user": // id
      break;

    case "project": // id
      break;

    case "milestones": // projectId
      break;

    case "accomplishments": // address
      break;

    //   Todo: add routes to see counters
    default:
      break;
  }
});
