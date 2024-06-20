function Skeleton() {
  return (
    <div
      className={`xl:w-[300px] cursor-pointer animate-pulse relative bg-white/5 xl:h-[350px] 2xl:w-[300px] 2xl:h-[350px] lg:w-[300px] lg:h-[350px] md:w-[300px] px-3 py-2 md:h-[350px] w-[300px] h-[300px] rounded-lg`}
    >
      <div className={`w-[270px] h-[200px] block mx-auto bg-neutral-800/40 rounded-[6px]`} />
      <p className={`text-[18px] font-[600] animate-pulse bg-neutral-800/40 w-full h-[6px]`}></p>
      <p className={`w-[97%] h-[20px] break-words italic text-[10px] bg-neutral-800/40 font-thin`}></p>
      <p className={`absolute bottom-0 right-1 text-[16px] font-bold bg-neutral-800/40 w-[5px]`}></p>
    </div>
  );
}

export default Skeleton;
