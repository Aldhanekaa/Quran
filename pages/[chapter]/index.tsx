import React, {
  useEffect,
  useState,
  useRef,
  Fragment,
  createContext,
  useMemo,
  useCallback
} from "react";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

/* ======================= UI ======================= */
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import { Text, useDisclosure } from "@chakra-ui/react";

import BismillahTextComponent from "components/BismillahText";
import Tab from "@/components/Surah/Tab";
import Hero from "@/components/Surah/Hero";
import { Toolbar } from "@material-ui/core";
import ModalShare from "@/components/Surah/ModalShare";

/* ======================= END UI ======================= */

import {
  VerseByChapterFetchResult,
  SurahResult,
  surahInfoType,
  chapter
} from "@/ts/interfaces";

import FetchVerses from "../../utils/getVerseByChapter";
import FetchSurah from "../../utils/getChapter";

interface shareModalDataRef {
  verse: string;
  translation: string;
}

export const ChapterContext = createContext<{
  BismillahText?: JSX.Element | JSX.Element[];
  SurahInfo?: surahInfoType;
  surahVerses?: VerseByChapterFetchResult | false;
  surah?: chapter;
  modalShare: {
    isModalShareOpen: boolean;
    closeModalShare: () => void;
    shareModalData: shareModalDataRef;
    handleShareModal: (verse: string, translation: string) => void;
  };
  FetchMoreVerse: () => void;
  currentPage: {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
  };
}>({
  // @ts-ignore
  modalShare: {
    isModalShareOpen: false
  }
});

export default function Chapter(props: {
  surah: SurahResult;
  currentPage: number;
}) {
  const router = useRouter();
  let [currentPage, setCurrentPage] = useState<number>(() => props.currentPage);

  let [BismillahText, setBismillahText] = useState<JSX.Element>(<p></p>);

  const {
    isOpen: isModalShareOpen,
    onOpen: openModalShare,
    onClose: closeModalShare
  } = useDisclosure();

  const shareModalData = useRef<shareModalDataRef>({
    verse: "",
    translation: ""
  });
  const [surahVerses, changeVerses] = useState<
    VerseByChapterFetchResult | false
  >();

  const [Surah, setSurah] = useState<SurahResult>(() => {
    return props.surah;
  });

  const FetchMoreVerse = useCallback(async () => {
    if (
      surahVerses &&
      // @ts-ignore
      currentPage < surahVerses.pagination.total_pages
    ) {
      if (router.query.chapter) {
        setCurrentPage(++currentPage);

        window.history.pushState(
          {},
          "",
          // @ts-ignore
          `/${props.surah.surah.id}/?page=${currentPage}`
        );
        // @ts-ignore
        const verses = await FetchVerses(
          Number(router.query.chapter),
          currentPage
        );

        if (verses) {
          const PP = Object.assign({}, surahVerses, {
            verses: [/*...surahVerses.verses,*/ ...verses.verses]
          });
          changeVerses(PP);
          window.scrollTo(0, 0);

          // console.log(surahVerses);
        }
      }
    }
  }, [surahVerses]);

  const handleShareModal = useCallback(
    (verse: string, translation: string) => {
      shareModalData.current.verse = verse;
      shareModalData.current.translation = translation;

      openModalShare();
    },
    [shareModalData]
  );

  // @ts-ignore
  useEffect(async () => {
    if (router.query.chapter) {
      // @ts-ignore
      const verses = await FetchVerses(
        Number(router.query.chapter),
        currentPage
      );

      changeVerses(verses);
    }

    if (Surah.surah && Surah.surah.bismillah_pre) {
      setBismillahText(<BismillahTextComponent />);
    } else {
      setBismillahText(<Toolbar />);
    }
  }, [props.surah]);

  return (
    <Fragment>
      {props.surah?.surah ? (
        <NextSeo
          title={`${props.surah?.surah.name_simple} - QuranKu Website`}
          description={`${props.surah.surahInfo?.short_text}`}
          canonical={process.env.PUBLIC_URL}
          openGraph={{
            url: process.env.PUBLIC_URL,
            title: "QuranKu Website Read Quran For Free",
            description:
              "QuranKu Website - Read Quran and Meditate with Quran online"
          }}
        />
      ) : (
        ""
      )}

      <ChapterContext.Provider
        value={{
          currentPage: {
            setCurrentPage: setCurrentPage,
            currentPage: currentPage
          },
          surah: props.surah.surah,
          BismillahText: BismillahText,
          SurahInfo: Surah.surahInfo,
          surahVerses: surahVerses,
          modalShare: {
            isModalShareOpen: isModalShareOpen,
            closeModalShare: closeModalShare,
            handleShareModal: handleShareModal,
            shareModalData: shareModalData.current
          },
          FetchMoreVerse: FetchMoreVerse
        }}
      >
        <div style={{ marginTop: "50px" }}>
          {/* Share modal for each verse */}
          <ModalShare verse={shareModalData.current.verse} />
          {/* Share modal for each verse */}

          {/* @ts-ignore */}
          {Surah.message != "error" && Surah.surah && (
            <>
              {/* @ts-ignore */}
              <Hero
                // @ts-ignore
                surah_name={props.surah.surah.name_simple}
                //  @ts-ignore
                verses_count={props.surah.surah.verses_count}
                // @ts-ignore
                desc={props.surah.surahInfo.short_text}
                // @ts-ignore
                revelation_place={props.surah.surah.revelation_place}
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
          {surahVerses && <Tab />}
        </div>
      </ChapterContext.Provider>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps<{
  surah: SurahResult;
  currentPage: number;
}> = async (ctx) => {
  // const verses = await FetchVerses(router.query.verse);

  // @ts-ignore
  let { page, chapter }: { page: number; chapter: string } = ctx.query;

  if (Array.isArray(page)) {
    page = 0;
  }

  page = Number(page);

  if (isNaN(page)) {
    page = 0;
  }
  //@ts-ignore
  const surah = await FetchSurah(chapter, page);
  // console.log(page);

  //@ts-ignore
  if (surah.message && !surah.surahInfo) {
    return {
      notFound: true
    };
  }

  if (page <= 0) {
    return {
      redirect: {
        destination: `/${chapter}/?page=1`,
        permanent: true
      }
    };
  }

  return {
    props: {
      surah: surah,
      currentPage: page
    }
  };
};
