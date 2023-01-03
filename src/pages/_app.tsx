import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { api } from "../utils/api";

import "../styles/globals.css";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  const getLayout = Component.getLayout ?? ((page: NextPage) => page)

  return getLayout(
    <SessionProvider session={session}>
        <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

