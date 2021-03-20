export type chapter = {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_complex: boolean;
  name_arabic: boolean;
  verses_count: boolean;
  pages: number[];
  name_simple: string;
  translated_name: {
    language_name: string;
    name: string;
  };
};

export type surahListDialog = {
  id: number;
  open: boolean;
  surahInfo: surahInfoType;
  surah: chapter;
};

export type surahInfoType = {
  short_text?: string;
  source?: string;
  text?: string;
  message?: string;
};

export type chapters = {
  chapters: chapter[];
};

export type fetchChapters = {
  data?: chapters;
  error?: any;
};
