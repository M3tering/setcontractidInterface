function Skeleton() {
  return (
    <div
      className={`block mx-auto cursor-pointer relative space-y-2 bg-white/5 xl:h-[400px] xl:w-[300px] 2xl:w-[300px] 2xl:h-[400px] lg:w-[300px] lg:h-[400px] md:w-[300px] p-3 md:h-[400px] w-[300px] h-[400px] rounded-lg`}
    >
      <div className={`w-[270px] h-[270px] block mx-auto bg-neutral-800/40 rounded-[6px]`} />
      <p className={`text-[18px] font-[600] animate-pulse bg-neutral-800/40 w-full h-[6px]`}></p>

      <p className={`absolute bottom-2 right-1 text-[16px] font-bold bg-neutral-800/40`}></p>
    </div>
  );
}

export default Skeleton;
