import Redis from 'ioredis'

class SessionData {
  private prefix: string
  private redis: Redis.Redis
  private sessionPrefix = 'sess:'

  constructor() {
    this.prefix = 'sessionlist:'
    this.redis = new Redis(process.env.REDIS_URL)
  }

  public async saveUserSessionId(param: {
    userId: number,
    sessionId: string
  }): Promise<boolean> {
    const data = await this.getUserDataByUserId(param.userId)
    data.push(param.sessionId)
    this.redis.set(this.prefix + param.userId, JSON.stringify(data))
    return true
  }

  public async destroyAllUserSessionByUserIdExcepSessionId(param: {
    userId: number,
    sessionId: string
  }): Promise<boolean> {
    const data = await this.getUserDataByUserId(param.userId)
    for (const da of data) {
      if (da != param.sessionId) await this.redis.del(this.sessionPrefix + da)
    }
    await this.redis.set(this.prefix + param.userId, JSON.stringify([param.sessionId]))
    return true
  }

  public async destroyUserSessionByUserId(param: {
    userId: number,
    sessionId: string
  }): Promise<boolean> {
    const data = await this.getUserDataByUserId(param.userId)
    await this.redis.set(this.prefix + param.userId, JSON.stringify([data.filter((da) => da != param.sessionId)]))
    return true
  }

  public async getUserDataByUserId(userId: number): Promise<string[]> {
    const data = await this.redis.get(this.prefix + userId)
    if (!data) return []
    else return JSON.parse(data) as string[]
  }
}

export const sessionData = new SessionData()