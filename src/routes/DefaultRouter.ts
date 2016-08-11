import {ExpressRouter} from "typed-api/dist/api/routes/ExpressRouter";
import {ExpressApplication} from "typed-api/dist/api/libs/ExpressApplication";
/**
 * @author Humberto Machado
 * Example custom routes using express instance directly
 */
export class DefaultRouter extends ExpressRouter {

    public getBaseUrl(): string {
        return "/";
    }

    public init(expressApplication: ExpressApplication): void {
        super.init(expressApplication);
        this.express.get("/", (req, res) =>
            res.sendFile('routes.html', { "root": "./src/views" })
        );

        this.express.get("/routes", (req, res) =>
            res.json(this.listRoutes())
        );
        console.log(">>> Rotas Default carregadas <<<");
    }

    private listRoutes(): any[] {
        let routes: any[] = [];
        this.express._router.stack.forEach(r => {
            if (r.route && r.route.path) {
                routes.push({
                    method: r.route.stack[0].method.toUpperCase(),
                    path: r.route.path
                });
            }
        });
        return routes;
    }
}