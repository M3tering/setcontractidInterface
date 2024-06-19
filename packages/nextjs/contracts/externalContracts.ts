import ABI from "../ABI/abi.json";
import M3terABI from "../ABI/m3ter.json";
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

/**
 * @example
 * const externalContracts = {
 *   1: {
 *     XDAI: {
 *       address: "0x...",
 *       abi: [...],
 *     },
 *   },
 * } as const;
 */
const externalContracts = {
  1: {
    M3ter: {
      address: "0x39fb420Bd583cCC8Afd1A1eAce2907fe300ABD02",
      abi: M3terABI as any,
    },
  },
  2: {
    Protocol: {
      address: "0x2b3997D82C836bd33C89e20fBaEF96CA99F1B24A",
      abi: ABI as any,
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
