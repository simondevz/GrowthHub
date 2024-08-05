import { milestones } from "../../state";
import { report } from "../../utils";

export default function getMilestones(queryParameters?: string) {
  console.log("Query parameters ==>>", queryParameters);
  let page = 1;
  let page_size = 50;
  let projectId: string | undefined = undefined;

  if (queryParameters)
    for (let index = 0; index < queryParameters?.split("&").length; index++) {
      const array = queryParameters?.split("&");
      const element = array[index]?.split("=");

      if (element?.[0] === "projectId") projectId = element[1] as string;
      if (element?.[0] === "page" && Number(element[1]))
        page = Number(element[1]);
      if (element?.[0] === "page_size" && Number(element[1]))
        page_size = Number(element[1]);
    }

  if (!projectId)
    return report({
      message: "Error occured",
      data: "Please pass in the project Id you want to see the milestones for",
    });

  return report({
    message: `Project's Milestones`,
    data: {
      count: milestones?.[projectId]?.length || 0,
      rewards: Object.values(milestones?.[projectId] || []).filter(
        (_, index) => index * page < page_size && index + 1 >= page
      ),
    },
  });
}
