"use client";

import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Token, fetchTokens } from "~~/actions/m3ters";
import Card from "~~/components/Card";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [tokens, setTokens] = useState<Token[] | undefined>(undefined);
  useEffect(() => {
    if (connectedAddress) {
      (async () => {
        const tokens = await fetchTokens({
          user: "0xDC2a4bF46Ef158f86274C02Bd7f027f31Da9EbC1",
        });
        console.log("tokens", tokens);
        setTokens(tokens);
      })();
    }
  }, [connectedAddress]);

  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 w-full pt-10 px-[20px]">
        {tokens && tokens.map((item, index) => <Card key={index} token={item} />)}
      </div>
    </>
  );
};

export default Home;
