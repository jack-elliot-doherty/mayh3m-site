import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { BiX } from "react-icons/bi";

const BurgerMenu = () => {
  const { data: sessionData } = useSession();
  const [open, setOpen] = useState(false);
  console.log(open);

  return (
    <div className="visible p-3 md:hidden lg:hidden">
      <div
        className="my-auto h-full space-y-1 py-2 pl-4 hover:opacity-50"
        onClick={() => setOpen(!open)}
      >
        <FaBars className="h-4 w-4" />
      </div>
      <div
        className={`fixed top-0 left-0 z-10 h-full flex-none overflow-x-hidden bg-zinc-800 pt-14 text-lg text-white transition-all duration-500 ${
          open ? "w-80" : "w-0"
        } `}
      >
        <div
          className="absolute top-2 right-0 ml-12 text-5xl  text-gray-400"
          onClick={() => setOpen(false)}
        >
          <BiX className="h-9" />
        </div>
        <div className="space-y-3 p-4 text-xs">
          <Link
            onClick={() => {
              setOpen(false);
            }}
            href="/"
          >
            <div className=" mb-2 border-b pb-1 hover:opacity-50">HOME</div>
          </Link>
          {sessionData && sessionData.user?.role === "ADMIN" && (
            <Link
              onClick={() => {
                setOpen(false);
              }}
              href="/admin/applications"
            >
              <div className="mb-2 border-b pb-1 hover:opacity-50">ADMIN</div>
            </Link>
          )}
          {sessionData && (
            <Link
              onClick={() => {
                setOpen(false);
              }}
              href="/account"
            >
              <div className="mb-2 border-b pb-1 hover:opacity-50">ACCOUNT</div>
            </Link>
          )}
          <Link
            onClick={() => {
              setOpen(false);
            }}
            href="/contact"
          >
            <div className="mb-2 border-b pb-1 hover:opacity-50">CONTACT</div>
          </Link>

          {sessionData ? (
            <div
              onClick={() => {
                signOut();
              }}
              className="w-full cursor-pointer border-b pb-1 hover:opacity-50"
            >
              SIGN OUT
            </div>
          ) : (
            <div
              onClick={() => {
                signIn();
              }}
              className="w-full cursor-pointer border-b pb-1 hover:opacity-50"
            >
              SIGN IN
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
