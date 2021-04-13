/* ======================= UI ======================= */

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import { Text, useDisclosure } from "@chakra-ui/react";
/* ======================= END UI ======================= */

import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";
import {
  VerseByChapterFetchResult,
  SurahResult,
  surahInfoType,
  chapter
} from "@/ts/interfaces";
import { useRouter } from "next/router";
import {
  useEffect,
  useState,
  useRef,
  Fragment,
  createContext,
  useMemo,
  useCallback
} from "react";
import styled from "@emotion/styled";

import Tab from "@/components/Surah/Tab";
import Hero from "@/components/Surah/Hero";
import { Toolbar } from "@material-ui/core";
import ModalShare from "@/components/Surah/ModalShare";

import FetchVerses from "../../utils/getVerseByChapter";
import FetchSurah from "../../utils/getChapter";

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
  currentPage: number;
}>({
  // @ts-ignore
  modalShare: {
    isModalShareOpen: false
  }
});

export default function Chapter(props: SurahResult) {
  let currentPage = useRef(1);

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

  const router = useRouter();

  const [surahVerses, changeVerses] = useState<
    VerseByChapterFetchResult | false
  >();

  const [Surah, setSurah] = useState<SurahResult>(() => {
    return props;
  });

  const FetchMoreVerse = useCallback(async () => {
    // surahVerses?.valueOf
    // console.log(surahVerses.pagination.total_pages, currentPage);
    if (
      surahVerses &&
      // @ts-ignore
      currentPage.current < surahVerses.pagination.total_pages
    ) {
      if (router.query.chapter) {
        currentPage.current += 1;

        // @ts-ignore
        const verses = await FetchVerses(
          Number(router.query.chapter),
          currentPage.current
        );

        if (verses) {
          const PP = Object.assign({}, surahVerses, {
            verses: [...surahVerses.verses, ...verses.verses.slice(1)]
          });
          changeVerses(PP);
          console.log(surahVerses);
        }
      }
    }
  }, [surahVerses]);

  // @ts-ignore
  useMemo(async () => {
    currentPage.current = 1;
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

  const handleShareModal = useCallback(
    (verse: string, translation: string) => {
      shareModalData.current.verse = verse;
      shareModalData.current.translation = translation;

      openModalShare();
    },
    [shareModalData]
  );

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

      <ChapterContext.Provider
        value={{
          currentPage: currentPage.current,
          surah: props.surah,
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
          {surahVerses && <Tab />}
        </div>
      </ChapterContext.Provider>
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
      notFound: true
    };
  }
  return {
    props: surah
  };
};
