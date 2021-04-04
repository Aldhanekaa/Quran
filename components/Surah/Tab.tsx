import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

/* ======================= UI ======================= */

import Grid from "@material-ui/core/Grid";

import { Box, useToast } from "@chakra-ui/react";
import WordVerseSound from "react-sound";
/* ======================= END UI ======================= */

import { useState } from "react";
import styled from "@emotion/styled";
import { ChapterContext } from "../../pages/[chapter]/index";

import TranslationTab from "./Translations";

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
      {({ SurahInfo, BismillahText }) => (
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
              <p>{BismillahText && BismillahText}</p>
              <TranslationTab
                playWordVerseSound={playWordVerseSound}
                stopWordVerseSound={stopWordVerseSound}
                playtranslationRecognition={playtranslationRecognition}
              />
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1}>
            {BismillahText}
          </TabPanel>
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
        </div>
      )}
    </ChapterContext.Consumer>
  );
}
