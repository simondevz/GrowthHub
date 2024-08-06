import { createApp } from "@deroll/app";
import { hexToString } from "viem";
import { report } from "./utils";
import addProject from "./controllers/advancedCalls/addProject";
import createMilestone from "./controllers/advancedCalls/createMilestone";
import createProject from "./controllers/advancedCalls/createProject";
import createReward from "./controllers/advancedCalls/createReward";
import register from "./controllers/advancedCalls/register";
import getUsers from "./controllers/inspectCalls/getUsers";
import getProjects from "./controllers/inspectCalls/getProjects";
import getStat from "./controllers/inspectCalls/getStats";
import getRewards from "./controllers/inspectCalls/getRewards";
import getContributions from "./controllers/inspectCalls/getContributions";
import getManaging from "./controllers/inspectCalls/getManaging";
import getUser from "./controllers/inspectCalls/getUser";
import getProject from "./controllers/inspectCalls/getProject";
import getMilestones from "./controllers/inspectCalls/getMilestaones";
import getAccomplishments from "./controllers/inspectCalls/getAccomplishments";
import processMergedRequest from "./controllers/advancedCalls/processMergedRequest";

// Create the application
export const app = createApp({
  url: process.env.ROLLUP_HTTP_SERVER_URL || "http://127.0.0.1:5004",
});

// Handle input encoded in hex
app.addAdvanceHandler(async ({ metadata, payload }) => {
  const payloadString = hexToString(payload);
  const jsonPayload = JSON.parse(payloadString);
  const sender = metadata.msg_sender;

  console.log("payload:", payloadString);
  console.log("sender: ", sender);

  let projectId;
  let username;
  let url;
  let milestonDetails;
  let contractAddress;
  let type;
  let amount;
  let description;
  let taskComplexity;

  switch (jsonPayload.method) {
    case "register":
      username = jsonPayload.data.username;
      if (!username)
        return report({
          message: "Error Occured",
          data: {
            error: "Invalid Payload.",
          },
        });
      return register({ username, address: sender });

    case "createProject": // for Project Manager
      url = jsonPayload.data.url;
      if (!url)
        return report({
          message: "Error Occured",
          data: {
            error: "Invalid Payload.",
          },
        });
      return createProject({ address: sender, url });

    case "addProject": // for contributor
      projectId = jsonPayload.data.projectId;
      if (!projectId)
        return report({
          message: "Error Occured",
          data: {
            error: "Invalid Payload.",
          },
        });
      return addProject({ address: sender, projectId });

    case "createMilestones":
      milestonDetails = jsonPayload.data.milestoneDetails;
      projectId = jsonPayload.data.projectId;

      if (!projectId || !milestonDetails?.length)
        return report({
          message: "Error Occured",
          data: {
            error: "Invalid Payload.",
          },
        });
      return createMilestone({ address: sender, projectId, milestonDetails });

    case "updateMilestone":
      milestonDetails = jsonPayload.data.milestoneDetails;
      projectId = jsonPayload.data.projectId;

      if (!projectId || !milestonDetails?.length)
        return report({
          message: "Error Occured",
          data: {
            error:
              "Invalid Payload. Should have: milestoneDetails , projectId.",
          },
        });

      return createMilestone({ address: sender, projectId, milestonDetails });

    case "createReward":
      contractAddress = jsonPayload.data?.contractAddress;
      type = jsonPayload.data?.type;
      amount = jsonPayload.data?.amount;
      description = jsonPayload.data?.description;
      projectId = jsonPayload.data?.projectId;

      if (!projectId || !contractAddress || !description)
        return report({
          message: "Error Occured",
          data: {
            error:
              "Invalid Payload. Should have: contractAddress, projectId, description. and optionally: type, amount.",
          },
        });

      return createReward({
        address: sender,
        projectId,
        contractAddress,
        type,
        amount,
        description,
      });

    case "processMergedRequest": // To be called by my proxy server
      taskComplexity = Number(jsonPayload.data?.taskComplexity);
      username = jsonPayload.data?.username;
      projectId = jsonPayload.data?.projectId;

      if (!projectId || !username || !taskComplexity)
        return report({
          message: "Error Occured",
          data: {
            error: "Invalid Payload",
          },
        });
      return processMergedRequest({
        username,
        projectId,
        taskComplexity,
        sender,
        app,
      });

    default:
      return report({
        message: "Error Occured",
        data: { error: "Invalid method" },
      });
  }
});

app.addInspectHandler(async ({ payload }) => {
  const url = hexToString(payload).split("/"); // inspect/balance/address
  let pathMethod = url[0]?.split("?")[0];
  let queryParameters = url[0]?.split("?")[1];
  console.log("Inspect call:", url);

  switch (pathMethod) {
    case "users": // page
      getUsers(queryParameters);
      break;

    case "projects": // page
      getProjects(queryParameters);
      break;

    case "stat": // user address and projectId
      getStat(queryParameters);
      break;

    case "rewards": // projectId and page
      getRewards(queryParameters);
      break;

    case "contributions": // address and page
      getContributions(queryParameters);
      break;

    case "managing": // address and page
      getManaging(queryParameters);
      break;

    case "user": // id
      getUser(queryParameters);
      break;

    case "project": // id
      getProject(queryParameters);
      break;

    case "milestones": // projectId
      getMilestones(queryParameters);
      break;

    case "accomplishments": // address and page
      getAccomplishments(queryParameters);
      break;

    default:
      report({
        message:
          "Default Path. Please see Github README.md for details on path and query parameters",
        data: {},
      });
      break;
  }
});

// Start the application
app.start().catch((e) => {
  console.error(e);
  process.exit(1);
});
