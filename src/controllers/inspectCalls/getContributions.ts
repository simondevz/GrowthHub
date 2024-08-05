// Projects the user is contributing to

import { Address } from "viem";
import { contributorTo } from "../../state";
import { report } from "../../utils";

export default function getContributions(queryParameters?: string) {
  console.log("Query parameters ==>>", queryParameters);
  let page = 1;
  let page_size = 50;
  let address: Address | undefined = undefined;

  if (queryParameters)
    for (let index = 0; index < queryParameters?.split("&").length; index++) {
      const array = queryParameters?.split("&");
      const element = array[index]?.split("=");

      if (element?.[0] === "address") address = element[1] as Address;
      if (element?.[0] === "page" && Number(element[1]))
        page = Number(element[1]);
      if (element?.[0] === "page_size" && Number(element[1]))
        page_size = Number(element[1]);
    }

  if (!address)
    return report({
      message: "Error occured",
      data: "Please pass in the address of the user you want to see the projects the user has contributed to",
    });

  return report({
    message: `Projects Contributed To`,
    data: {
      count: contributorTo?.[address]?.length || 0,
      projects: Object.values(contributorTo?.[address] || []).filter(
        (_, index) => index * page < page_size && index + 1 >= page
      ),
    },
  });
}
