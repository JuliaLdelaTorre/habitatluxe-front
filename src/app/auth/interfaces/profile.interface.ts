import { User } from "./loginResponse.interface";

export interface Profile {
  username?:        string;
  email?:           string;
  phone?:           string;
  currentPassword?: string;
  password?:        string;
  id:          number;
  user?:             User;

}
