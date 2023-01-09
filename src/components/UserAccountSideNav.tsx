import { signOut } from "next-auth/react";
import Link from "next/link";

const UserAccountSideNav = () => {
  return (
    <nav className="min-h-fit min-w-[15rem] text-left text-xs">
      <ul className="list-none">
        <li className="my-2 border-b border-black pb-2">
          <Link href="/">
            <span className="hover:opacity-50">HOME</span>
          </Link>
        </li>
        <li className="my-2 border-b border-black pb-2">
          <Link href="/account">
            <span className="hover:opacity-50">DASHBOARD</span>
          </Link>
        </li>
        <li className="my-2 border-b border-black pb-2">
          <Link href="/contact">
            <span className="hover:opacity-50">CONTACT US</span>
          </Link>
        </li>
        <li className="my-2 border-b border-black pb-2">
          <button onClick={() => signOut()} className="hover:opacity-50">
            SIGN OUT
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default UserAccountSideNav;
