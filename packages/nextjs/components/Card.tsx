import Image from "next/image";
import Popover from "./Popover";
import { Token } from "~~/actions/m3ters";

function Card({ token }: { token: Token }) {
  return (
    <Popover token={token}>
      <div
        className={`xl:w-[300px] cursor-pointer relative bg-neutral-900/50 xl:h-[350px] 2xl:w-[300px] 2xl:h-[350px] lg:w-[300px] lg:h-[350px] md:w-[300px] px-3 md:h-[350px] w-[300px] h-[300px] rounded-lg`}
      >
        {token.image && (
          <Image src={token.image} alt="nft" width={270} height={200} className={`w-[270px] h-[200px] block mx-auto`} />
        )}
        <p className={`text-[18px] font-[600]`}>{token.name}</p>
        <p className={`w-[97%] break-words italic text-[10px] font-thin text-neutral-400`}>{token.description}</p>
        <p className={`absolute bottom-0 right-1 text-[16px] font-bold`}>#{Number(token.id)}</p>
      </div>
    </Popover>
  );
}

export default Card;
