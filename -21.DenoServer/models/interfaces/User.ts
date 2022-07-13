export interface UserPayload {
  name: string;
  age: number;
  birthdate: Date;
}

export interface User {
  id: string;
  name: string;
  age: number;
  birthdate: Date;
  isActive: boolean;
}

export interface UserMemDB{
  [key:string] : User;
}