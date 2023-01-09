import Link from "next/link";
import { useState } from "react";

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  console.log(open);

  return (
    <div className="hidden">
      <div className="space-y-2" onClick={() => setOpen(!open)}>
        <div className="h-0.5 w-8 bg-gray-600" />
        <div className="h-0.5 w-8 bg-gray-600" />
        <div className="h-0.5 w-8 bg-gray-600" />
      </div>
      <div className={`burger-menu__content ${open ? "open" : ""}`}>
        <div className="burger-menu__content__inner">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About </Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
