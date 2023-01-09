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
      <button
        type="button"
        className="my-auto h-full space-y-1 py-2 pl-4 hover:opacity-50"
        onClick={() => setOpen(!open)}
      >
        <FaBars className="h-4 w-4" />
      </button>
      <div
        className={`fixed top-0 left-0 z-10 h-full flex-none overflow-x-hidden bg-zinc-800 pt-14 text-lg text-white transition-all duration-500 ${
          open ? "w-96" : "w-0"
        } `}
      >
        <button
          className="absolute top-2 right-4 ml-12 text-5xl  text-gray-400"
          type="button"
          onClick={() => setOpen(false)}
        >
          <BiX className="h-8" />
        </button>
        <div className="p-10  ">
          <div className=" hover:opacity-50">
            <Link href="/">HOME</Link>
          </div>
          {sessionData && sessionData.user?.role === "ADMIN" && (
            <div>
              <Link href="/admin/applications">ADMIN</Link>
            </div>
          )}
          <div>
            <Link href="/salads">ACCOUNT</Link>
          </div>
          <div>
            <Link href="/pizzas">CONTACT</Link>
          </div>

          <div>
            {sessionData ? (
              <button
                onClick={() => {
                  signOut();
                }}
              >
                SIGN OUT
              </button>
            ) : (
              <button
                onClick={() => {
                  signIn();
                }}
              >
                SIGN OUT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
