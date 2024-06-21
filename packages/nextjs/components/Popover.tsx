"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import ABI from "../ABI/abi.json";
import { notification } from "../utils/scaffold-eth/notification";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { TokenboundClient } from "@tokenbound/sdk";
import { IoCloseOutline } from "react-icons/io5";
import { createWalletClient, custom, http } from "viem";
import { encodeFunctionData } from "viem";
import { gnosis } from "viem/chains";
import { Token } from "~~/actions/m3ters";
import { PublicClient } from "~~/config/clients";

interface PopoverProps {
  children: React.ReactNode;
  token: Token;
}
function Popover({ children, token }: PopoverProps) {
  const [tokenBoundAccount, setTokenBoundAccount] = useState("");
  const [open, setOpen] = useState(false);
  const [contractId, setContractId] = useState("");
  const walletClient = useMemo(
    () =>
      createWalletClient({
        chain: gnosis,
        transport: window.ethereum ? custom(window.ethereum) : http(),
      }),
    [],
  );
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
  useEffect(() => {
    (async () => {
      try {
        const _contractId = await PublicClient.readContract({
          functionName: "contractByToken",
          address: "0x2b3997D82C836bd33C89e20fBaEF96CA99F1B24A",
          abi: ABI,
          args: [token.id],
        });
        console.log(_contractId);
        setContractId(_contractId as string);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [token.id]);

  //encode _setcontractId function
  const encodedSetContractIdFuctionData = encodeFunctionData({
    abi: ABI,
    functionName: "_setContractId",
    args: [token.id, contractId],
  });

  const handleClick = async () => {
    try {
      notification.loading(<p>Executing transaction</p>, {
        position: "top-center",
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
        notification.error(<p className={`text-red-500`}>Transaction Failed</p>, {
          duration: 10,
        });
        throw Error("Tx reverted");
      }

      notification.success(<p className={`text-green-500`}>Transaction Successfull</p>);
      setOpen(false);
      setContractId("");
    } catch (e) {
      console.error(e);
      // throw e;
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContractId(value);
  };
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-neutral-900/90 backdrop-filter backdrop-blur data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow space-y-3 fixed top-[50%] dark:bg-neutral-800 bg-white left-[50%] max-h-[85vh] lg:h-[430px] md:h-[420px] h-[400px] lg:w-[400px] md:w-[350px] w-[300px] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="dark:text-white text-black m-0 text-[17px] font-bold text-center">
            Action
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
            <label htmlFor="contractId" className={`w-[90%] block mx-auto`}>
              ContractID
            </label>
            <input
              name="contractId"
              type="text"
              onChange={handleChange}
              value={contractId}
              // defaultValue={contractId}
              className={`w-[90%] block mx-auto outline-none text-black dark:border-0 border px-2 bg-white h-[40px] rounded-[6px]`}
              placeholder="Enter your contract ID"
            />
            <button
              disabled={!contractId}
              onClick={handleClick}
              type="button"
              className={`bg-[#385183] h-[35px] flex hover:opacity-[0.7] disabled:opacity-[0.5] justify-center items-center w-[120px] rounded-[6px] mx-auto`}
            >
              Set Contract ID
            </button>
            <p className={`absolute top-1 right-1 font-extrabold text-[17px]`}>#{Number(token.id)}</p>
          </div>

          <AlertDialog.Action />
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default Popover;
