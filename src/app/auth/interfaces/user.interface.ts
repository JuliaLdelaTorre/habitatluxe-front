export interface User {
  id:             number;
  username:       string;
  email:          string;
  user_type:      UserType;
  remember_token: null;
}

export enum UserType {
  admin = 'admin',
  normal_user = 'normal_user',
  seller_user = 'seller_user'
}
