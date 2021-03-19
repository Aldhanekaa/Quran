import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import { DefaultSeo } from "next-seo";
import SEO from "../seo.config";

import Head from "next/head";
import { AppProps } from "next/app";
import { useEffect } from "react";
import * as gtag from "../utils/gtag";
import { useRouter } from "next/router";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ProgressLoad from "../components/ProgressLoad";

import React from "react";
import { useTheme } from "@material-ui/core/styles";

declare global {
  interface Window {
    gtag: (event: string, name: any, obj: object) => void;
  }
}

interface reportWebVitalsI {
  id: string;
  name: string;
  label: string;
  value: number;
}
export function reportWebVitals({ id, name, label, value }: reportWebVitalsI) {
  window.gtag("event", name, {
    event_category: label === "web-vital" ? "Web Vitals" : "Next.js metric",
    value: Math.round(name === "CLS" ? value * 1000 : value),
    event_label: id,
    non_interaction: true
  });
}

const doesntAlllowedNavAndFooter: string[] = [
  "/login",
  "/signup",
  "/docs/changelog"
];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const theme = useTheme();

  let path: string = router.pathname;

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          name="google-site-verification"
          content={
            gtag.GOOGLE_VERIF || "pYKlXre7UF2sT8gpx6Nf8NKJLM0H5hkh80XIWEmO-yo"
          }
        />

        <meta name="yandex-verification" content="356dad746d43cc34" />

        <meta name="theme-color" content="#f0efeb" />

        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png"></link>

        <title>Madrasah Tsanawiyah Techno Natura Depok</title>
        <meta
          name="description"
          content="Website Madrasah Tsanawiyah Techno Natura"
        />
      </Head>

      <DefaultSeo {...SEO} />

      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <ProgressLoad />

        <Navbar />

        {/* {<Navbar /> && Nav} */}
        <Component {...pageProps} />

        {/* {Footer ? Footer : ""} */}
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
