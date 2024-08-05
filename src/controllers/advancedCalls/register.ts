import { Address } from "viem";
import { addressToId, userCounter, usernameToId, users } from "../../state";
import { notice, report } from "../../utils";

export default function register({
  username,
  address,
}: {
  username: string;
  address: Address;
}) {
  if (usernameToId.has(username) || addressToId.has(address)) {
    return report({
      message: "Error Occured",
      data: {
        error: "Username or address already registered",
      },
    });
  }

  const id = userCounter.value.toString();
  users[id] = {
    id,
    username,
    address,
  };

  userCounter.value++;
  usernameToId.set(username, id);
  addressToId.set(address, id);
  return notice({ message: "User created", data: { user: users[id] } });
}
