import { Address } from "viem";
import { accomplishments } from "../../state";
import { report } from "../../utils";

export default function getAccomplishments(queryParameters?: string) {
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
      data: "Please pass in the user's address you want to see the accomplishments for",
    });

  return report({
    message: `Project's Rewards`,
    data: {
      count: accomplishments?.[address]?.length || 0,
      rewards: Object.values(accomplishments?.[address] || []).filter(
        (_, index) => index * page < page_size && index + 1 >= page
      ),
    },
  });
}
