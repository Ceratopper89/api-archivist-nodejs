import { WithId } from 'mongodb'

import { UpsertResult } from '../../../../../lib'
import { User, UserWithoutId } from '../../user'
import { UserStore } from '../userStore'
import { UserMongoSdk } from './userSdk'

const fromDbEntity = (user: WithId<User>): User => {
  const id = user?._id?.toHexString?.()
  if (id) {
    user.id = id
  }
  delete (user as Partial<WithId<User>>)?._id
  return user
}

const toDbEntity = (user: UserWithoutId) => {
  if (user?.email) {
    user.email = user.email.toLowerCase()
  }
  if (user?.address) {
    user.address = user.address.toLowerCase()
  }
  return user
}

export class MongoDBUserStore implements UserStore {
  constructor(private readonly mongo: UserMongoSdk) {}
  async create(user: UserWithoutId): Promise<User & UpsertResult> {
    const created = await this.mongo.upsert(toDbEntity(user))
    return { ...fromDbEntity(created), updated: created.updated }
  }
  async getById(id: string): Promise<User | null> {
    const user = await this.mongo.findById(id.toLowerCase())
    return user ? fromDbEntity(user) : null
  }
  async getByEmail(email: string): Promise<User | null> {
    const user = await this.mongo.findByEmail(email.toLowerCase())
    return user ? fromDbEntity(user) : null
  }
  async getByWallet(address: string): Promise<User | null> {
    const user = await this.mongo.findByAddress(address.toLowerCase())
    return user ? fromDbEntity(user) : null
  }
}
