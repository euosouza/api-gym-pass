import type { IUsersRepository } from "@/repositories/users.interface.repository";
import type { Prisma } from "generated/prisma/browser";
import { UserNotFoundError } from "../erros/user-not-found";

export class UsersUpdateUseCase {
  constructor(private repository: IUsersRepository) {}

  async execute({ id, name, email, password_hash }: Prisma.UserUpdateInput) {
    if (!id) {
      throw new Error("Invalid params");
    }

    const user = await this.repository.findById({ id: id as string });

    if (!user) {
      throw new UserNotFoundError();
    }

    const userUpdated = await this.repository.update({
      id: id as string,
      name: (name as string) ?? user.name,
      email: (email as string) ?? user.email,
      password_hash: (password_hash as string) ?? user.password_hash,
    });

    return userUpdated;
  }
}
