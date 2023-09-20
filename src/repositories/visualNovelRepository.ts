import {VisualNovelModel} from '../models/VisualNovel';

export default class VisualNovelRepository {
  private static readonly VNModel = VisualNovelModel();

  /**
   * Get List of Visual Novels
   *
   * @param keyword string
   * @param page number
   * @returns Promise<any>
   */
  public static async all(keyword: string, page: number) {
    let response;
    let total: number;

    if (keyword === '') {
      response = await this.VNModel.find({downloadUrl: {$exists: true}})
        .select('code title -_id')
        .sort({code: 1})
        .limit(25)
        .skip(25 * (page - 1))
        .collation({locale: 'en_US', numericOrdering: true});
      total = Math.ceil(
        (await this.VNModel.countDocuments({downloadUrl: {$exists: true}})) / 25
      );
    } else {
      response = await this.VNModel.find(
        {
          $text: {
            $search: keyword,
          },
          downloadUrl: {$exists: true},
        },
        {
          code: 1,
          title: 1,
          _id: 0,
        }
      )
        .limit(25)
        .skip(25 * (page - 1))
        .sort({score: {$meta: 'textScore'}})
        .collation({locale: 'en_US', numericOrdering: true});
      total = Math.ceil(response.length / 25);
    }
    return {
      list: response,
      total: total,
    };
  }
}

// const list = async (keyword = "", page = 1) => {
//   try {
//     if (keyword === "") {
//       const response = await VisualNovel.find(
//         { downloadUrl: { $exists: true } })
//         .select('code title -_id').sort({ 'code': 1 }).limit(25).skip(25 * (page - 1))
//         .collation({ locale: "en_US", numericOrdering: true });
//       const count = Math.ceil(await VisualNovel.countDocuments({ downloadUrl: { $exists: true } }) / 25);
//       return {
//         list: response,
//         total: count
//       };
//     }
//     else {
//       const response = await VisualNovel.find(
//         {
//           $text: {
//             $search: keyword
//           },
//           downloadUrl: { $exists: true }
//         }, {
//         code: 1,
//         title: 1,
//         _id: 0
//       })
//         .limit(25).skip(25 * (page - 1))
//         .sort({ 'score': { $meta: "textScore" } })
//         .collation({ locale: "en_US", numericOrdering: true });
//       const count = Math.ceil(response.length / 25);
//       return {
//         list: response,
//         total: count
//       };
//     }
//   }
//   catch (err) {
//     throw err;
//   }
// }

// const findOne = async (code) => {
//   try {
//     return await VisualNovel.findOne({ code: code, downloadUrl: { $exists: true } })
//       .select('code title downloadUrl');
//   }
//   catch (err) {
//     throw err;
//   }
// }

// const getTitle = async (code) => {
//   try {
//     return await VisualNovel.findOne({ code: code })
//       .select('title downloadUrl');
//   }
//   catch (err) {
//     throw err;
//   }
// }

// const update = async (code, data, mode = 'store') => {
//   try {
//     return await VisualNovel.updateOne({ code: code, downloadUrl: { $exists: !(mode === 'store') } },
//       { downloadUrl: data }, { runValidators: true })
//   }
//   catch (err) {
//     throw err;
//   }
// }

// const drop = async (code) => {
//   try {
//     return await VisualNovel.updateOne({ code: code, downloadUrl: { $exists: true } },
//       { $unset: { downloadUrl: 1 } });
//   }
//   catch (err) {
//     throw err;
//   }
// }

// export default {
//   list, findOne, update, drop, getTitle
// }
