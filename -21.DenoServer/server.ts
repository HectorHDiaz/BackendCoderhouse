import { Application } from "oak";
import apiRoutes from "@routers/index.router.ts"
import logger from "@middlewares/logger.ts"

const PORT = Deno.env.get('PORT') || 8080;

const app = new Application();

// app.use((ctx)=>{
//     ctx.response.type = "text.html";
//     ctx.response.body = "<h2>Holaaa</h2>"
// });
app.use(logger)
app.use(apiRoutes.routes());

console.log("server running");
await app.listen({port: +PORT});