import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Box, Heading, Text, Stack, Badge, Tooltip } from "@chakra-ui/react";

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
import { Verse } from "../../ts/interfaces";

import FetchVerses from "../../utils/getVerseByChapter";
import FetchSurah from "../../utils/getChapter";
// import {} from "@/type/";
export default function VerseComponent(props: Verse) {
  return (
    <>
      <Box
        p={5}
        flex="1"
        width="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Badge>Verse {props.verse_number}</Badge>
        <Box as="p" className="arabic">
          {props.words.map((word) => {
            return (
              <Text
                display="inline-block"
                marginLeft={2}
                fontSize="2xl"
                className="arabic"
              >
                <Tooltip label={word.translation.text} arrow>
                  <span>{word.text_uthmani}</span>
                </Tooltip>
              </Text>
            );
          })}
        </Box>

        <Text
          mt={4}
          dangerouslySetInnerHTML={{
            __html: `${props.translations[0].text}`
          }}
        ></Text>
      </Box>
    </>
  );
}
