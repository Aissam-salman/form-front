import {create} from "zustand";

interface AuthState {
    token: string | null;
    isConnected: boolean;
    setToken: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    isConnected: false,
    setToken: (token: string) => set({token, isConnected: true}),
    logout: () => set({token: null, isConnected: false}),
}));





