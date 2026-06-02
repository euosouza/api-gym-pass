import type { IUsersRepository } from "@/repositories/users.interface.repository";
import type { User } from "generated/prisma/client";
import { UserNotFoundError } from "../erros/user-not-found";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private repository: IUsersRepository) {}

  async execute({ userId }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.repository.findById({ id: userId });

    if (!user) {
      throw new UserNotFoundError();
    }

    return { user };
  }
}
