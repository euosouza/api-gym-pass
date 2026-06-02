import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { UserNotFoundError } from "../erros/user-not-found";

type GetByIDUseCaseRequest = {
  id: string;
};

export class GetByIDUseCase {
  constructor(private repository: IUsersRepository) {}

  async execute({ id }: GetByIDUseCaseRequest) {
    const userExists = await this.repository.findById({ id });

    if (!userExists) {
      throw new UserNotFoundError();
    }

    return userExists;
  }
}
