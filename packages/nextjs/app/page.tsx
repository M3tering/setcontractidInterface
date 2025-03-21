"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import NotConnected from "~~/components/NotConnected";
import Skeleton from "~~/components/Skeleton";
import Tokenlist from "~~/components/Tokenlist";
import useTokens from "~~/hooks/useTokens";

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const tokens = useTokens();
  if (isConnected) {
    if (tokens && tokens.length > 0) {
      return <Tokenlist tokens={tokens} />;
    } else
      return (
        <div>Loading ....</div>
      );
  } else return <NotConnected />;
};

export default Home;
