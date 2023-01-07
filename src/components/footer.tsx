import React, { useState } from "react";
import { api } from "../utils/api";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import Link from "next/link";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

type FormData = {
  email: string;
};

const Footer = () => {
  const [showform, setShowForm] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const addNewsLetterSubsciber = api.newsletter.subscribe.useMutation();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    addNewsLetterSubsciber.mutate({ email: data.email });
    setSubscribed(true);
  });

  return (
    <footer className="flex justify-between p-6 text-xs">
      <div>
        <button
          type="button"
          onClick={() => {
            setShowForm(true);
          }}
          className="text-xs hover:opacity-50"
        >
          NEWSLETTER
        </button>
        <Modal
          closeTimeoutMS={200}
          shouldCloseOnEsc={true}
          style={modalStyles}
          isOpen={showform}
          onRequestClose={() => setShowForm(false)}
          contentLabel="Newsletter Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          {subscribed ? (
            <div className="flex flex-col items-center justify-center gap-4 px-4 py-8">
              <p className="text-xs font-[550]">
                THANK YOU FOR SUBSCRIBING TO MAYH3M.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 px-4 py-8">
              <p className="text-xs font-[550]">
                GET NOTIFIED ABOUT NEW PRODUCT ARRIVALS AND EARLY RELEASE INFO
              </p>
              <form onSubmit={onSubmit}>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  className="w-full border-2 border-black p-2"
                  type="email"
                  placeholder="Email"
                />
                <button
                  type="submit"
                  className="w-full bg-black p-2 text-white"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs">
                You may unsubscribe from our list at any time. Visit our{" "}
                <Link
                  className="text-blue-400 underline"
                  href="/privacy-policy"
                >
                  PRIVACY POLICY
                </Link>{" "}
                for more information.
              </p>
            </div>
          )}
        </Modal>
      </div>
      <div className="w-full text-center">
        <p className="mr-14">© 2023 MAYH3M</p>
      </div>

      <div className="flex">
        <div className="p-1">
          <a
            href="https://www.instagram.com/mayh3m.xyz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="h-auto w-4 hover:opacity-50"
              src="/static/img/instagram.png"
            ></img>
          </a>
        </div>
        <div className="p-1">
          <a
            href="https://twitter.com/mayh3m_by_f3z"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="h-auto w-4 hover:opacity-50"
              src="/static/img/twitter.png"
            ></img>
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
