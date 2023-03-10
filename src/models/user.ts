import { Db } from "mongodb";

export interface User {
  uniqueId?: string;
  name: string;
  email: string;
  password: string;
  username?: string;
}

export class userModel {
  private readonly database: Db;
  private readonly collectionName = "users";

  constructor(database: Db) {
    this.database = database;
  }

  async createUser(user: User) {
    const collection = this.database.collection<User>(this.collectionName);
    try {
      await collection.insertOne(user);
    } catch (err: any) {
      throw new Error(`Error creating user ${err.message}`);
    }
  }

  async getUsers(email: string) {
    const collection = this.database.collection<User>(this.collectionName);
    try {
      const result = await collection.find({ email });
      return result.toArray() ?? null;
    } catch (err: any) {
      throw new Error(`Error getting user ${err.message}`);
    }
  }
}
