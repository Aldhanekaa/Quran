// Juz model
export type juzModel = {
  id: number;
  juz_number: number;
  verse_mapping: Object;
  first_verse_id: number;
  last_verse_id: number;
  verses_count: number;
};

// Chapter Model
export type chapter = {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_complex: boolean;
  name_arabic: boolean;
  verses_count: number;
  pages: number[];
  name_simple: string;
  translated_name: {
    language_name: string;
    name: string;
  };
};

// List Surah Model
export type surahListDialog = {
  id: number;
  open: boolean;
  surah: Surah;
};

// surah
export type Surah = {
  surahInfo: surahInfoType;
  surah: chapter;
};

// surah data fetch result
export type SurahResult = {
  surahInfo?: surahInfoType;
  surah?: chapter;
  message: string;
};

// Surah / Chapter Info Model
export type surahInfoType = {
  short_text?: string;
  source?: string;
  text?: string;
  message?: string;
};

// chapters model
export type chapters = {
  chapters: chapter[];
};

// output of fetching chapter list
export type fetchChapters = {
  data?: chapters;
  error?: any;
};

// error message
export type ErrorMessage = {
  message: string;
};

// verses by chapter fetch result
export type VerseByChapterFetchResult = {
  verses: Verse[];
  pagination: Pagination;
};

// verse model
export type Verse = {
  id: number;
  chapter_id?: Number;
  verse_number: number;
  verse_key: string;
  verse_index: number;
  text_uthmani?: string;
  text_uthmani_simple?: string;
  text_imlaei?: string;
  text_imlaei_simple?: string;
  text_indopak?: string;
  text_uthmani_tajweed?: string;
  juz_number: number;
  hizb_number: number;
  rub_number: number;
  sajdah_type: null;
  sajdah_number: null;
  page_number: number;
  image_url?: string;
  image_width?: number;
  words: Word[];
  audio?: AudioFile;
  translations: Translation[];
};

export type Translation = {
  resource_id: number;
  resource_name?: string;
  id?: number;
  text: string;
};

// Audio File
export type AudioFile = {
  url?: string;
  duration?: number;
  format?: string;
  segments: Array<any>;
};

//

// word model
export type Word = {
  id?: number;
  position: number;
  text_uthmani?: string;
  text_indopak?: string;

  text_imlaei?: string;
  verse_key?: string;
  page_number?: number;
  line_number?: number;
  audio_url: string;
  location?: string;
  char_type_name: string;

  code_v1?: string;

  code_v2?: string;

  translation: {
    text?: string;
    language_name?: string;
  };
  transliteration: {
    language_name?: string;
  };
};

// Pagination Model
export type Pagination = {
  per_page?: number;
  current_page: number;
  next_page: number;
  total_pages: number;
  total_records?: number;
};

// chapstr
