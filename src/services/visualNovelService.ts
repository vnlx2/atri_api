import VisualNovelRepository from '../repositories/visualNovelRepository';

export default class VisualNovelService {
  /**
   * Get List of Visual Novels
   *
   * @param keyword string
   * @param page number
   * @return Promise<any>
   */
  public static async list(keyword: string, page: number) {
    const visualNovels = await VisualNovelRepository.all(keyword, page);
    return visualNovels;
  }
}

// // Store Visual Novel
// const store = async (body) => {
//     try {
//         const visualNovel = await visualNovelRepository.findOne(body.code)
//         if(visualNovel) {
//             throw { code: 400, message: 'VN Download Link was exists' };
//         }
//         const downloadUrls = {...convertFormFormatToDBFormat(body)};
//         await visualNovelRepository.update(body.code, downloadUrls);
//         return { code: 201 };
//     } catch (err) {
//         throw err;
//     }
// };

// const list = async (keyword, page) => {
//     try {
//         const visualNovels = await visualNovelRepository.list(keyword, page);
//         return { code: 200, data: visualNovels };
//     }
//     catch (err) {
//         throw err;
//     }
// }

// const detail = async (code) => {
//     try {
//         const visualNovel = await visualNovelRepository.findOne(code)
//         if(!visualNovel) {
//             throw { code: 404, message: 'Not Found' };
//         }
//         const response = { 
//             code: visualNovel.code,
//             title: visualNovel.title,
//             downloadUrl: convertDBFormatToFormFormat(visualNovel.downloadUrl) 
//         };
//         return { code: 200, data: response };
//     } catch (err) {
//         throw err;
//     }
// }

// const getTitle = async (code) => {
//     try {
//         const visualNovel = await visualNovelRepository.getTitle(code);
//         if (!visualNovel) {
//             throw { name: 'VN_NOT_FOUND', message: 'Not Found' };
//         }
//         if (visualNovel['downloadUrl'] != undefined) {
//             throw { name: 'VN_REGISTERED', message: 'This visual novel already has a download link' };
//         }
//         return visualNovel.title;
//     } catch (err) {
//         throw err;
//     }
// }

// const update = async(body) => {
//     try {
//         const visualNovel = await visualNovelRepository.findOne(body.code)
//         if(!visualNovel) {
//             throw { code: 404, message: 'VN Not Found' };
//         }
//         const downloadUrls = {...convertFormFormatToDBFormat(body)};
//         await visualNovelRepository.update(body.code, downloadUrls, 'update');
//         return { code: 200 };
//     } catch (err) {
//         throw err;
//     }
// }

// const drop = async(code) => {
//     try {
//         const visualNovel = await visualNovelRepository.findOne(code);
//         if(!visualNovel) {
//             throw { code: 404, message: 'VN Not Found' };
//         }
//         await visualNovelRepository.drop(code);
//         return { code: 200 };
//     } catch (err) {
//         throw err;
//     }
// }

// const convertFormFormatToDBFormat = (body) => {
//     try {
//         let result = {
//             jp_link: [],
//             en_link: [],
//             id_link: []
//         };
//         Object.values(body.downloadUrl).forEach(urlData => {
//             const language = urlData.language;
//             delete urlData['language'];
//             if(language == 'JP') {
//                 result.jp_link.push(urlData);
//             }
//             else if(language == 'EN') {
//                 result.en_link.push(urlData);
//             }
//             else {
//                 result.id_link.push(urlData);
//             }
//         });
//         return result;
//     } catch (err) {
//         throw err;
//     }
// }

// const convertDBFormatToFormFormat = (query) => {
//     try {
//         let result = {};
//         if(Object.keys(query.jp_link).length > 0) {
//             Object.values(query.jp_link).forEach(urlData => {
//                 result[urlData._id] = createFormFormat(urlData, 'JP');
//             });
//         }
//         if(Object.keys(query.en_link).length > 0) {
//             Object.values(query.en_link).forEach(urlData => {
//                 result[urlData._id] = createFormFormat(urlData, 'EN');
//             });
//         }
//         if(Object.keys(query.id_link).length > 0) {
//             Object.values(query.id_link).forEach(urlData => {
//                 result[urlData._id] = createFormFormat(urlData, 'ID');
//             });
//         }
//         return result;
//     }  catch (err) {
//         throw err;
//     }
// }

// const createFormFormat = (urlData, language) => {
//     return {
//         language: language,
//         provider: urlData.provider,
//         type: urlData.type,
//         url: urlData.url,
//         _id: urlData._id
//     }
// }

// export default {
//     list,
//     store, 
//     detail,
//     getTitle,
//     update,
//     drop,
// };