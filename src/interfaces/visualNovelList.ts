export interface IVisualNovels {
  code: string;
  title: string;
  hasDownloadUrls: boolean;
}

export interface IVisualNovelsFilter {
  keyword: string;
  page: number;
  isBot: boolean;
  hasDownloadUrl: boolean;
}
