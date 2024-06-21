import { IoWalletOutline } from "react-icons/io5";

function NotConnected() {
  return (
    <div className={`flex w-full h-[90vh] items-center justify-center `}>
      <div className={`w-[300px] block mx-auto`}>
        <IoWalletOutline size={`100px`} className={`block mx-auto`} />
        <p className={`text-[25px] w-[150px] block mx-auto break-words text-center italic font-bold`}>
          Connect your wallet
        </p>
      </div>
    </div>
  );
}

export default NotConnected;
