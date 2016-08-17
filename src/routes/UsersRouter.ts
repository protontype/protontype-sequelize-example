import {BaseModel} from "protontype-api/dist/models/BaseModel";
import {UsersModel} from "../models/UsersModel";
import {BaseCrudRouter} from "protontype-api/dist/routes/BaseCrudRouter";

/**
 * @author Humberto Machado
 * Example using BaseCrudRouter.
 */
export class UsersRouter extends BaseCrudRouter {

    public getModelInstances(): BaseModel[] {
        return [new UsersModel()];
    }

    public getBaseUrl(): string {
        return '/users';
    }
}