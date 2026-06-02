import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { UserNotFoundError } from "./erros/user-not-found";

type DeleteUserUseCaseRequest = {
  id: string;
};

export class DeleteUserUseCase {
  constructor(private repository: IUsersRepository) {}

  async execute({ id }: DeleteUserUseCaseRequest) {
    const userExists = await this.repository.findById({ id });

    if (!userExists) {
      throw new UserNotFoundError();
    }

    await this.repository.delete({ id });
  }
}
