import {Request, Response} from 'express';
import {errorResponse, successResponse} from '../utils/responseHelper';
import redisService from '../services/redisService';
import {ICloudStorageProvider} from '../interfaces/cloudStorageProvider';
import cloudStorageProviderService from '../services/cloudStorageService';
import { validationResult } from 'express-validator';

export default class ConfigurationController {
  /**
   * Get Cloud Storage Provider
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async getCloudStorageProvider(req: Request, res: Response) {
    try {
      let storageProvider;
      if (!(await redisService.exists('storageProvider'))) {
        storageProvider = await cloudStorageProviderService.load();
        await redisService.set('storageProvider', storageProvider);
      } else {
        storageProvider = (await redisService.get(
          'storageProvider'
        )) as ICloudStorageProvider[];
      }
      return successResponse(
        res,
        200,
        'Fetch Cloud Storage Provider Success',
        storageProvider
      );
    } catch (error: unknown) {
      return errorResponse(
        res,
        error instanceof Error ? 400 : 500,
        error instanceof Error ? error.message : 'INTERNAL_SERVER_ERROR',
        error
      );
    }
  }

  /**
   * Store Cloud Storage Provider
   *
   * @param req Request
   * @param res Response
   * @returns Response
   */
  public static async storeCloudStorageProvider(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return errorResponse(res, 400, 'VALIDATION_ERROR', errors.array());
      }

      await cloudStorageProviderService.save(req.body.data);
      await redisService.del('storageProvider');
      return successResponse(res, 200, 'Store Cloud Storage Provider Success');
    } catch (error) {
      return errorResponse(res, 500, 'INTERNAL_SERVER_ERROR', error);
    }
  }
}
