import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route("*", "routes/_.tsx")
] satisfies RouteConfig;

