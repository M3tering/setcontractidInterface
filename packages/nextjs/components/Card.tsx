"use client";

import { useEffect, useState } from "react";
import ABI from "../ABI/abi.json";
import Popover from "./Popover";
import { Token } from "~~/actions/m3ters";
import { PublicClient } from "~~/config/clients";

function Card({ token }: { token: Token }) {
  const [contractId, setContractId] = useState("");
  const [tariff, setTariff] = useState<any>()
  useEffect(() => {
    (async () => {
      try {
        const _contractId = await PublicClient.readContract({
          functionName: "contractByToken",
          address: "0x2b3997D82C836bd33C89e20fBaEF96CA99F1B24A",
          abi: ABI,
          args: [token.id],
        });
        const tariff = await PublicClient.readContract({
          functionName: "tariffOf",
          address: "0x2b3997D82C836bd33C89e20fBaEF96CA99F1B24A",
          abi: ABI,
          args: [token.id]
        })
        console.log(_contractId, tariff);
        setContractId(_contractId as string);
        setTariff(tariff)
      } catch (e) {
        console.error(e);
      }
    })();
  }, [token.id]);

  if (token.id && tariff) 
    return (
      <Popover token={token} contractId={contractId} tariff={tariff}>
        <div
          style={{ backgroundImage: `linear-gradient(to bottom, ${token.attributes[3].value}, #000000cc 50%)` }}
          className={`block mx-auto cursor-pointer space-y-2  xl:h-[400px] shadow-2xl xl:w-[300px] 2xl:w-[300px] 2xl:h-[400px] lg:w-[300px] lg:h-[400px] md:w-[300px] p-3 md:h-[400px] w-[300px] h-[400px] rounded-lg`}
        >
          {token.image && <img src={token.image} alt="nft" width={270} className={`w-[270px] block mx-auto`} />}
          <p className={`text-[18px] font-[600] dark:text-white text-white capitalize text-center`}>{token.name}</p>
          <div className={`flex justify-end w-full items-center !mt-[40px] h-[40px]`}>
            <p className={`text-[16px] text-white font-bold`}>#{Number(token.id)}</p>
          </div>
        </div>
      </Popover>
    );
  else return <div>Loading ...</div>
}

export default Card;
