import React from "react";
import Container from "@material-ui/core/Container";

/* ======================= UI ======================= */

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Grid from "@material-ui/core/Grid";

import { Box, Stack, Button, useToast } from "@chakra-ui/react";
/* ======================= END UI ======================= */

import { ChapterContext } from "../../pages/[chapter]/index";
import styled from "@emotion/styled";

import Verse from "@/components/Surah/verse";
import Link from "next/link";

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
  playtranslationRecognition: (text: string) => void;
  playWordVerseSound: (url: string) => void;
  stopWordVerseSound: () => void;
}

export default function TranslationTab({
  playtranslationRecognition,
  playWordVerseSound,
  stopWordVerseSound
}: TranslationTabProps) {
  const toast = useToast();

  return (
    <ChapterContext.Consumer>
      {({
        surah,
        surahVerses,
        modalShare: {
          closeModalShare,
          isModalShareOpen,
          shareModalData: { verse, translation },
          handleShareModal
        }
      }) => (
        <>
          {/* Verses */}
          <Stack spacing={5}>
            {/* Verses */}
            {surahVerses &&
              surahVerses.verses.map((verse) => {
                return (
                  <Verse
                    playtranslationRecognition={playtranslationRecognition}
                    playWordVerseSound={playWordVerseSound}
                    stopWordVerseSound={stopWordVerseSound}
                    onOpen={handleShareModal}
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
              {surah && surah.id != 1 ? (
                <ButtonGridItem item>
                  <Link href={`/${surah?.id - 1}`}>
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

              {surah && surah.verses_count > 10 && (
                <ButtonGridItem item>
                  <Button colorScheme="blue" variant="outline">
                    Load More Verse
                  </Button>
                </ButtonGridItem>
              )}

              {surah && surah.id != 114 ? (
                <ButtonGridItem item>
                  <Link href={`/${surah?.id + 1}`}>
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
      )}
    </ChapterContext.Consumer>
  );
}
