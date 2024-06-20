function Skeleton() {
  return (
    <div
      className={`xl:w-[300px] cursor-pointer animate-pulse relative bg-neutral-900/50 xl:h-[350px] 2xl:w-[300px] 2xl:h-[350px] lg:w-[300px] lg:h-[350px] md:w-[300px] px-3 md:h-[350px] w-[300px] h-[300px] rounded-lg`}
    >
      <div className={`w-[270px] h-[200px] block mx-auto bg-slate-700`} />
      <p className={`text-[18px] font-[600] bg-slate-700`}></p>
      <p className={`w-[97%] h-[20px] break-words italic text-[10px] bg-slate-700 font-thin text-neutral-400`}></p>
      <p className={`absolute bottom-0 right-1 text-[16px] font-bold bg-slate-700`}></p>
    </div>
  );
}

export default Skeleton;
