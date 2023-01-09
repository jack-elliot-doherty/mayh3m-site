import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";

const Nav = () => {
  const { data: sessionData } = useSession();

  return (
    <nav
      className="font-mono relative flex h-16 items-center justify-between bg-white text-xs text-black"
      role="navigation"
    >
      <BurgerMenu />

      <div className="flex justify-center">
        <Link href="/" className="pl-8">
          <img
            alt="Mayh3m logo"
            title="Mayh3m logo"
            className="h-8"
            src="/static/img/logo.png"
          ></img>
        </Link>
        {/* home should be next to the logo */}
        <Link
          href="/"
          className="my-auto hidden pl-8 hover:opacity-50 md:block lg:block"
        >
          HOME
        </Link>
        {sessionData && sessionData.user?.role === "ADMIN" && (
          <Link
            href="/admin/applications"
            className="my-auto hidden pl-8 hover:opacity-50 md:block lg:block"
          >
            ADMIN
          </Link>
        )}
      </div>
      <div className="flex">
        {sessionData && sessionData.user?.role === "admin" && (
          <Link href="/admin/applicants" className="pr-8">
            Applicants
          </Link>
        )}
        {sessionData ? (
          <>
            <Link
              href="/account"
              className="my-auto mr-8 hidden pl-8 hover:opacity-50 md:block lg:block"
            >
              ACCOUNT
            </Link>
            <button
              type="button"
              onClick={() => {
                signOut();
              }}
              className="min-w-[5.6rem] pr-8 hover:opacity-50"
            >
              SIGN OUT
            </button>
          </>
        ) : (
          <button
            type="button"
            className="min-w-[5.6rem] pr-8 hover:opacity-50"
            onClick={() => signIn()}
          >
            SIGN IN{" "}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
