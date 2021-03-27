import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Center,
  Button
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { Redirect, GetServerSideProps, GetServerSidePropsResult } from "next";
import {
  VerseByChapterFetchResult,
  ErrorMessage,
  Surah
} from "@/ts/interfaces";
import { withRouter, NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import styled from "@emotion/styled";

import FetchVerses from "../../utils/getVerseByChapter";
import FetchSurah from "../../utils/getChapter";
import Tab from "@/components/Surah/Tab";
import Hero from "@/components/Surah/Hero";
import Verse from "@/components/Surah/verse";
// import {} from "@/";
// import {} from "@/typescript/";
import { chapter } from "@/ts/interfaces";

const BismillahText = styled(Text)`
  font-size: 70px;

  @media screen and (max-width: 556px) {
    font-size: 40px;
  }
`;

export default function Chapter(props: ErrorMessage | Surah) {
  const router = useRouter();

  console.log(router);

  const [surahVerses, changeVerses] = useState<
    VerseByChapterFetchResult | false
  >();

  const [Surah, setSurah] = useState<Surah | ErrorMessage>(() => {
    return props;
  });

  // @ts-ignore
  useEffect(async () => {
    if (router.query.chapter) {
      // @ts-ignore
      const verses = await FetchVerses(router.query.chapter);
      console.log(verses);
      changeVerses(verses);
    }
  }, [router.query.verse]);

  // const OK =
  // console.log("asdasdas", surahVerses);

  return (
    <div style={{ marginTop: "50px" }}>
      {/* @ts-ignore */}
      {!props.message && props.surah && (
        <>
          {/* @ts-ignore */}
          <Hero
            // @ts-ignore
            surah_name={props.surah.name_simple}
            //  @ts-ignore
            verses_count={props.surah.verses_count}
            // @ts-ignore
            desc={props.surahInfo.short_text}
            // @ts-ignore
            revelation_place={props.surah.revelation_place}
          />
        </>
      )}
      {/* @ts-ignore */}
      {props.message && <h1>error</h1>}

      {!surahVerses && (
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          <CircularProgress />
        </Typography>
      )}

      {surahVerses && (
        <Tab
          Translations={
            <>
              {Surah && "surah" in Surah && Surah.surah.bismillah_pre && (
                <BismillahText className="arabic" align="center" id="bismillah">
                  ﷽
                </BismillahText>
              )}
              <Container>
                <Stack spacing={5}>
                  {surahVerses &&
                    surahVerses.verses.map((verse) => {
                      return <Verse {...verse}></Verse>;
                    })}
                </Stack>
              </Container>
              <Center marginTop={10} color="white">
                <Button colorScheme="teal" variant="solid">
                  Load More Verse
                </Button>
              </Center>
            </>
          }
        />
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  ErrorMessage | Surah
> = async (ctx) => {
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
