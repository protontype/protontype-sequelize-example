import { BaseModel } from 'typed-api/dist/models/BaseModel';
import {ExpressRouter} from "typed-api/dist/routes/ExpressRouter";
import {ExpressApplication} from "typed-api/dist/libs/ExpressApplication";
import {Method} from "typed-api/dist/routes/Method";
import {Route} from "typed-api/dist/libs/RouteConfigLoader";
/**
 * @author Humberto Machado
 * Example custom routes using express instance directly mixing with @Route function configuration
 */
export class DefaultRouter extends ExpressRouter {

    public getModelInstances(): BaseModel[] {
        return [];
    }

    public getBaseUrl(): string {
        return "/";
    }

    public init(expressApplication: ExpressApplication): void {
        super.init(expressApplication);
        this.express.get("/", (req, res) =>
            res.sendFile('routes.html', { "root": "./src/views" })
        );
        console.log(">>>> Default routes loaded <<<<");
    }

    @Route({
        method: Method.GET,
        endpoint: 'routes'
    })
    public listRoutes(req, res, model) {
        let routes: any[] = [];
        this.express._router.stack.forEach(r => {
            if (r.route && r.route.path) {
                routes.push({
                    method: r.route.stack[0].method.toUpperCase(),
                    path: r.route.path
                });
            }
        });
        res.json(routes);
    }
}