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

  private checkJsonString(data: string) {
    try {
      JSON.parse(data);
    } catch (error) {
      return false;
    }
    return true;
  }

  async set(tagName: string, data: string, expired?: number) {
    await this._client.connect();

    if (expired) {
      await this._client.setEx(tagName, expired, JSON.stringify(data));
    } else {
      await this._client.set(tagName, JSON.stringify(data));
    }
    await this._client.disconnect();
  }

  async get(tagName: string): Promise<Object | string | void> {
    await this._client.connect();
    const data = await this._client.get(tagName);
    await this._client.disconnect();
    if (typeof data === 'string') {
      return this.checkJsonString(data) ? JSON.parse(data) : data;
    }
  }

  async del(tagName: string) {
    await this._client.connect();
    await this._client.del(tagName);
    await this._client.disconnect();
  }
}

export default new RedisService();
