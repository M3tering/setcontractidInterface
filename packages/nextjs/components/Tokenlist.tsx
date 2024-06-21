import Card from "./Card";
import { Token } from "~~/actions/m3ters";

function Tokenlist({ tokens }: { tokens: Token[] }) {
  return (
    <div className="grid lg:grid-cols-4 gap-y-2 md:grid-cols-3 grid-cols-1 w-full pt-10 px-[20px]">
      {tokens.map((item, index) => (
        <Card key={index} token={item} />
      ))}
    </div>
  );
}

export default Tokenlist;
