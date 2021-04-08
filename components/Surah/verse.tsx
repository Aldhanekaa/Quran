/* ======================= UI ======================= */
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ShareIcon from "@material-ui/icons/Share";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import MenuBookIcon from "@material-ui/icons/MenuBook";
/* ======================= END UI ======================= */

import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Center,
  useDisclosure,
  Tooltip,
  Button,
  useToast,
  useClipboard
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
import { Verse } from "../../ts/interfaces";

const ButtonGridItem = styled(Grid)`
  button {
    width: 100%;
  }

  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;

interface VerseProps extends Verse {
  playWordVerseSound: (url: string) => void;
  stopWordVerseSound: () => void;
}

interface VerseComponentProps extends VerseProps {
  onOpen: (verse: string, translation: string) => void;
  playtranslationRecognition: (text: string) => void;
}

export function readVerseComponent(props: VerseProps) {
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

        <Box
          as="p"
          marginTop={3}
          marginBottom={3}
          className="arabic"
          display="block"
        >
          {props.words.map((word) => {
            return (
              <Text
                display="inline-block"
                marginLeft={3}
                marginTop={3}
                fontSize="2xl"
                fontWeight={900}
                className="arabic"
                onClick={() => {
                  if (word.char_type_name !== "end") {
                    props.stopWordVerseSound();
                    props.playWordVerseSound(
                      "https://verses.quran.com/" + word.audio_url
                    );
                  }
                }}
              >
                <Tooltip label={word.translation.text} arrow>
                  <span
                    className={
                      word.char_type_name == "end"
                        ? "end text_uthmani arabic"
                        : ""
                    }
                  >
                    {word.text_uthmani}
                  </span>
                </Tooltip>
              </Text>
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export default function VerseComponent(props: VerseComponentProps) {
  const words = props.words
    .map((word) => {
      if (word.char_type_name == "word") {
        return word.text_uthmani;
      }
      return "";
    })
    .join("");

  // Toasts for copy to clipboard
  const toast = useToast();

  // function for copy verse to clipboard
  const { hasCopied, onCopy } = useClipboard(words);

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
        <Box as="p" className="arabic" marginTop={3}>
          {props.words.map((word) => {
            return (
              <Text
                display="inline-block"
                marginLeft={2}
                fontSize="2xl"
                fontWeight={900}
                marginTop={3}
                className="arabic"
                onClick={() => {
                  if (word.char_type_name !== "end") {
                    props.stopWordVerseSound();
                    props.playWordVerseSound(
                      "https://verses.quran.com/" + word.audio_url
                    );
                  }
                }}
              >
                <Tooltip label={word.translation.text} arrow>
                  <span
                    className={
                      word.char_type_name == "end"
                        ? "end text_uthmani arabic"
                        : ""
                    }
                  >
                    {word.char_type_name == "end" ? "" : word.text_uthmani}
                  </span>
                </Tooltip>
              </Text>
            );
          })}
        </Box>

        {/* Translation */}
        <Text
          mt={4}
          dangerouslySetInnerHTML={{
            __html: `${props.translations[0].text}`
          }}
        ></Text>
        {/* Translation */}

        {/* Verse Buttons */}
        <Grid
          container
          spacing={2}
          style={{
            marginTop: "10px"
          }}
          alignContent="stretch"
        >
          <ButtonGridItem item>
            <Button colorScheme="blue">
              <PlayArrowIcon />
            </Button>
          </ButtonGridItem>
          <ButtonGridItem item>
            <Button leftIcon={<MenuBookIcon />} colorScheme="blue">
              Tafsirs
            </Button>
          </ButtonGridItem>
          <ButtonGridItem item>
            <Button
              leftIcon={<FilterNoneIcon />}
              onClick={() => {
                {
                  !hasCopied &&
                    toast({
                      title: `Copied To Clipboard`,
                      status: "success",
                      isClosable: true,
                      position: "bottom-right"
                    });
                }
                onCopy();
              }}
              colorScheme="blue"
            >
              {hasCopied ? "Copied" : "Copy"}
            </Button>
          </ButtonGridItem>
          <ButtonGridItem
            item
            onClick={() => {
              console.log(words);
              props.onOpen(words, props.translations[0].text);
            }}
          >
            <Button leftIcon={<ShareIcon />} colorScheme="blue">
              Share
            </Button>
          </ButtonGridItem>
        </Grid>
      </Box>
    </>
  );
}
