/* ======================= UI ======================= */
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/link";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ShareIcon from "@material-ui/icons/Share";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import MenuBookIcon from "@material-ui/icons/MenuBook";
/* ======================= END UI ======================= */

import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Center,
  useDisclosure,
  Tooltip,
  Button,
  useToast,
  useClipboard
} from "@chakra-ui/react";

import { NextSeo } from "next-seo";
import { Redirect, GetServerSideProps, GetServerSidePropsResult } from "next";
import {
  VerseByChapterFetchResult,
  ErrorMessage,
  Surah
} from "@/ts/interfaces";
import { withRouter, NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import styled from "@emotion/styled";
import { Verse } from "../../ts/interfaces";

import FetchVerses from "../../utils/getVerseByChapter";
import FetchSurah from "../../utils/getChapter";
// import {} from "@/type/";

const ButtonGridItem = styled(Grid)`
  button {
    width: 100%;
  }

  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;

interface VerseProps extends Verse {
  onOpen: (verse: string, translation: string) => void;
}

export default function VerseComponent(props: VerseProps) {
  const words = props.words
    .map((word) => {
      if (word.char_type_name == "word") {
        return word.text_uthmani;
      }
      return "";
    })
    .join("");
  const toast = useToast();

  const { hasCopied, onCopy } = useClipboard(words);

  return (
    <>
      <Box
        p={5}
        flex="1"
        width="100%"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
      >
        <Badge>Verse {props.verse_number}</Badge>
        <Box as="p" className="arabic">
          {props.words.map((word) => {
            return (
              <Text
                display="inline-block"
                marginLeft={2}
                fontSize="2xl"
                className="arabic"
              >
                <Tooltip label={word.translation.text} arrow>
                  <span
                    className={
                      word.char_type_name == "end"
                        ? "end text_uthmani arabic"
                        : ""
                    }
                  >
                    {word.text_uthmani}
                  </span>
                </Tooltip>
              </Text>
            );
          })}
        </Box>

        <Text
          mt={4}
          dangerouslySetInnerHTML={{
            __html: `${props.translations[0].text}`
          }}
        ></Text>

        <Grid
          container
          spacing={2}
          style={{
            marginTop: "10px"
          }}
          alignContent="stretch"
        >
          <ButtonGridItem item>
            <Button colorScheme="blue">
              <PlayArrowIcon />
            </Button>
          </ButtonGridItem>
          <ButtonGridItem item>
            <Button leftIcon={<MenuBookIcon />} colorScheme="blue">
              Tafsirs
            </Button>
          </ButtonGridItem>
          <ButtonGridItem item>
            <Button
              leftIcon={<FilterNoneIcon />}
              onClick={() => {
                {
                  !hasCopied &&
                    toast({
                      title: `Copied To Clipboard`,
                      status: "success",
                      isClosable: true,
                      position: "bottom-right"
                    });
                }
                onCopy();
              }}
              colorScheme="blue"
            >
              {hasCopied ? "Copied" : "Copy"}
            </Button>
          </ButtonGridItem>
          <ButtonGridItem
            item
            onClick={() => {
              console.log(words);
              props.onOpen(words, props.translations[0].text);
            }}
          >
            <Button leftIcon={<ShareIcon />} colorScheme="blue">
              Share
            </Button>
          </ButtonGridItem>
        </Grid>
      </Box>
    </>
  );
}
