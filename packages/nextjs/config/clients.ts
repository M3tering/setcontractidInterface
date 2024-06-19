import { createPublicClient, http } from "viem";
import { gnosis } from "viem/chains";

export const PublicClient = createPublicClient({
  chain: gnosis,
  transport: http(),
});
