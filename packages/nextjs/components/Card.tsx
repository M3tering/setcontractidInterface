import Popover from "./Popover";
import { Token } from "~~/actions/m3ters";

function Card({ token }: { token: Token }) {
  return (
    <Popover token={token}>
      <div
        className={`block mx-auto cursor-pointer relative space-y-2 bg-black/80 dark:bg-neutral-900/70 xl:h-[400px] xl:w-[300px] 2xl:w-[300px] 2xl:h-[400px] lg:w-[300px] lg:h-[400px] md:w-[300px] p-3 md:h-[400px] w-[300px] h-[400px] rounded-lg`}
      >
        {token.image && <img src={token.image} alt="nft" width={270} className={`w-[270px]  block mx-auto`} />}
        <p className={`text-[18px] font-[600] dark:text-white text-white`}>{token.name}</p>
        <p className={`absolute bottom-0 right-3 text-[16px] text-white font-bold`}>#{Number(token.id)}</p>
      </div>
    </Popover>
  );
}

export default Card;
