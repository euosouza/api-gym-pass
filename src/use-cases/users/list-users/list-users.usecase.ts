import type { IUsersRepository } from "@/repositories/users.interface.repository";

export class ListUsersUseCase {
  constructor(private repository: IUsersRepository) {}

  async execute() {
    const users = await this.repository.findAll();

    return users;
  }
}
