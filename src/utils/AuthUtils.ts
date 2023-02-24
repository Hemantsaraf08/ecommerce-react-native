import React from 'react';

export interface User{
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string,
    token: string,
}

export const initialState = {
    isLoading: true,
    id: 0,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: "",
    token: "",
}; 

type ACTIONTYPE =
  | { type: "get_user"; payload?: null }
  | { type: "restore_user"; payload: User }
  | { type: "sign_in"; payload: User }
  | {type: "sign_out", payload?: null}
  | {type: "set_app_loaded", payload?: null};



export const authReducer =  (prevState: typeof initialState, action: ACTIONTYPE) : typeof initialState => {
    switch (action.type) {
      case 'restore_user':
        return {
          ...action.payload,
          isLoading: false,
        };
      case 'sign_in':
        return {
          ...prevState,
          ...action.payload,
        };
      case 'sign_out':
        return {...initialState, isLoading: false};
      case 'get_user':
        return prevState
      case 'set_app_loaded':
        return {
            ...prevState,
            isLoading: false
        }  
      default:
        throw new Error();  
    }
}

export type AuthContextType = {
    authState: User;
    dispatch: unknown;
  }
  
  export const AuthContext = React.createContext<AuthContextType>({
    authState : initialState,
    dispatch: () => {},
  });