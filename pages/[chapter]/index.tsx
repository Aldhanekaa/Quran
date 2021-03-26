import CircularProgress from "@material-ui/core/CircularProgress";

import Container from "@material-ui/core/Container";
import { withRouter, NextRouter, useRouter } from "next/router";
import Typography from "@material-ui/core/Typography";

import { NextSeo } from "next-seo";
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
import { GetStaticProps, GetStaticPaths } from "next";
import { Box, Heading, Text, Stack } from "@chakra-ui/react";

interface WithRouterProps {
  router: NextRouter;
}

export default function Verse(props: ErrorMessage | Surah) {
  const router = useRouter();

  console.log(router);

  const [surahVerses, changeVerses] = useState<
    VerseByChapterFetchResult | ErrorMessage
  >();

  const [Surah, setSurah] = useState<Surah | ErrorMessage>(() => {
    return props;
  });

  // @ts-ignore
  useEffect(async () => {
    if (router.query.chapter) {
      // @ts-ignore
      const verses = await FetchVerses(router.query.chapter);
      changeVerses(verses);
    }
  }, [router.query.verse]);

  // const OK =

  return (
    <div style={{ marginTop: "50px" }}>
      <Container maxWidth="sm">
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
      <Tab
        Translations={
          <>
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

            <Stack spacing={0}>
              <Box
                p={5}
                flex="1"
                width="100%"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Heading fontSize="xl">sssasdas</Heading>
                <Text mt={4}>asdasi</Text>
              </Box>
            </Stack>
          </>
        }
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  ErrorMessage | Surah
> = async (ctx) => {
  console.log("asdasd", ctx.query);
  // const verses = await FetchVerses(router.query.verse);
  //@ts-ignore
  const surah = await FetchSurah(ctx.query.chapter);

  //@ts-ignore
  if (surah.message && !surah.surahInfo) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }
  return {
    props: surah
  };
};
