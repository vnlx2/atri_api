import {config} from 'dotenv';
import {RedisClientType, createClient} from 'redis';

config();

class RedisService {
  private readonly _client: RedisClientType;

  constructor() {
    this._client = createClient({
      socket: {
        port: +process.env.REDIS_PORT!,
        host: process.env.REDIS_HOST,
      },
    });
    if (!this._client.isOpen) {
      this._client.connect();
    }
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
    if (expired) {
      await this._client.setEx(tagName, expired, JSON.stringify(data));
    } else {
      await this._client.set(tagName, JSON.stringify(data));
    }
  }

  async get(tagName: string): Promise<Object | string | void> {
    const data = await this._client.get(tagName);
    if (typeof data === 'string') {
      return this.checkJsonString(data) ? JSON.parse(data) : data;
    }
  }

  async del(tagName: string) {
    await this._client.del(tagName);
  }
}

export default new RedisService();
