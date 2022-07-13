import {Middleware} from 'oak';

const logger: Middleware = async (ctx, next)=>{
    await next();
    const body = await ctx.request.body().value;
    const params = body 
      ? `Params => ${JSON.stringify(body, null, 2)}` 
      : 'No params'
    console.log(`[${ctx.request.method}] ${ctx.request.url} \n ${params}`)
}

export default logger;
