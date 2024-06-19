"use client";

import { useEffect, useState } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { TokenboundClient } from "@tokenbound/sdk";
import { createWalletClient, custom, http } from "viem";
import { gnosis } from "viem/chains";
import { Token } from "~~/actions/m3ters";

interface PopoverProps {
  children: React.ReactNode;
  token: Token;
}
function Popover({ children, token }: PopoverProps) {
  const [tokenBoundAccount, setTokenBoundAccount] = useState("");
  const walletClient = createWalletClient({
    chain: gnosis,
    transport: window.ethereum ? custom(window.ethereum) : http(),
  });

  const tokenBoundClient = new TokenboundClient({
    walletClient: walletClient as any,
    chainId: gnosis.id,
  });
  useEffect(() => {
    (async () => {
      const _tokenBoundAccount = tokenBoundClient.getAccount({
        tokenContract: "0x2b3997D82C836bd33C89e20fBaEF96CA99F1B24A",
        tokenId: String(token.id),
      });
      setTokenBoundAccount(_tokenBoundAccount);
    })();
  }, [tokenBoundClient, token.id]);

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-neutral-900/90 backdrop-filter backdrop-blur data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow space-y-3 fixed top-[50%] dark:bg-neutral-800 bg-white left-[50%] max-h-[85vh] h-[230px] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="dark:text-white text-black m-0 text-[17px] font-bold text-center">
            Action
          </AlertDialog.Title>

          <div className={`space-y-3`}>
            <label htmlFor="contractId" className={`w-[90%] block mx-auto`}>
              ContractID
            </label>
            <input
              name="contractId"
              type="text"
              value={tokenBoundAccount}
              className={`w-[90%] block mx-auto outline-none text-black dark:border-0 border ps-2 bg-white h-[40px] rounded-[6px]`}
              placeholder="Enter your contract ID"
            />
            <button className={`bg-indigo-400 h-[35px] flex justify-center items-center w-[120px] rounded-lg mx-auto`}>
              Set Contract ID
            </button>
          </div>

          <AlertDialog.Action />
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default Popover;
