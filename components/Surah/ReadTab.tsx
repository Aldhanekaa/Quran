import React from "react";
import Container from "@material-ui/core/Container";

/* ======================= UI ======================= */
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { readVerseComponent as ReadVerseComponent } from "@/components/Surah/verse";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
import Verse from "@/components/Surah/verse";
import Grid from "@material-ui/core/Grid";
import { Stack, Button, useToast } from "@chakra-ui/react";
/* ======================= END UI ======================= */

import { ChapterContext } from "@/pages/[chapter]/index";
import styled from "@emotion/styled";
import { memo } from "react";
import Link from "next/link";
import { Toolbar } from "@material-ui/core";

interface songInterface {
  status: "PLAYING" | "STOPPED" | "PAUSED";
  url: string;
}

const ButtonGridItem = styled(Grid)`
  button {
    width: 100%;
  }

  @media screen and (max-width: 680px) {
    width: 100%;
  }
`;

interface TranslationTabProps {
  playWordVerseSound: (url: string) => void;
  stopWordVerseSound: () => void;
}

const TranslationTab = ({
  playWordVerseSound,
  stopWordVerseSound
}: TranslationTabProps) => {
  const toast = useToast();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ChapterContext.Consumer>
      {({ surahVerses, surah, modalShare: { handleShareModal } }) => (
        <>
          {/* @ts-ignore */}
          <Box sx={{ width: "100%" }} style={{ marginTop: "50px" }}>
            {/* @ts-ignore */}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                //   @ts-ignore
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Normal" {...a11yProps(0)} />
                <Tab label="Tajweed" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <Toolbar />
            <TabPanel value={value} index={0}>
              {/* {surahVerses &&
                surahVerses.verses.map((verse) => {
                  return (
                    <ReadVerseComponent
                      playWordVerseSound={playWordVerseSound}
                      stopWordVerseSound={stopWordVerseSound}
                      {...verse}
                    />
                  );
                })} */}

              {/* Verses */}
              <Stack spacing={5}>
                {/* Verses */}
                {surahVerses &&
                  surahVerses.verses.map((verse) => {
                    return (
                      <Verse
                        surah={surah}
                        playWordVerseSound={playWordVerseSound}
                        stopWordVerseSound={stopWordVerseSound}
                        onOpen={handleShareModal}
                        {...verse}
                      ></Verse>
                    );
                  })}
              </Stack>
              {/* Buttons | Previous, Next Chapter, and Load more verse */}
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
          </Box>
        </>
      )}
    </ChapterContext.Consumer>
  );
};
export default memo(TranslationTab);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {/* @ts-ignore */}

          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        </>
      )}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}
