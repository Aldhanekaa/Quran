import React from "react";
import Container from "@material-ui/core/Container";

/* ======================= UI ======================= */

import Verse from "@/components/Surah/verse";
import Grid from "@material-ui/core/Grid";
import { Stack, Button, useToast } from "@chakra-ui/react";
/* ======================= END UI ======================= */

import { ChapterContext } from "@/pages/[chapter]/index";
import styled from "@emotion/styled";

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
      {({ surahVerses, surah, modalShare: { handleShareModal } }) => (
        <>
          {/* Verses */}
          <Stack spacing={5}>
            {/* Verses */}
            {surahVerses &&
              surahVerses.verses.map((verse) => {
                return (
                  <Verse
                    surah={surah}
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
        </>
      )}
    </ChapterContext.Consumer>
  );
}
