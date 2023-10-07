import {config} from 'dotenv';
import {RedisClientType, createClient} from 'redis';

config();

class RedisService {
  private readonly _client: RedisClientType;

  constructor() {
    this._client = createClient({
      socket: {
        host: process.env.REDIS_HOST,
      },
    });
  }

  async set(tagName: string, data: object | Array<object>, expired?: number) {
    await this._client.connect();

    if (expired) {
      await this._client.setEx(tagName, expired, JSON.stringify(data));
    } else {
      await this._client.set(tagName, JSON.stringify(data));
    }
    await this._client.disconnect();
  }

  async get(tagName: string): Promise<any> {
    await this._client.connect();
    const data = await this._client.get(tagName);
    await this._client.disconnect();
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return data;
  }

  async del(tagName: string) {
    await this._client.connect();
    await this._client.del(tagName);
    await this._client.disconnect();
  }
}

export default new RedisService();
