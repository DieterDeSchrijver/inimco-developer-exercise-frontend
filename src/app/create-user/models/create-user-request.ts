import { Guid } from 'guid-typescript';


export class CreateUserRequest {
    id!: string;
    firstName!: string;
    lastName!: string;
    socialSkills!: string[];
    socialAccounts!: SocialAccount[];
}

export class SocialAccount {
    type!: string;
    address!: string;
}

export type CreateUserResponse = {
    firstName: string;
}