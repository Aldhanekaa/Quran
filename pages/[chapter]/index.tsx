/* ======================= UI ======================= */

import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
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
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useClipboard,
  Flex,
  Input,
  WrapItem,
  Wrap,
  useToast
} from "@chakra-ui/react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import RedditIcon from "@material-ui/icons/Reddit";
import TelegramIcon from "@material-ui/icons/Telegram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
/* ======================= END UI ======================= */

import { NextSeo } from "next-seo";
import { Redirect, GetServerSideProps, GetServerSidePropsResult } from "next";
import { VerseByChapterFetchResult, SurahResult } from "@/ts/interfaces";
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
import Tab from "@/components/Surah/Tab";
import Hero from "@/components/Surah/Hero";
import Verse from "@/components/Surah/verse";
import Link from "next/link";
import { Toolbar } from "@material-ui/core";

const StyledBismillahTextComponent = styled(Text)`
  font-size: 70px;

  @media screen and (max-width: 556px) {
    font-size: 40px;
  }
`;

const BismillahTextComponent = () => (
  <StyledBismillahTextComponent
    marginTop={10}
    className="arabic"
    align="center"
    id="bismillah"
  >
    ﷽
  </StyledBismillahTextComponent>
);

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

export default function Chapter(props: SurahResult) {
  let [BismillahText, setBismillahText] = useState<JSX.Element>();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = useState("inside");
  const shareModalData = useRef<shareModalDataRef>({
    verse: "",
    translation: ""
  });
  const { hasCopied, onCopy } = useClipboard(shareModalData.current.verse);

  const router = useRouter();

  const [surahVerses, changeVerses] = useState<
    VerseByChapterFetchResult | false
  >();

  const [Surah, setSurah] = useState<SurahResult>(() => {
    return props;
  });

  // @ts-ignore
  useEffect(async () => {
    if (router.query.chapter) {
      // @ts-ignore
      const verses = await FetchVerses(router.query.chapter);
      changeVerses(verses);
    }

    if (Surah.surah && Surah.surah.bismillah_pre) {
      setBismillahText(<BismillahTextComponent />);
    } else {
      setBismillahText(<Toolbar />);
    }
  }, [props.surah]);

  function handleShareModal(verse: string, translation: string) {
    shareModalData.current.verse = verse;
    shareModalData.current.translation = translation;

    onOpen();
  }

  return (
    <Fragment>
      <NextSeo
        title={`${props?.surah?.name_simple} - QuranKu Website`}
        description={`${props.surahInfo?.short_text}`}
        canonical={process.env.PUBLIC_URL}
        openGraph={{
          url: process.env.PUBLIC_URL,
          title: "QuranKu Website Read Quran For Free",
          description:
            "QuranKu Website - Read Quran and Meditate with Quran online"
        }}
      />

      <div style={{ marginTop: "50px" }}>
        <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Share This Ayah</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex mb={2}>
                <Input
                  fontSize={20}
                  value={shareModalData.current.verse}
                  isReadOnly
                  placeholder="Welcome"
                />
                <Button
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
                  ml={2}
                >
                  {hasCopied ? "Copied" : "Copy"}
                </Button>
              </Flex>
              {/* @ts-ignore */}
              <Grid
                container
                marginTop={10}
                spacing={2}
                style={{
                  marginTop: "10px"
                }}
                alignContent="stretch"
              >
                <ButtonGridItem item>
                  <Button colorScheme="facebook">
                    <FacebookIcon />
                  </Button>
                </ButtonGridItem>
                <ButtonGridItem item>
                  <Button colorScheme="twitter">
                    <TwitterIcon />
                  </Button>
                </ButtonGridItem>
                <ButtonGridItem item>
                  <Button colorScheme="orange">
                    <RedditIcon />
                  </Button>
                </ButtonGridItem>
                <ButtonGridItem item>
                  <Button colorScheme="linkedin">
                    <LinkedInIcon />
                  </Button>
                </ButtonGridItem>
                <ButtonGridItem item>
                  <Button colorScheme="telegram">
                    <TelegramIcon />
                  </Button>
                </ButtonGridItem>
                <ButtonGridItem item>
                  <Button colorScheme="whatsapp">
                    <WhatsAppIcon />
                  </Button>
                </ButtonGridItem>
              </Grid>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* @ts-ignore */}
        {Surah.message != "error" && Surah.surah && (
          <>
            {/* @ts-ignore */}
            <Hero
              // @ts-ignore
              surah_name={props.surah.name_simple}
              //  @ts-ignore
              verses_count={props.surah.verses_count}
              // @ts-ignore
              desc={props.surahInfo.short_text}
              // @ts-ignore
              revelation_place={props.surah.revelation_place}
            />
          </>
        )}
        {/* @ts-ignore */}
        {props.message == "error" && <p>error</p>}

        {!surahVerses && (
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            <CircularProgress />
          </Typography>
        )}

        {/* Tabs */}
        {surahVerses && (
          <Tab
            surah={Surah.surah}
            SurahInfo={props.surahInfo?.text}
            surahVerses={surahVerses}
            handleShareModal={handleShareModal}
            Translations={BismillahText}
          />
        )}
      </div>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<SurahResult> = async (
  ctx
) => {
  // const verses = await FetchVerses(router.query.verse);
  //@ts-ignore
  const surah = await FetchSurah(ctx.query.chapter);

  //@ts-ignore
  if (surah.message && !surah.surahInfo) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }
  return {
    props: surah
  };
};