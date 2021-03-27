import { ErrorMessage, VerseByChapterFetchResult } from "../ts/interfaces";

import axios from "axios";

export default async function fetchSurah(
  chapterID: number
): Promise<VerseByChapterFetchResult | false> {
  try {
    const chapterVerses = await axios.get<VerseByChapterFetchResult>(
      `https://api.quran.com/api/v4/verses/by_chapter/${chapterID}?language=en&words=true&translations=131&word_fields=text_uthmani&page=1&per_page=10&audio=7`
    );
    return {
      ...chapterVerses.data
    };
  } catch {
    return false;
  }
}
