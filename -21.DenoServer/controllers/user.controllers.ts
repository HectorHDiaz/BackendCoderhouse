import { User, UserPayload } from "@interfaces/User.ts"
import { getUsers, getUserById, createUser } from "@daos/user.dao.ts";
import { Context, helpers } from "oak"

export const getUsersController = async (ctx: Context) =>{
  ctx.response.body = await getUsers();
}
export const getUserByIdController = async (ctx: Context) =>{
  const{id} = helpers.getQuery(ctx, {mergeParams:true})
  try {
   const user : User = await getUserById(id) 
   ctx.response.body = user;
  } 
  catch (error) {
    ctx.response.status = 404;
    ctx.response.body = {
        error: error
    }
  }
}
export const createUserController = async (ctx: Context) =>{
  const body: UserPayload = await ctx.request.body().value;
  const newUser = await createUser(body);
  ctx.response.status = 201;
  ctx.response.body = newUser;
}