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

import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Center,
  useDisclosure,
  Button,
  useToast,
  PortalManager
} from "@chakra-ui/react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import RedditIcon from "@material-ui/icons/Reddit";
import TelegramIcon from "@material-ui/icons/Telegram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import WordVerseSound from "react-sound";
/* ======================= END UI ======================= */

import { NextSeo } from "next-seo";
import { Redirect, GetServerSideProps, GetServerSidePropsResult } from "next";
import {
  VerseByChapterFetchResult,
  SurahResult,
  chapter
} from "@/ts/interfaces";
import { withRouter, NextRouter, useRouter } from "next/router";
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

const ButtonGridItem = styled(Grid)`
  button {
    width: 100%;
  }

  @media screen and (max-width: 680px) {
    width: 100%;
  }
`;

interface shareModalDataRef {
  verse: string;
  translation: string;
}

const SurahInfoTab = styled(Container)`
  ol,
  ul {
    padding-left: 30px;
    margin-top: 20px;
  }

  h2 {
    margin-top: 30px;
    font-size: 25px;
    font-weight: 500;
  }

  p {
    margin-top: 10px;
  }
`;
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

const TabsStyled = styled(Tabs)`
  justify-content: center !important;
`;

interface ChapterTabProps {
  Translations?: JSX.Element | JSX.Element[];
  SurahInfo?: string;
  surahVerses: VerseByChapterFetchResult | false;
  surah?: chapter;
  handleShareModal: (verse: string, translation: string) => void;
}

interface songInterface {
  status: "PLAYING" | "STOPPED" | "PAUSED";
  url: string;
}

export default function ChapterTab(props: ChapterTabProps) {
  // let translationRecognition = new SpeechSynthesisUtterance();
  // translationRecognition.lang = "en-US";
  // translationRecognition.volume = 0.75;

  function playtranslationRecognition(text: string) {
    // translationRecognition.text = text;
    // if (!("speechSynthesis" in window)) {
    //   toast({
    //     title: `Sorry, your browser doesn't support text to speech!`,
    //     status: "error",
    //     isClosable: true,
    //     position: "bottom-right"
    //   });
    //   return;
    // }
    // window.speechSynthesis.speak(translationRecognition);
  }

  // translationRecognition.onerror = function (event) {
  //   toast({
  //     title: `Translation text to speech recognetion error`,
  //     status: "error",
  //     isClosable: true,
  //     position: "bottom-right"
  //   });
  // };

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
    <div className={classes.root}>
      <WordVerseSound
        onFinishedPlaying={handleWordVerseSoundFinishedPlaying}
        playStatus={audio.status}
        url={audio.url}
      />
      <AppBar position="static">
        <TabsStyled
          value={value}
          onChange={handleChange}
          scrollButtons="off"
          centered
          aria-label="scrollable prevent tabs example"
        >
          <Tab label="Translation" aria-label="phone" {...a11yProps(0)} />
          <Tab label="Read" aria-label="favorite" {...a11yProps(1)} />
          <Tab label="Surah Info" aria-label="person" {...a11yProps(2)} />
        </TabsStyled>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Container>
          {/* Bismillah Text */}
          {props.Translations}

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

          {/* Buttons | Previous, Next Chapter, and Load more verse */}
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
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SurahInfoTab>
          <div
            dangerouslySetInnerHTML={{
              // @ts-ignore
              __html: props.SurahInfo
            }}
          ></div>
        </SurahInfoTab>
      </TabPanel>
    </div>
  );
}
