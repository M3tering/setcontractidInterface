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
    if (tokens) {
      return <Tokenlist tokens={tokens} />;
    } else
      return (
        <div className="grid lg:grid-cols-4 gap-y-2 md:grid-cols-3 grid-cols-1 w-full h-full pt-10 px-[20px]">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      );
  } else return <NotConnected />;
};

export default Home;
