import { projects } from "../../state";
import { report } from "../../utils";

export default function getProject(queryParameters?: string) {
  console.log("Query parameters ==>>", queryParameters);
  let id: string | undefined = undefined;

  if (!queryParameters)
    return report({
      message: "Error occured",
      data: "Please pass in the projects's id",
    });

  for (let index = 0; index < queryParameters?.split("&").length; index++) {
    const array = queryParameters?.split("&");
    const element = array[index]?.split("=");

    if (element?.[0] === "id") id = element[1] as string;
  }

  if (id)
    return report({
      message: "Project with this id",
      data: projects?.[id] || {},
    });
}
