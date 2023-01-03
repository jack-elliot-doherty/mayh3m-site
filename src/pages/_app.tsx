import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<P> = AppProps<P> & {
  Component: NextPageWithLayout<P>;
};

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}: AppPropsWithLayout<{ session: Session | null }>) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
