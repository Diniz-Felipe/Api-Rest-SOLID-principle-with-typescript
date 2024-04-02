import Validator from 'validator';
import { User } from '../../../models/user';
import { HttpRequest, HttpResponse, IController } from '../../protocols';
import { CreateUserParams, ICreateUserRepository } from './protocols';
import { badRequest, created, serverError } from '../../helpers';

export class CreateUserController implements IController {
    constructor(private readonly createUserRepository: ICreateUserRepository) { };

    async handle(
        httpRequest: HttpRequest<CreateUserParams>
    ): Promise<HttpResponse<User | string>> {

        try {
            const requiredFields = ["name","email", "password"];
            
            for (const field of requiredFields) {
                if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
                    return badRequest(`Field ${field} is required`);
                }
            };

            const emailValid = Validator.isEmail(httpRequest.body!.email);

            if(!emailValid) {
                return badRequest("E-mail is invalid")
            };

            const user = await this.createUserRepository.createUser(
                httpRequest.body!
            );

            return created<User>(user);
        } catch (error) {
            return serverError();
        };
    };
};