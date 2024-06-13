import { User } from "./loginResponse.interface";

export interface Profile {
  username?:        string;
  email?:           string;
  phone?:           string;
  currentPassword?: string;
  password?:        string;
  user_id:          number;
  user?:             User;

}
