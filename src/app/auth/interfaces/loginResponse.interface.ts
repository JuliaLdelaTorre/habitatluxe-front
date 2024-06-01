export interface LoginResponse {
  user:  User;
  token: string;
}

export interface User {
  id:             number;
  username:       string;
  email:          string;
  user_type:      string;
  remember_token: null;
}
