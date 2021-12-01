export interface AuthForm {
  username: string;
  password: string;
}

export interface Project {
  id: number;
  pin: boolean;
  name: string;
  personId?: string;
  organization?: string;
  created?: number;
}

export interface Param {
  name?: string;
  personId?: string;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  title?: string;
  organization?: string;
  token?: string;
}