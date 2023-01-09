import Layout from "../components/layout";
import UserAccountSideNav from "../components/UserAccountSideNav";
import { NextPageWithLayout } from "./_app";

const Contact = () => {
  return (
    <>
      <p className="font-bold">CONTACT US</p>

      <div className="w-full md:flex">
        <UserAccountSideNav />
        <div className="w-full max-w-5xl px-10 text-center">
          <form
            method="post"
            className="grid grid-cols-1 gap-2"
            action="mailto:youcangetjackgmail.com"
          >
            <input
              className="w-full border p-3 text-xs focus:outline-none"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
            />

            <input
              className="w-full border p-3 text-xs focus:outline-none"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
            />

            <textarea
              className="w-full border p-3 text-xs focus:outline-none"
              id="message"
              name="message"
              placeholder="Message"
            ></textarea>

            <button
              className="w-full bg-black p-3 text-xs font-semibold text-white"
              type="submit"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

Contact.getLayout = function getLayout(page: NextPageWithLayout) {
  return <Layout>{page}</Layout>;
};

export default Contact;
