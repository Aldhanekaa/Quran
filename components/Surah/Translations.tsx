import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

/* ======================= UI ======================= */

import CircularProgress from "@material-ui/core/CircularProgress";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Grid from "@material-ui/core/Grid";

import { Box, Stack, Button, useToast } from "@chakra-ui/react";
import WordVerseSound from "react-sound";
/* ======================= END UI ======================= */

import {
  VerseByChapterFetchResult,
  SurahResult,
  chapter
} from "@/ts/interfaces";
import {
  useEffect,
  useState,
  useRef,
  Fragment,
  useCallback,
  useMemo
} from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import styled from "@emotion/styled";

import FetchVerses from "../../utils/getVerseByChapter";
import FetchSurah from "../../utils/getChapter";
import Hero from "@/components/Surah/Hero";
import Verse from "@/components/Surah/verse";
import Link from "next/link";
import { Toolbar } from "@material-ui/core";

interface songInterface {
  status: "PLAYING" | "STOPPED" | "PAUSED";
  url: string;
}

export default function TranslationTab() {
  let translationRecognition = new SpeechSynthesisUtterance();
  translationRecognition.lang = "en-US";
  translationRecognition.volume = 0.75;

  function playtranslationRecognition(text: string) {
    translationRecognition.text = text;
    if (!("speechSynthesis" in window)) {
      toast({
        title: `Sorry, your browser doesn't support text to speech!`,
        status: "error",
        isClosable: true,
        position: "bottom-right"
      });
      return;
    }
    window.speechSynthesis.speak(translationRecognition);
  }

  translationRecognition.onerror = function (event) {
    toast({
      title: `Translation text to speech recognetion error`,
      status: "error",
      isClosable: true,
      position: "bottom-right"
    });
  };

  const toast = useToast();
  const [audio, setAudio] = useState<songInterface>(() => {
    return {
      status: "STOPPED",
      url: ""
    };
  });
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  function playWordVerseSound(url: string) {
    setAudio((prevState) => {
      return Object.assign({}, prevState, {
        status: "PLAYING",
        url: url
      });
    });
  }

  function stopWordVerseSound() {
    window.speechSynthesis.cancel();
    setAudio((prevState) => {
      return Object.assign({}, prevState, { status: "STOPPED" });
    });
  }

  function handleWordVerseSoundFinishedPlaying() {
    stopWordVerseSound();
  }
  return (
    <>
      {/* Verses */}
      <Stack spacing={5}>
        {/* Verses */}
        {props.surahVerses &&
          props.surahVerses.verses.map((verse) => {
            return (
              <Verse
                playtranslationRecognition={playtranslationRecognition}
                playWordVerseSound={playWordVerseSound}
                stopWordVerseSound={stopWordVerseSound}
                onOpen={props.handleShareModal}
                {...verse}
              ></Verse>
            );
          })}
      </Stack>
      ;{/* Buttons | Previous, Next Chapter, and Load more verse */}
      <Container>
        {/* @ts-ignore */}
        <Grid
          container
          spacing={2}
          style={{
            marginTop: "10px"
          }}
          alignContent="stretch"
          justify="center"
        >
          {props.surah && props.surah.id != 1 ? (
            <ButtonGridItem item>
              <Link href={`/${props?.surah?.id - 1}`}>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  leftIcon={<NavigateBeforeIcon />}
                >
                  Previous Chapter
                </Button>
              </Link>
            </ButtonGridItem>
          ) : (
            // </Link>
            ""
          )}

          {props.surah && props.surah.verses_count > 10 && (
            <ButtonGridItem item>
              <Button colorScheme="blue" variant="outline">
                Load More Verse
              </Button>
            </ButtonGridItem>
          )}

          {props.surah && props.surah.id != 114 ? (
            <ButtonGridItem item>
              <Link href={`/${props?.surah?.id + 1}`}>
                <Button
                  colorScheme="blue"
                  variant="outline"
                  rightIcon={<NavigateNextIcon />}
                >
                  Next Chapter
                </Button>
              </Link>
            </ButtonGridItem>
          ) : (
            // </Link>
            ""
          )}
        </Grid>
      </Container>
    </>
  );
}
