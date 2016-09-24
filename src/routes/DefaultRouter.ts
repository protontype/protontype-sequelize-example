import { BaseModel } from 'protontype/dist/models/BaseModel';
import {ExpressRouter} from "protontype/dist/routes/ExpressRouter";
import {ExpressApplication} from "protontype/dist/libs/ExpressApplication";
import {Method} from "protontype/dist/routes/Method";
import {Route} from "protontype/dist/libs/RouteConfigLoader";
/**
 * @author Humberto Machado
 * Example custom routes using router instance directly mixing with @Route decorator
 */
export class DefaultRouter extends ExpressRouter {

    public getModelInstances(): BaseModel[] {
        return [];
    }

    public getBaseUrl(): string {
        return "/";
    }

    @Route({
        method: Method.GET,
        endpoint: 'routes'
    })
    public listRoutes(req, res, model): void {
        res.json(this.expressApplication.getRoutesList());
    }

    @Route()
    public rootRoute(): void {
        this.router.get("", (req, res) =>
            res.sendFile('routes.html', { "root": "./src/views" })
        );
    }
}