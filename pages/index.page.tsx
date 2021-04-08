import Toolbar from "@material-ui/core/Toolbar";

import React, { Fragment, useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";

import Hero from "../components/home/hero";
import ListSurah from "../components/home/listSurah/";
import { fetchChapters, chapters, chapter } from "@/ts/interfaces";
import useSWR from "swr";
import axios from "axios";
import { GetServerSideProps } from "next";

// Fetcher for the SWR
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Home(props: HomeFetch) {
  const chapters = [];

  // Fetch chapter list
  const dataFetchChapters: fetchChapters = useSWR<chapters, any>(
    "https://api.quran.com/api/v4/chapters?language=en",
    fetcher
  );

  // dataFetchChapter.

  return (
    <Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <NextSeo
        title="QuranKu Website - Read Quran and Meditate with Quran online."
        description="QuranKu Website is a place where you can read quran online and meditate with it!"
        canonical={process.env.PUBLIC_URL}
        openGraph={{
          url: process.env.PUBLIC_URL,
          title: "QuranKu Website Read Quran For Free",
          description:
            "QuranKu Website - Read Quran and Meditate with Quran online"
        }}
      />
      <Toolbar />
      <Hero {...dataFetchChapters} />
      <ListSurah data={props.chapters} error={props.error} />
    </Fragment>
  );
}

interface HomeFetch {
  chapters?: chapter[];
  error: boolean;
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<HomeFetch> = async (
  ctx
) => {
  // const verses = await FetchVerses(router.query.verse);
  //@ts-ignore
  const dataChapters = await axios.get<chapters>(
    `https://api.quran.com/api/v4/chapters?language=en`
  );
  //@ts-ignore
  if (!dataChapters) {
    return {
      props: {
        chapters: undefined,
        error: true
      }
    };
  }
  return {
    props: {
      chapters: dataChapters.data.chapters,
      error: false
    }
  };
};
