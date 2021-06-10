import React, { useState, memo, useContext } from "react";

import Link from "next/link";

import styled from "@emotion/styled";

/* ======================= UI ======================= */
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import Pagination from "@material-ui/lab/Pagination";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
import Verse from "@/components/Surah/verse";
import Grid from "@material-ui/core/Grid";
import { Toolbar } from "@material-ui/core";

import { Stack, Button, useToast } from "@chakra-ui/react";
/* ======================= END UI ======================= */

import { ChapterContext } from "@/pages/[chapter]/index";

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
              <ChapterNavigation
                verse
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
  totalPage?: number;
  verse?: boolean;
}
function ChapterNavigation({
  surahID,
  totalPage,
  verse
}: ChapterNavigationProps) {
  const {
    FetchMoreVerse,
    currentPage,
    fetching: { fetching }
  } = useContext(ChapterContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function OKCool(n: number) {
    setIsLoading(true);
    await FetchMoreVerse(n);
    setIsLoading(false);
  }
  return (
    <Container>
      {isLoading && (
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          <CircularProgress />
        </Typography>
      )}

      {totalPage && totalPage > 1 && (
        <Grid
          container
          spacing={2}
          style={{
            marginTop: "50px"
          }}
          alignContent="stretch"
          justify="center"
        >
          <Pagination
            onChange={(e, page) => {
              OKCool(page);
            }}
            count={totalPage}
            defaultPage={currentPage}
            showFirstButton
            showLastButton
          />
        </Grid>
      )}

      {/* @ts-ignore */}
      <Grid
        container
        spacing={2}
        style={{
          marginTop: "20px"
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
