"use client";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ABI from "../ABI/abi.json";
import { notification } from "../utils/scaffold-eth/notification";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { TokenboundClient } from "@tokenbound/sdk";
import { IoCloseOutline } from "react-icons/io5";
import { encodeFunctionData } from "viem";
import { gnosis } from "viem/chains";
import { useWalletClient } from "wagmi";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { Token } from "~~/actions/m3ters";
import { PublicClient } from "~~/config/clients";

interface PopoverProps {
  children: React.ReactNode;
  token: Token;
  contractId: string;
  tariff: any;
}
function Popover({ children, token, contractId: _contractId, tariff: _tariff }: PopoverProps) {
  const [tokenBoundAccount, setTokenBoundAccount] = useState("");
  const [open, setOpen] = useState(false);

  const [tariff, setTariff] = useState(_tariff);
  const [contractId, setContractId] = useState(_contractId);

  const { data: walletClient } = useWalletClient();

  const tokenBoundClient = useMemo(() => {
    return new TokenboundClient({
      walletClient: walletClient as any,
      chainId: gnosis.id,
    });
  }, [walletClient]);

  useEffect(() => {
    (async () => {
      const _tokenBoundAccount = await PublicClient.readContract({
        functionName: "m3terAccount",
        abi: ABI,
        address: "0x2b3997D82C836bd33C89e20fBaEF96CA99F1B24A",
        args: [token.id],
      });
      setTokenBoundAccount(_tokenBoundAccount as string);
    })();
  }, [tokenBoundClient, token.id]);

  const handleClick = async () => {
    const loading = notification.loading(<p>Executing transaction</p>);
    try {
      if (contractId) {
        const encodedSetContractIdFuctionData = encodeFunctionData({
          abi: ABI,
          functionName: "_setContractId",
          args: [token.id, contractId],
        });
        const txhash = await tokenBoundClient.execute({
          account: tokenBoundAccount as `0x${string}`,
          to: "0x2b3997D82C836bd33C89e20fBaEF96CA99F1B24A",
          value: BigInt(0),
          data: encodedSetContractIdFuctionData,
        });

        const reciept = await PublicClient.waitForTransactionReceipt({
          hash: txhash,
        });

        if (reciept.status === "reverted") {
          throw Error("Tx reverted");
        }
        notification.remove(loading);
        notification.success(<p className={`text-green-500`}>Transaction Successfull</p>);
        setOpen(false);
        setContractId("");
      }
      if(tariff && _tariff !== tariff) {
        const encodedSetTariffFuctionData = encodeFunctionData({
          abi: ABI,
          functionName: "_setTariff",
          args: [token.id, tariff],
        });
        const tariffHash = await tokenBoundClient.execute({
          account: tokenBoundAccount as `0x${string}`,
          to: "0x2b3997D82C836bd33C89e20fBaEF96CA99F1B24A",
          value: BigInt(0),
          data: encodedSetTariffFuctionData,
        });

        const reciept = await PublicClient.waitForTransactionReceipt({
          hash: tariffHash,
        });

        if (reciept.status === "reverted") {
          throw Error("tariff change transaction reverted");
        }
        notification.success(<p className={`text-green-500`}>Tariff updated Successfully</p>);
      }
    } catch (e) {
      notification.remove(loading);
      notification.error(<p className={`text-red-500`}>Transaction Failed</p>);
      console.error("failed tx:", e);
      // throw e;
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if(name === 'tariff') setTariff(value);
    if (name === 'contractId') setContractId(value);
  };
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-neutral-900/90 backdrop-filter backdrop-blur data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content
          className="data-[state=open]:animate-contentShow space-y-3 fixed top-[50%] left-[50%] max-h-[85vh] lg:h-[430px] md:h-[420px] h-[400px] lg:w-[400px] md:w-[350px] w-[300px] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] 
          shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
          style={{ backgroundImage: `linear-gradient(to bottom, ${token.attributes[3].value}, #00000066 50%)` }}
        >
          <AlertDialog.Title className="dark:text-white text-white m-0 text-[16px] font-semibold text-center">
            Set the Arweave ContractId for M3ter #{Number(token.id)}
          </AlertDialog.Title>
          <AlertDialog.Cancel asChild>
            <button
              type="button"
              className={`w-[25px] outline-none float-end h-[25px] absolute top-0 right-2 flex justify-center items-center rounded-full bg-white`}
            >
              <IoCloseOutline color="#000000" size={`22px`} />
            </button>
          </AlertDialog.Cancel>
          <div className={`space-y-3 h-full relative`}>
            <Image
              src={token.image}
              alt={token.name}
              className={`w-[200px] block mx-auto h-[200px] rounded-[6px]`}
              width={200}
              height={200}
            />

            <div className={`flex items-center w-full justify-start pb-3`}>
              <div className={`relative w-[90%] h-[35px]`}>
                <input
                  name="contractId"
                  type="text"
                  onChange={handleChange}
                  value={contractId}
                  // defaultValue={contractId}
                  className={`w-full block mx-auto outline-none peer placeholder:text-transparent text-white border-b border-neutral-300 bg-transparent px-2 h-[35px]`}
                  placeholder="Enter your contract ID"
                />
                <label
                  htmlFor="contractId"
                  className="absolute left-0 top-0 ml-1 px-1 -translate-y-3 text-white/60 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 font-light peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm"
                >
                  ContractId
                </label>
              </div>
              <Link
                href={`https://arscan.io/contract/${contractId}`}
                target="_blank"
                className={`text-green-500 float-end hover:underline items-center flex font-semibold `}
              >
                <ArrowTopRightOnSquareIcon width={20} height={20} />
              </Link>
            </div>
            <div className={`flex items-center w-full justify-start`}>
              <div className={`relative w-[90%] h-[35px]`}>
                <input
                  name="tariff"
                  type="number"
                  onChange={handleChange}
                  value={tariff}
                  // defaultValue={contractId}
                  className={`w-full block mx-auto outline-none peer placeholder:text-transparent text-white border-b border-neutral-300 bg-transparent px-2 h-[35px]`}
                  placeholder="Enter your contract ID"
                />
                <label
                  htmlFor="tariff"
                  className="absolute left-0 top-0 ml-1 px-1 -translate-y-3 text-white/60 text-sm duration-100 ease-linear peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:ml-1 font-light peer-focus:-translate-y-3 peer-focus:px-1 peer-focus:text-sm"
                >
                  Tariff
                </label>
              </div>
            </div>
            <button
              disabled={!contractId && !tariff}
              onClick={handleClick}
              type="button"
              className={`bg-[#385183] h-[35px] flex hover:opacity-[0.7] text-white disabled:opacity-[0.5] justify-center items-center w-[120px] rounded-[6px] mx-auto`}
            >
              Set
            </button>

            {/* <p className={`absolute top-1 right-1 font-extrabold text-[17px]`}>#{Number(token.id)}</p> */}
          </div>

          <AlertDialog.Action />
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default Popover;
