import React, { useState } from "react";
import Container from "@material-ui/core/Container";

/* ======================= UI ======================= */
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
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
  FetchMoreVerse: () => void;
  currentPage: number;
}

const TranslationTab = ({
  playWordVerseSound,
  currentPage,
  FetchMoreVerse,
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
              <ChapterNavigation
                verse
                currentPage={currentPage}
                FetchMoreVerse={FetchMoreVerse}
                totalVerses={surah?.verses_count}
                surahID={surah?.id}
                // @ts-ignore
                totalPage={surahVerses.pagination.total_pages}
              />
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

interface ChapterNavigationProps {
  surahID?: number;
  totalVerses?: number;
  FetchMoreVerse: () => void;
  currentPage: number;
  totalPage?: number;
  verse?: boolean;
}
function ChapterNavigation({
  surahID,
  totalPage,
  FetchMoreVerse,
  currentPage,
  verse
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

        {verse && totalPage && currentPage < totalPage ? (
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
