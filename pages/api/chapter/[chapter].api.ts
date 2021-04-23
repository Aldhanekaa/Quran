import { NextApiRequest, NextApiResponse } from "next";
import { chapter, chapters } from "@/ts/interfaces";

import axios from "axios";

// @ts-ignore
interface verseAPI extends NextApiRequest {
  query: {
    chapter: string;
    showVerseFetch?: boolean;
  };
}

export default async function getVerseById(
  req: verseAPI,
  res: NextApiResponse
) {
  console.log(req.query.chapter);
  const chapter = req.query.chapter.toLowerCase();

  //@ts-ignore
  const {
    data: { chapters }
  } = await axios.get<chapters>(
    `https://api.quran.com/api/v4/chapters?language=en`
  );

  let found: chapter[] = [];
  console.log(chapters);

  for (let i = 0; i < chapters.length; i++) {
    console.log(chapters[i].name_simple);
    if (chapters[i].name_simple.toLowerCase().indexOf(chapter) > -1) {
      found.push(chapters[i]);
    }
  }

  res.json({ chapters: found });
}
