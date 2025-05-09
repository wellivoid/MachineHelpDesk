
export interface IUser {
  id: number, 
  name: string,
  email: string,
  password: string,
  level: string
  enable: boolean,
  createdAt: Date,    
}


export interface IUserPublic {
  id: number;
  name: string;
  enable: boolean;
  createdAt: Date;
}

export interface IUserPrivate {
  id: number;
  name: string;
  enable: boolean;
  createdAt: Date;
  level: string;
}
export interface IUserUpdate {
  name: string;
  enable: boolean;
  level: string;
  createdAt: Date;
}