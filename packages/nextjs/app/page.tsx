"use client";

import type { NextPage } from "next";
import Card from "~~/components/Card";
import Skeleton from "~~/components/Skeleton";
import useTokens from "~~/hooks/useTokens";

const Home: NextPage = () => {
  const tokens = useTokens();

  return (
    <>
      <div className="grid lg:grid-cols-4 gap-y-2 md:grid-cols-3 grid-cols-1 w-full pt-10 px-[20px]">
        {tokens ? (
          tokens.map((item, index) => <Card key={index} token={item} />)
        ) : (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
