import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

const UserAccountSideNav = () => {
  const { data: sessionData } = useSession();
  return (
    <nav className="min-h-fit min-w-[15rem] text-left text-xs">
      <ul className="list-none">
        <li className="my-2 border-b border-black pb-2">
          <Link href="/">
            <span className="hover:opacity-50">HOME</span>
          </Link>
        </li>
        {sessionData && (
          <li className="my-2 border-b border-black pb-2">
            <Link href="/account">
              <span className="hover:opacity-50">DASHBOARD</span>
            </Link>
          </li>
        )}
        <li className="my-2 border-b border-black pb-2">
          <Link href="mailto:mayh3mbyf3z@gmail.com">
            <span className="hover:opacity-50">CONTACT US</span>
          </Link>
        </li>
        <li className="my-2 border-b border-black pb-2">
          {sessionData ? (
            <button onClick={() => signOut()} className="hover:opacity-50">
              SIGN OUT
            </button>
          ) : (
            <button onClick={() => signIn()} className="hover:opacity-50">
              SIGN IN
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default UserAccountSideNav;
