import {Request, Response} from 'express';
import {errorResponse, successResponse} from '../utils/responseHelper';
import VisualNovelService from '../services/visualNovelService';
import {validationResult} from 'express-validator';

export default class VisualNovelController {
  /**
   * Get All List
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async list(req: Request, res: Response) {
    try {
      const visualNovels = await VisualNovelService.list({
        keyword: String(req.query.keyword ?? ''),
        page: Number(req.query.page ?? 1),
        isBot: Boolean(req.query.isBot ?? false),
        hasDownloadUrl: Boolean(req.query.hasDownloadUrl ?? false),
      });
      if (!visualNovels) {
        return successResponse(res, 200, 'Empty Data', []);
      }
      return successResponse(res, 200, 'Fetch Visual Novel List Success', {
        page: Number(req.query.page ?? 1),
        ...visualNovels,
      });
    } catch (err: unknown) {
      return errorResponse(
        res,
        500,
        'INTERNAL_SERVER_ERROR',
        'Fetch Visual Novel List Failed',
        err
      );
    }
  }

  /**
   * Get Visual Novel Detail
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async detail(req: Request, res: Response) {
    try {
      const visualNovel = await VisualNovelService.detail(req.params.id);
      return successResponse(
        res,
        200,
        'Fetch Visual Novel Detail Success',
        visualNovel
      );
    } catch (err: unknown) {
      return errorResponse(
        res,
        500,
        'INTERNAL_SERVER_ERROR',
        'Fetch Visual Novel Detail Failed',
        err
      );
    }
  }

  /**
   * Store Visual Novel
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async store(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(
          res,
          400,
          'VALIDATION_ERROR',
          'Input Validation Error',
          errors.array()
        );
      }
      await VisualNovelService.store(req.body);
      return successResponse(res, 201, 'Store Visual Novel Data Success');
    } catch (err: unknown) {
      return errorResponse(
        res,
        500,
        'INTERNAL_SERVER_ERROR',
        'Store Visual Novel Data Failed',
        err
      );
    }
  }

  /**
   * Update Visual Novel
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async update(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(
          res,
          400,
          'VALIDATION_ERROR',
          'Input Validation Error',
          errors.array()
        );
      }
      await VisualNovelService.update(req.body);
      return successResponse(res, 200, 'Update Visual Novel Data Success');
    } catch (error) {
      return errorResponse(
        res,
        500,
        'INTERNAL_SERVER_ERROR',
        'Update Visual Novel Data Failed',
        error
      );
    }
  }

  /**
   * Delete Visual Novel
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async delete(req: Request, res: Response) {
    try {
      await VisualNovelService.delete(req.params.id);
      return successResponse(res, 200, 'Delete Visual Novel Data Success');
    } catch (error) {
      return errorResponse(
        res,
        500,
        'INTERNAL_SERVER_ERROR',
        'Delete Visual Novel Data Failed',
        error
      );
    }
  }
}
