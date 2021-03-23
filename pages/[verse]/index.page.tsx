import CircularProgress from "@material-ui/core/CircularProgress";

import Container from "@material-ui/core/Container";
import { withRouter, NextRouter, useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";

import { NextSeo } from "next-seo";
import Head from "next/head";
import { Redirect, GetServerSideProps, GetServerSidePropsResult } from "next";
import {
  VerseByChapterFetchResult,
  ErrorMessage,
  Surah
} from "../../types/interfaces";
import { useEffect, useState } from "react";

import FetchVerses from "../../utils/getVerseByChapter";
import FetchSurah from "../../utils/getChapter";
import Tab from "../../components/Surah/Tab";

interface WithRouterProps {
  router: NextRouter;
}

interface MyComponentProps extends WithRouterProps {}

export default function Verse() {
  const router = useRouter();

  console.log(router);

  const [surahVerses, changeVerses] = useState<
    undefined | VerseByChapterFetchResult | ErrorMessage
  >();

  const [Surah, setSurah] = useState<Surah | undefined | ErrorMessage>();

  // @ts-ignore
  useEffect(async () => {
    if (router.query.verse) {
      // @ts-ignore
      const verses = await FetchVerses(router.query.verse);
      // @ts-ignore
      const surah = await FetchSurah(router.query.verse);

      setSurah(surah);
      changeVerses(verses);
    }
  }, [router.query.verse]);

  useEffect(() => {
    console.log("surah", Surah);

    console.log("surahVerses", surahVerses);
  }, [surahVerses]);

  return (
    <div style={{ marginTop: "50px" }}>
      <Container maxWidth="sm">
        {Surah && "surah" in Surah && Surah.surah.bismillah_pre && (
          <Typography
            className="arabic"
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
            id="bismillah"
          >
            ﷽
          </Typography>
        )}

        {!surahVerses && (
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            <CircularProgress />
          </Typography>
        )}
      </Container>
      <Tab />
    </div>
  );
}

interface AA {
  a: string;
}

// export const getServerSideProps: GetServerSideProps<Redirect | AA> = async (
//   ctx
// ) => {
//   console.log("asdasd", ctx.query);
//   return {
//     props: {
//       a: "as"
//     }
//   };
// };
