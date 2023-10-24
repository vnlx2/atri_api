import VisualNovelRepository from '../repositories/visualNovelRepository';

interface ILink {
  provider: string;
  type: string;
  platform: string;
  url: string;
}

const linkSchema = {
  optional: true,
  isArray: true,
  custom: {
    options: (value: ILink[]) => {
      if (!Array.isArray(value)) return false;
      for (const link of value) {
        if (typeof link !== 'object') return false;
        if (!link.provider || !link.type || !link.platform || !link.url) {
          return false;
        }
      }
      return true;
    },
  },
  errorMessage: 'Invalid link structure',
};

export default {
  code: {
    exists: {errorMessage: 'Code must be exists'},
    isString: {errorMessage: 'Code must be string'},
    customSanitizer: {
      options: (value: string) => value.replace(/^v/, ''),
    },
    custom: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options: async (value: string, {req}: {req: any}) => {
        const result = await VisualNovelRepository.detail(value);
        if (req.method === 'POST' && result) {
          return Promise.reject();
        } else if (req.method === 'PUT' && !result) {
          return Promise.reject();
        }
        return Promise.resolve();
      },
      errorMessage: 'Code already exists',
    },
  },
  title: {
    exists: {errorMessage: 'Title must be exists'},
    isString: {errorMessage: 'Title must be string'},
  },
  aliases: {
    optional: true,
    isString: {errorMessage: 'Aliases must be string'},
  },
  length: {
    exists: {errorMessage: 'Length must be exists'},
    isInt: {
      options: {
        min: 1,
        max: 5,
      },
      errorMessage: 'Length must be between 1 and 5',
    },
  },
  rating: {
    exists: {errorMessage: 'Rating must be exists'},
    isFloat: {
      options: {
        min: 1,
        max: 10,
      },
      errorMessage: 'Rating must be between 1 and 10',
    },
  },
  description: {
    optional: true,
    isString: {errorMessage: 'Description must be string'},
    escape: true,
  },
  image: {
    optional: true,
    isURL: {errorMessage: 'Image must be url'},
  },
  'downloadUrl.jp_link': linkSchema,
  'downloadUrl.en_link': linkSchema,
  'downloadUrl.id_link': linkSchema,
};
