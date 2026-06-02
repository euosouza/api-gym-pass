import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { hash } from "bcryptjs";
import type { Prisma } from "generated/prisma/browser";
import { UserNotFoundError } from "./erros/user-not-found";

export class UsersUpdateUseCase {
  constructor(private repository: IUsersRepository) {}

  async execute({ id, name, email, password_hash }: Prisma.UserUpdateInput) {
    if (!id || !name || !email || !password_hash) {
      throw new Error("Invalid params");
    }

    const user = await this.repository.findById({ id: id as string });

    if (!user) {
      throw new UserNotFoundError();
    }

    const password = password_hash ? await hash(password_hash as string, 6) : user.password_hash;

    return await this.repository.update({
      id: id as string,
      name: name as string,
      email: email as string,
      password_hash: password,
    });
  }
}
