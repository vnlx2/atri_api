import {IVisualNovelsFilter} from '../interfaces/visualNovelList';
import {VisualNovelModel} from '../models/VisualNovel';
import {IVisualNovel} from '../interfaces/visualNovel';

export interface IVisualNovelFilter {
  $text?: {
    $search: string;
  };
  downloadUrl?: {
    $exists: boolean;
  };
}

export default class VisualNovelRepository {
  private static readonly VNModel = VisualNovelModel;
  private static readonly BOT_NUMBER_RESULT = 5;
  private static readonly ADMIN_NUMBER_RESULT = 25;

  /**
   * Get List of Visual Novels
   *
   * @param searchFilter IVisualNovelFilter
   * @returns Promise<any>
   */
  public static async all(
    filter: IVisualNovelsFilter,
    searchFilter: IVisualNovelFilter
  ) {
    const response = await this.VNModel.find(searchFilter)
      .select('code title downloadUrl -_id')
      .sort({code: 1})
      .limit(filter.isBot ? this.BOT_NUMBER_RESULT : this.ADMIN_NUMBER_RESULT)
      .skip(
        (filter.isBot ? this.BOT_NUMBER_RESULT : this.ADMIN_NUMBER_RESULT) *
          (filter.page - 1)
      )
      .collation({locale: 'en_US', numericOrdering: true});

    const total = await this.VNModel.countDocuments({});

    return {
      list: response,
      total: total,
    };
  }

  /**
   * Get Visual Novel Detail
   *
   * @param code string
   * @returns
   */
  public static async detail(code: string) {
    return await this.VNModel.findOne(
      {code: code},
      {
        _id: 0,
        __v: 0,
        'downloadUrl._id': 0,
        'downloadUrl.en_link._id': 0,
        'downloadUrl.jp_link._id': 0,
        'downloadUrl.id_link._id': 0,
      }
    );
  }

  /**
   * Store
   *
   * @param body IVisualNovel
   * @returns Promise<any>
   */
  public static async store(body: IVisualNovel) {
    return await new VisualNovelModel(body).save();
  }

  /**
   * Update
   *
   * @param code string
   * @param body IVisualNovel
   * @returns Promise<any>
   */
  public static async update(code: string, body: IVisualNovel) {
    return await VisualNovelModel.updateOne(
      {code: code},
      {
        title: body.title,
        alias: body.alias,
        length: body.length,
        rating: body.rating,
        description: body.description,
        image: body.image,
        downloadUrl: body.downloadUrl,
      }
    );
  }

  /**
   * Delete
   *
   * @param code string
   * @returns Promise<any>
   */
  public static async delete(code: string) {
    return await VisualNovelModel.deleteOne({code: code});
  }
}
