import { UserMemDB, User, UserPayload } from "@interfaces/User.ts"

const users:UserMemDB = {};

export const getUsers = () : Promise<User[]> => {
    return new Promise((resolve)=>{
        setTimeout(()=>{
          const userList = Object.values(users);
          resolve(userList)
        },300)
    })
}    
export const getUserById = (id: string) : Promise<User> => {
    return new Promise((resolve, reject)=>{
        const user = users[id];
        setTimeout(()=>{
          if (!user){
            reject('Id no existe')
          }
          resolve(user)
        },200)
    })
}
export const createUser = (payload: UserPayload) : Promise<User> => {
    return new Promise((resolve)=>{
        const newUser: User = {
            id: crypto.randomUUID(),
            ...payload,
            isActive: true
        };
        users[newUser.id] = newUser;
        setTimeout(()=>{
          resolve(newUser)
        },300)
    })
}
