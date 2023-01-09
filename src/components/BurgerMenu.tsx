import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  console.log(open);

  return (
    <div className="visible p-3 md:hidden lg:hidden">
      <button
        className="my-auto h-full space-y-1 py-2 pl-4 hover:opacity-50"
        onClick={() => setOpen(!open)}
      >
        <FaBars className="h-4 w-4" />
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
