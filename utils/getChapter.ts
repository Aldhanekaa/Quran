import {
  ErrorMessage,
  surahInfoType,
  chapter,
  SurahResult
} from "../ts/interfaces";

import axios from "axios";
interface B {
  a: string;
}

interface ChapterResponse {
  chapter: chapter;
}
interface surahInfoResponse {
  chapter_info: surahInfoType;
}
export default async function fetchSurah(
  chapterID: number
): Promise<SurahResult> {
  try {
    const Chapter = await axios.get<ChapterResponse>(
      `https://api.quran.com/api/v4/chapters/${chapterID}?language=en`
    );
    const chapterInfo = await axios.get<surahInfoResponse>(
      `https://api.quran.com/api/v4/chapters/${chapterID}/info?language=en`
    );
    return {
      surah: Chapter.data.chapter,
      surahInfo: chapterInfo.data.chapter_info,
      message: "success"
    };
  } catch (err) {
    // console.log(err);
    return {
      message: "error"
    };
  }
}
