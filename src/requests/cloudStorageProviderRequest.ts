import {ICloudStorageProvider} from '../interfaces/cloudStorageProvider';

export default {
  data: {
    isArray: true,
    custom: {
      options: (value: ICloudStorageProvider[]) => {
        if (!Array.isArray(value)) return false;
        for (const data in value) {
          if (typeof value[data].code !== 'string') return false;
          if (typeof value[data].name !== 'string') return false;
        }
        return true;
      },
    },
    errorMessage: 'Invalid data structure',
  },
};
