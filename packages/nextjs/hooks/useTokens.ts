import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Token, fetchTokens } from "~~/actions/m3ters";

function useTokens() {
  const [tokens, setTokens] = useState<Token[] | undefined>(undefined);
  const { address: connectedAddress } = useAccount();
  useEffect(() => {
    if (connectedAddress) {
      (async () => {
        const tokens = await fetchTokens({
          user: connectedAddress, //"0xDC2a4bF46Ef158f86274C02Bd7f027f31Da9EbC1"
        });
        console.log("tokens", tokens);
        setTokens(tokens);
      })();
    }
  }, [connectedAddress]);
  return tokens;
}

export default useTokens;
