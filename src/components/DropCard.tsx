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
    <Link key={drop.id} href={`/drop/${drop.id}`}>
      <div className="rounded-lg border text-center shadow-md">
        <img src={drop.image}></img>
        <p>{drop.name}</p>
        <p>{drop.description}</p>
      </div>
    </Link>
  );
};

export default DropCard;
