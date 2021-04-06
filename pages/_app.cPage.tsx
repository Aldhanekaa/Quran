import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";

import SEO from "../seo.config";
import "../styles/global.css";
import * as gtag from "../utils/gtag";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ProgressLoad from "../components/ProgressLoad";
import ScrollToTop from "../components/scrollToTop";

import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { AppProps } from "next/app";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider } from "react-redux";

import store from "../store";
import { ChakraProvider } from "@chakra-ui/react";
import {
  chakra,
  HTMLChakraProps,
  Text,
  Stack,
  useColorModeValue,
  HStack
} from "@chakra-ui/react";

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

  console.log("INI ROUTERRR", router);

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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.1.1/css/all.css"
        />
      </Head>

      <style jsx global>{`
        html {
          font-family: "Roboto", sans-serif;
          scroll-behavior: smooth;
          scroll-behavior: smooth;
        }
      `}</style>

      <DefaultSeo {...SEO} />
      <Provider store={store}>
        <ChakraProvider>
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
        </ChakraProvider>
      </Provider>
    </>
  );
}

function ActionLink(props: HTMLChakraProps<"a">) {
  return (
    <chakra.a
      {...props}
      href="#"
      px="4"
      py="1.5"
      textAlign="center"
      borderWidth="1px"
      borderColor="whiteAlpha.400"
      fontWeight="medium"
      rounded="base"
      _hover={{ bg: "whiteAlpha.200" }}
    />
  );
}

export default MyApp;
