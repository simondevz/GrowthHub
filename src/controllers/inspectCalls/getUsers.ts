import { userCounter, users } from "../../state";
import { report } from "../../utils";

export default function getUsers(queryParameters?: string) {
  console.log("Query parameters ==>>", queryParameters);
  let page = 1;
  let page_size = 50;

  if (queryParameters)
    for (let index = 0; index < queryParameters?.split("&").length; index++) {
      const array = queryParameters?.split("&");
      const element = array[index]?.split("=");
      if (element?.[0] === "page" && Number(element[1]))
        page = Number(element[1]);
      if (element?.[0] === "page_size" && Number(element[1]))
        page_size = Number(element[1]);
    }

  return report({
    message: "Registered Users",
    data: {
      total_count: userCounter.value,
      users: Object.values(users).filter(
        (_, index) => index * page < page_size && index + 1 >= page
      ),
    },
  });
}
