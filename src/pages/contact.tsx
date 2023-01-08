import Layout from "../components/layout";
import { NextPageWithLayout } from "./_app";

const Contact = () => {
  return (
    <div className="m-10 w-3/4 max-w-md text-center sm:w-1/2">
      <p className="text-xl font-bold">CONTACT US</p>
      <p className="mt-3 text-sm font-semibold">WE ARE HERE TO HELP YOU.</p>

      <div className="mt-4">
        <form method="post" action="/api/auth/signin/email">
          <div>
            <div>
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Contact.getLayout = function getLayout(page: NextPageWithLayout) {
  return <Layout>{page}</Layout>;
};

export default Contact;
