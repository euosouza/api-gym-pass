import type { Prisma, User } from "generated/prisma/browser";

export interface IUsersRepository {
  create({ name, email, password_hash }: Prisma.UserCreateInput): Promise<User>;
  delete({ id }: { id: string }): Promise<void>;
  update({ id, name, email, password_hash }: Prisma.UserUpdateInput): Promise<User>;
  findAll(): Promise<User[]>;
  findById({ id }: { id: string }): Promise<User | null>;
  findByEmail({ email }: { email: string }): Promise<User | null>;
}
