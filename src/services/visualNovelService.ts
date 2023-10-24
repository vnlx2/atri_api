import {
  IVisualNovels,
  IVisualNovelsFilter,
} from '../interfaces/visualNovelList';
import VisualNovelRepository, {
  IVisualNovelFilter,
} from '../repositories/visualNovelRepository';
import {IVisualNovel, VisualNovelOutput} from '../interfaces/visualNovel';

export default class VisualNovelService {
  /**
   * Get List of Visual Novels
   *
   * @param filter IVisualNovelsFilter
   * @return Promise<any>
   */
  public static async list(filter: IVisualNovelsFilter) {
    const searchFilter: IVisualNovelFilter =
      filter.keyword !== ''
        ? {
            $text: {
              $search: filter.keyword,
            },
          }
        : {};

    if (filter.hasDownloadUrl) {
      searchFilter.downloadUrl = {$exists: true};
    }

    const result = await VisualNovelRepository.all(filter, searchFilter);
    return {
      total: result.total,
      list: result.list.map((visualNovel): IVisualNovels => {
        return {
          code: visualNovel.code,
          title: visualNovel.title,
          hasDownloadUrls: visualNovel.downloadUrl !== undefined,
        };
      }),
    };
  }

  /**
   * Get Visual Novel Detail
   *
   * @param code string
   * @return Promise<IVisualNovel>
   */
  public static async detail(code: string): Promise<IVisualNovel> {
    const visualNovel = await VisualNovelRepository.detail(code);
    if (!visualNovel) {
      throw new Error('VN_NOT_FOUND');
    }
    return new VisualNovelOutput(visualNovel);
  }

  /**
   * Store
   *
   * @param body IVisualNovel
   * @returns Promise<any>
   */
  public static async store(body: IVisualNovel) {
    return await VisualNovelRepository.store({
      code: body.code,
      title: body.title,
      alias: body.alias,
      length: body.length,
      rating: body.rating,
      description: body.description ?? '-',
      image: body.image,
      downloadUrl: body.downloadUrl,
    });
  }

  /**
   * Update
   *
   * @param body IVisualNovel
   * @returns Promise<any>
   */
  public static async update(body: IVisualNovel) {
    return await VisualNovelRepository.update(body.code, {
      code: body.code,
      title: body.title,
      alias: body.alias,
      length: body.length,
      rating: body.rating,
      description: body.description ?? '-',
      image: body.image,
      downloadUrl: body.downloadUrl,
    });
  }

  /**
   * Delete
   *
   * @param code string
   * @returns Promise<any>
   */
  public static async delete(code: string) {
    const visualNovel = await VisualNovelRepository.detail(code);
    if (!visualNovel) {
      throw new Error('VN_NOT_FOUND');
    }
    return await VisualNovelRepository.delete(code);
  }
}
