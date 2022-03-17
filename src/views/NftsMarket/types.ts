import { Reducer } from 'redux';

export interface StoreTypes {
  CustomizerReducer: Reducer;
  wallet: Reducer;
  wallets: Reducer;
  auth: UserAuthProps;
  message: Reducer;
  nft: Reducer;
}

export interface ItemProps {
  item: {
    id: number;
    image: string;
    description: string;
    title: string;
  };
}

export interface UserAuthProps {
  isLoggedIn: boolean;
  user: {
    infor: {
      id: string;
      full_name: string;
      email: string;
      level: string;
      image: string;
      description: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterForm {
  full_name?: string | '';
  email: string;
  password: string;
  repeatPassword: string;
  level: string;
  image: File | null;
  description: string;
}

export interface RegisterResponse {
  status: number;
  data: {
    _id: string;
    full_name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}
