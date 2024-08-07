'use client'
import React, { createContext, useContext, useReducer } from "react";

interface AuthState {
    email: string;
    uid: string;
}

const INITIAL_STATE: AuthState = {
    email: '',
    uid: ''
};

export const SET_USER_PROFILE = "[AUTH] SET_USER_PROFILE";
export const CLEAR_AUTH_STATE = "[AUTH] CLEAR_AUTH_STATE";

const reducer = (state: AuthState, action: { type: string, payload: any }): AuthState => {
    const { type, payload } = action;
    switch (type) {
        case SET_USER_PROFILE:
            return { ...state, ...payload };
        case CLEAR_AUTH_STATE:
            return INITIAL_STATE;
        default:
            return state;
    }
};

const authContext = createContext<{ authState: AuthState; authDispatch: React.Dispatch<any>; }>
    ({ authState: INITIAL_STATE, authDispatch: () => null });

export const AuthProvider = ({ children }: any) => {
    const [authState, authDispatch] = useReducer(reducer, INITIAL_STATE);
    return (
        <authContext.Provider value={{ authState, authDispatch }} >
            {children}
        </authContext.Provider>
    );
}

export const useAuthState = () => {
    return useContext(authContext);
}