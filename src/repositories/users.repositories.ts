import { prisma } from "@/lib/prisma";
import type { Prisma, User } from "generated/prisma/browser";
import type { IUsersRepository } from "./users.interface.repository";

export class UsersRepository implements IUsersRepository {
  async delete({ id }: { id: string }) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
  async update({ id, name, email, password_hash }: Prisma.UserUpdateInput): Promise<User> {
    return await prisma.user.update({
      where: { id: id as string },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(password_hash !== undefined && { password_hash }),
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async findById({ id }: { id: string }): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail({ email }: { email: string }): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create({ name, email, password_hash }: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });

    return user;
  }
}
