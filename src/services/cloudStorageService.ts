import {ICloudStorageProvider} from '../interfaces/cloudStorageProvider';
import * as fs from 'fs/promises';

export default class cloudStorageProviderService {
  public static async load(): Promise<ICloudStorageProvider[]> {
    const data = await fs.readFile('./data/storageProvider.json', 'utf-8');
    return JSON.parse(data);
  }

  public static async save(data: ICloudStorageProvider[]): Promise<void> {
    await fs.writeFile('./data/storageProvider.json', JSON.stringify(data));
  }
}
