import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";

const Nav = () => {
  const { data: sessionData } = useSession();

  return (
    <nav
      className="font-mono relative flex h-16 items-center justify-between bg-white text-xs text-black"
      role="navigation"
    >
      <div className="flex justify-center">
        <Link href="/" className="pl-8 hover:opacity-50">
          <img
            alt="Mayh3m logo"
            title="Mayh3m logo"
            className="h-8"
            src="/static/img/logo.png"
          ></img>
        </Link>
        {/* home should be next to the logo */}
        <Link href="/" className="my-auto pl-8 hover:opacity-50">
          HOME
        </Link>
      </div>
      <div className="flex">
        {sessionData && sessionData.user?.role === "admin" && (
          <Link href="/admin/applicants" className="pr-8">
            Applicants
          </Link>
        )}
        {sessionData ? (
          <button
            type="button"
            onClick={() => {
              signOut();
            }}
            className="pr-8 hover:opacity-50"
          >
            SIGN OUT
          </button>
        ) : (
          <button
            type="button"
            className="pr-8 hover:opacity-50"
            onClick={() => signIn()}
          >
            SIGN IN
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
