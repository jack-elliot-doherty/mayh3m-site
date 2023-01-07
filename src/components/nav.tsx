import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";

const Nav = () => {
  const { data: sessionData } = useSession();
  console;
  return (
    <nav
      className="font-mono relative flex h-16 items-center justify-between bg-white text-xs text-black"
      role="navigation"
    >
      <div className="flex justify-center">
        <a href="/" className="pl-8 hover:opacity-50">
          <img
            alt="Mayh3m logo"
            title="Mayh3m logo"
            className="h-8"
            src="/static/img/logo.png"
          ></img>
        </a>
        {/* home should be next to the logo */}
        <a href="/" className="my-auto pl-8 hover:opacity-50">
          HOME
        </a>
      </div>
      <div className="flex">
        {sessionData && sessionData.user?.role === "admin" && (
          <a href="/admin/applicants" className="pr-8">
            Applicants
          </a>
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
