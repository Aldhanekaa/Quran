import React, { useRef, useState } from "react";
import WordVerseSound from "react-sound";

import styled from "@emotion/styled";

/* ======================= UI ======================= */
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Box } from "@chakra-ui/react";
/* ======================= END UI ======================= */

import { ChapterContext } from "../../pages/[chapter]/index";
import TranslationTab from "./ReadTab";

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
        <>
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
                <Tab label="Read" aria-label="Read" {...a11yProps(0)} />
                <Tab
                  label="Surah Info"
                  aria-label="Surah Info"
                  {...a11yProps(2)}
                />
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
                />
              </Container>
            </TabPanel>
            {/* Translation */}

            {/* Surah Info Tab */}
            <TabPanel value={value} index={1}>
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
        </>
      )}
    </ChapterContext.Consumer>
  );
}
