import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { compare } from "bcryptjs";
import type { User } from "generated/prisma/client";
import { InvalidCredentialsError } from "./errors/invalid-credentials";

interface IAuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface IAuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private repository: IUsersRepository) {}

  async execute({ email, password }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
    const user = await this.repository.findByEmail({ email });

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
