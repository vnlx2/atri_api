const lengths: Record<number, string> = {
  1: 'Very Short',
  2: 'Short',
  3: 'Medium',
  4: 'Long',
  5: 'Very Long',
};

export interface IVisualNovel {
  code: string;
  title: string;
  alias?: string;
  length: number | string;
  rating: number;
  description?: string;
  image: string;
  downloadUrl?: {
    jp_link?: {
      provider: string;
      type: string;
      platform: string;
      url: string;
    };
    en_link?: {
      provider: string;
      type: string;
      platform: string;
      url: string;
    };
    id_link?: {
      provider: string;
      type: string;
      platform: string;
      url: string;
    };
  };
}

export class VisualNovelOutput implements IVisualNovel {
  code: string;
  title: string;
  alias?: string;
  length: number | string;
  rating: number;
  description?: string;
  image: string;
  downloadUrl?: {
    jp_link?: {
      provider: string;
      type: string;
      platform: string;
      url: string;
    };
    en_link?: {
      provider: string;
      type: string;
      platform: string;
      url: string;
    };
    id_link?: {
      provider: string;
      type: string;
      platform: string;
      url: string;
    };
  };

  constructor(visualNovel: IVisualNovel) {
    this.code = visualNovel.code;
    this.title = visualNovel.title;
    this.alias = visualNovel.alias;
    this.length =
      typeof visualNovel.length !== 'number' ? 1 : visualNovel.length;
    this.rating = visualNovel.rating;
    this.description = visualNovel.description
      ?.replace(/</g, '&lt;')
      ?.replace(/>/g, '&gt;')
      ?.replace(/\n/g, '<br>');
    this.image = visualNovel.image;
    this.downloadUrl = visualNovel.downloadUrl;
  }
}

export class VisualNovelBotOutput extends VisualNovelOutput {
  length: number | string;

  constructor(visualNovel: IVisualNovel) {
    super(visualNovel);
    this.length = lengths[visualNovel.length as number];
  }
}
