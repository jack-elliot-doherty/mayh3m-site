import Image from "next/image";
import Link from "next/link";
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
      <Image
        width={500}
        height={500}
        alt="drop preview image"
        className="m-auto"
        src={drop.image}
      ></Image>
      <p className="mt-5 text-2xl font-bold">{drop.name}</p>
    </Link>
  );
};

export default DropCard;
