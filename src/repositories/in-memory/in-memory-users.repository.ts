import type { Prisma, User } from "generated/prisma/browser";
import { randomUUID } from "node:crypto";
import type { IUsersRepository } from "../users.interface.repository";

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = [];

  async create({ name, email, password_hash }: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: name as string,
      email: email as string,
      password_hash: password_hash as string,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async delete({ id }: { id: string }): Promise<void> {
    this.items = this.items.filter((user) => user.id !== id);
  }

  async update({ id, name, email, password_hash }: Prisma.UserUpdateInput): Promise<User> {
    const userId = id as string;
    const userIndex = this.items.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const user = this.items[userIndex]!;

    this.items[userIndex] = {
      id: user.id,
      created_at: user.created_at,
      name: name !== undefined ? (name as string) : user.name,
      email: email !== undefined ? (email as string) : user.email,
      password_hash: password_hash !== undefined ? (password_hash as string) : user.password_hash,
    };

    return this.items[userIndex];
  }

  async findAll(): Promise<User[]> {
    return this.items;
  }

  async findById({ id }: { id: string }): Promise<User | null> {
    return this.items.find((user) => user.id === id) ?? null;
  }

  async findByEmail({ email }: { email: string }): Promise<User | null> {
    return this.items.find((user) => user.email === email) ?? null;
  }
}
