import Link from "next/link";
import { useState } from "react";

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  console.log(open);

  return (
    <div className="visible md:hidden lg:hidden">
      <button
        className="my-auto space-y-2 py-2 pl-2 hover:opacity-50"
        onClick={() => setOpen(!open)}
      >
        <div className="h-0.5 w-8 bg-gray-600" />
        <div className="h-0.5 w-8 bg-gray-600" />
        <div className="h-0.5 w-8 bg-gray-600" />
      </button>
      <div className={`burger-menu__content hidden ${open ? "open" : ""}`}>
        <div className="burger-menu__content__inner">
          <ul>
            <li>
              <Link href="/">HOME</Link>
            </li>
            <li>
              <Link href="/account">ACCOUNT </Link>
            </li>
            <li>
              <Link href="/contact">CONTACT</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
