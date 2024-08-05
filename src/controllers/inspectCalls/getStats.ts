import { Address } from "viem";
import { statistics } from "../../state";
import { report } from "../../utils";

export default function getStat(queryParameters?: string) {
  console.log("Query parameters ==>>", queryParameters);
  let address: Address = "0x00000";
  let projectId: string | undefined = undefined;

  if (!queryParameters)
    return report({
      message: "Error occured",
      data: "Please pass in the user's address and the project Id you want to see the statistics for",
    });

  for (let index = 0; index < queryParameters?.split("&").length; index++) {
    const array = queryParameters?.split("&");
    const element = array[index]?.split("=");

    if (element?.[0] === "address") address = element[1] as Address;
    if (element?.[0] === "projectId") projectId = element[1] as string;
  }

  if (projectId && address !== "0x00000")
    return report({
      message: "User's Statistics for this project",
      data: statistics?.[address]?.[projectId] || {},
    });
}
