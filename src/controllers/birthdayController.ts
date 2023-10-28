import {Request, Response} from 'express';
import BirthdayService from '../services/birthdayService';
import {errorResponse, successResponse} from '../utils/responseHelper';
import {validationResult} from 'express-validator';

export default class BirthdayController {
  private static readonly birthdayService = new BirthdayService();

  /**
   * Get All
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async all(req: Request, res: Response) {
    try {
      const birthdays =
        await BirthdayController.birthdayService.getAllBirthdays();
      if (birthdays.length === 0) {
        return successResponse(res, 200, 'Empty Birthday', []);
      }
      return successResponse(
        res,
        200,
        'Fetch Birthdays Data Success',
        birthdays
      );
    } catch (error) {
      return errorResponse(res, 500, 'INTERNAL_SERVER_ERROR', error);
    }
  }

  /**
   * Find by Id
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async findById(req: Request, res: Response) {
    try {
      const birthday = await BirthdayController.birthdayService.findById(
        req.params.id
      );
      if (birthday === null) {
        return successResponse(res, 200, 'Empty Birthday', []);
      }
      return successResponse(
        res,
        200,
        'Fetch Birthdays Data Success',
        birthday
      );
    } catch (error) {
      return errorResponse(
        res,
        error instanceof Error ? 404 : 500,
        error instanceof Error ? error.message : 'INTERNAL_SERVER_ERROR',
        error
      );
    }
  }

  /**
   * Find for Today's Birthday
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async findForTodayBirthday(req: Request, res: Response) {
    try {
      const birthdays =
        await BirthdayController.birthdayService.findByCurrentDate();
      if (birthdays.length === 0) {
        return successResponse(res, 200, 'Empty Birthday', []);
      }
      return successResponse(
        res,
        200,
        'Fetch Birthdays Data Success',
        birthdays
      );
    } catch (error) {
      return errorResponse(res, 500, 'INTERNAL_SERVER_ERROR', error);
    }
  }

  /**
   * Store
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async store(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, 'VALIDATION_ERROR', errors.array());
    }

    try {
      await BirthdayController.birthdayService.store(req.body);
      return successResponse(res, 201, 'Store Birthday Success');
    } catch (error) {
      return errorResponse(
        res,
        error instanceof Error ? 400 : 500,
        error instanceof Error ? error.message : 'INTERNAL_SERVER_ERROR',
        error
      );
    }
  }

  /**
   * Update
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async update(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 400, 'VALIDATION_ERROR', errors.array());
    }

    try {
      await BirthdayController.birthdayService.update(req.body);
      return successResponse(res, 200, 'Update Birthday Success');
    } catch (error) {
      return errorResponse(
        res,
        error instanceof Error ? 404 : 500,
        error instanceof Error ? error.message : 'INTERNAL_SERVER_ERROR',
        error
      );
    }
  }

  /**
   * Delete
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async delete(req: Request, res: Response) {
    try {
      await BirthdayController.birthdayService.delete(req.params.id);
      return successResponse(res, 200, 'Delete Birthday Success');
    } catch (error) {
      return errorResponse(
        res,
        error instanceof Error ? 404 : 500,
        error instanceof Error ? error.message : 'INTERNAL_SERVER_ERROR',
        error
      );
    }
  }
}
