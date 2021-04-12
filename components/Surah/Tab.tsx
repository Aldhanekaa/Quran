import React, { useRef } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

/* ======================= UI ======================= */

import Grid from "@material-ui/core/Grid";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "next/link";
import { Stack, Button, Box, useToast } from "@chakra-ui/react";
import WordVerseSound from "react-sound";
/* ======================= END UI ======================= */

import { useState } from "react";
import styled from "@emotion/styled";
import { ChapterContext } from "../../pages/[chapter]/index";

import TranslationTab from "./Translations";
import ReadTab from "./ReadTab";

const ButtonGridItem = styled(Grid)`
  button {
    width: 100%;
  }

  @media screen and (max-width: 680px) {
    width: 100%;
  }
`;

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

interface songInterface {
  status: "PLAYING" | "STOPPED" | "PAUSED";
  url: string;
}

export default function ChapterTab() {
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

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <ChapterContext.Consumer>
      {({
        surahVerses,
        SurahInfo,
        BismillahText,
        surah,
        currentPage,
        FetchMoreVerse
      }) => (
        <div className={classes.root}>
          {/* Audio For Verse Audio Sound */}
          <WordVerseSound
            onFinishedPlaying={handleWordVerseSoundFinishedPlaying}
            playStatus={audio.status}
            url={audio.url}
          />
          {surahVerses && surahVerses.pagination.total_pages}
          {/* Audio For Verse Audio Sound */}

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

          {/* Translation */}
          <TabPanel value={value} index={0}>
            <Container>
              <p style={{ marginBottom: "50px" }}>
                {BismillahText && BismillahText}
              </p>
              <TranslationTab
                playWordVerseSound={playWordVerseSound}
                stopWordVerseSound={stopWordVerseSound}
                playtranslationRecognition={playtranslationRecognition}
              />
              <ChapterNavigation
                currentPage={currentPage}
                FetchMoreVerse={FetchMoreVerse}
                totalVerses={surah?.verses_count}
                surahID={surah?.id}
                // @ts-ignore
                totalPage={surahVerses.pagination.total_pages}
              />
            </Container>
          </TabPanel>
          {/* Translation */}

          {/* Read Tab */}
          <TabPanel value={value} index={1}>
            {BismillahText}
            <Container>
              <ReadTab
                playWordVerseSound={playWordVerseSound}
                stopWordVerseSound={stopWordVerseSound}
              >
                <ChapterNavigation
                  currentPage={currentPage}
                  FetchMoreVerse={FetchMoreVerse}
                  totalVerses={surah?.verses_count}
                  surahID={surah?.id}
                  // @ts-ignore
                  totalPage={surahVerses.pagination.total_pages}
                />
              </ReadTab>
            </Container>
          </TabPanel>
          {/* Read Tab */}

          {/* Surah Info Tab */}
          <TabPanel value={value} index={2}>
            <SurahInfoTab>
              <div
                dangerouslySetInnerHTML={{
                  // @ts-ignore
                  __html: SurahInfo?.text
                }}
              ></div>
            </SurahInfoTab>
          </TabPanel>
          {/* Surah Info Tab */}
        </div>
      )}
    </ChapterContext.Consumer>
  );
}

interface ChapterNavigationProps {
  surahID?: number;
  totalVerses?: number;
  FetchMoreVerse: () => void;
  currentPage: number;
  totalPage?: number;
}
function ChapterNavigation({
  surahID,
  totalPage,
  FetchMoreVerse,
  currentPage
}: ChapterNavigationProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function OKCool() {
    setIsLoading(true);
    await FetchMoreVerse();
    setIsLoading(false);
  }
  return (
    <Container>
      {/* @ts-ignore */}
      <Grid
        container
        spacing={2}
        style={{
          marginTop: "50px"
        }}
        alignContent="stretch"
        justify="center"
      >
        {surahID && surahID != 1 ? (
          <ButtonGridItem item>
            <Link href={`/${surahID - 1}`}>
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

        {totalPage && currentPage < totalPage ? (
          <ButtonGridItem item onClick={OKCool}>
            <Button isLoading={isLoading} colorScheme="blue" variant="outline">
              Load More Verse
            </Button>
          </ButtonGridItem>
        ) : (
          ""
        )}

        {surahID && surahID != 114 ? (
          <ButtonGridItem item>
            <Link href={`/${surahID + 1}`}>
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
  );
}
