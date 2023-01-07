import Link from "next/link";
import { type } from "os";
import React from "react";

type Drop = {
  id: string;
  name: string;
  description: string;
  image: string;
};
type dropCardProps = {
  drop: Drop;
};
const DropCard: React.FC<dropCardProps> = ({ drop }) => {
  return (
    <Link href={`/drop/${drop.id}`}>
      <div className="border pb-4 text-center shadow-lg hover:top-2 hover:shadow-xl">
        <img alt="drop preview image" src={drop.image}></img>
        <p className="font-bold">{drop.name}</p>
      </div>
    </Link>
  );
};

export default DropCard;
