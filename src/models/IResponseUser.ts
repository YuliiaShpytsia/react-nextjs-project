import {IUser} from "./IUser";

export interface IResponseUsers {
    users: IUser[];
    total: number;
    skip: number;
    limit: number;
}