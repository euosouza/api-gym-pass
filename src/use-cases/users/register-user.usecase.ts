import type { IUsersRepository } from "@/repositories/users.interface.repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./erros/user-already-exists";

type RegisterUserUseCaseRequest = {
  name: string;
  email: string;
  password: string;
};

export class RegisterUserUseCase {
  constructor(private repository: IUsersRepository) {}

  async execute({ name, email, password }: RegisterUserUseCaseRequest) {
    const userAlreadyExists = await this.repository.findByEmail({ email });

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

    return await this.repository.create({
      name,
      email,
      password_hash,
    });
  }
}
