import Image from "next/image";
import Popover from "./Popover";
import { Token } from "~~/actions/m3ters";

function Card({ token }: { token: Token }) {
  return (
    <Popover token={token}>
      <div
        className={`block mx-auto cursor-pointer relative space-y-2 bg-black/80 dark:bg-neutral-900/70 xl:h-[330px] xl:w-[300px] 2xl:w-[300px] 2xl:h-[330px] lg:w-[300px] lg:h-[330px] md:w-[300px] p-3 md:h-[330px] w-[300px] h-[330px] rounded-lg`}
      >
        {token.image && (
          <Image src={token.image} alt="nft" width={270} height={200} className={`w-[270px] h-[200px] block mx-auto`} />
        )}
        <p className={`text-[18px] font-[600] dark:text-white text-white`}>{token.name}</p>
        <p className={`w-[97%] break-words italic text-[12px] font-thin text-slate-400 dark:text-neutral-400`}>
          {token.description}
        </p>
        <p className={`absolute bottom-0 right-3 text-[16px] text-white font-bold`}>#{Number(token.id)}</p>
      </div>
    </Popover>
  );
}

export default Card;
