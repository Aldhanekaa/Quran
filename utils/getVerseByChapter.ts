import { ErrorMessage, VerseByChapterFetchResult } from "../types/interfaces";

import axios from "axios";

export default async function fetchSurah(
  chapterID: number
): Promise<VerseByChapterFetchResult | ErrorMessage> {
  try {
    const chapterVerses = await axios.get<VerseByChapterFetchResult>(
      "https://api.quran.com/api/v4/verses/by_chapter/1?language=en&words=true&audio=7&word_fields=text_indopak&page=1&per_page=10"
    );
    return {
      ...chapterVerses.data
    };
  } catch {
    return {
      message: "error"
    };
  }
}
