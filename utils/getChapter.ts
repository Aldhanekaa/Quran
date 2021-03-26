import {
  ErrorMessage,
  surahInfoType,
  chapter,
  Surah
} from "../types/interfaces";

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
): Promise<Surah | ErrorMessage> {
  try {
    const Chapter = await axios.get<ChapterResponse>(
      `https://api.quran.com/api/v4/chapters/${chapterID}?language=en`
    );
    const chapterInfo = await axios.get<surahInfoResponse>(
      `https://api.quran.com/api/v4/chapters/${chapterID}/info?language=en`
    );
    return {
      surah: Chapter.data.chapter,
      surahInfo: chapterInfo.data.chapter_info
    };
  } catch (err) {
    // console.log(err);
    return {
      message: "error"
    };
  }
}
