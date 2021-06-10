import { NextApiRequest, NextApiResponse } from "next";
import { Verse, chapters, chapter } from "@/ts/interfaces";

import axios from "axios";

type SearchT = "all" | "verse" | "surah";
const SearchTypes = ["all", "verse", "surah"];

// @ts-ignore
interface verseAPI extends NextApiRequest {
  query: {
    type?: SearchT;
    q: string;
    searchNameInput: string;
  };
}

interface VerseFetchResult {
  verse: Verse;
}

// if there was no `searchType` on query then in default client will receive surah name based on their searchInput

export default async function getVerseById(
  req: verseAPI,
  res: NextApiResponse
) {
  console.log(req.query);
  let { searchNameInput, q, type } = req.query;

  if (!type) {
    type = "surah";
  }
  if (type && !SearchTypes.includes(type)) {
    type = "surah";
  }

  let totalVerses: number = 0;
  let surahVerse = 0;
  let surah = 0;

  const Response: { chapters?: chapter[] } = {};

  if (type == "surah" || type == "all") {
    //@ts-ignore
    const {
      data: { chapters }
    } = await axios.get<chapters>(
      `https://api.quran.com/api/v4/chapters?language=en`
    );
    Response.chapters = [];
    for (let i = 0; i < chapters.length; i++) {
      if (chapters[i].name_simple.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        Response.chapters.push(chapters[i]);
      }
    }
  }

  if (type == "verse" || type == "all") {
    // //@ts-ignore
    // const {
    //   data: { chapters }
    // } = await axios.get<chapters>(
    //   `https://api.quran.com/api/v4/chapters?language=en`
    // );
    // Response.chapters = [];
    // for (let i = 0; i < chapters.length; i++) {
    //   if (
    //     chapters[i].name_simple.toLowerCase().indexOf(q.toLowerCase()) > -1
    //   ) {
    //     Response.chapters.push(chapters[i]);
    //   }
    // }
  }

  //   for (let i = 0; i < chapters.length; i++) {
  //     if (totalVerses <= parseInt(req.query.verseID)) {
  //       // console.log(
  //       //   totalVerses,
  //       //   chapters[i].verses_count,
  //       //   parseInt(req.query.verseID),
  //       //   chapters[i].id
  //       // );

  //       surah = chapters[i].id;
  //       surahVerse = parseInt(req.query.verseID) - totalVerses;
  //     }

  //     totalVerses += chapters[i].verses_count;
  //   }

  //   if (req.query.showVerseFetch) {
  //     //@ts-ignore
  //     const verse = await axios.get<VerseFetchResult>(
  //       `https://api.quran.com/api/v4/verses/by_key/${surah}:${surahVerse}?language=en&words=true&word_fields=text_uthmani&audio=7`
  //     );
  //     res.status(200).json({ verse: verse.data.verse, surah, surahVerse });
  //     return;
  //   }

  //   if (parseInt(req.query.verseID) > totalVerses) {
  //     res.json({ message: "verse not found" });
  //     return;
  //   }

  res.json({ msg: "success!", response: Response });
}
