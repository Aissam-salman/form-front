import {create} from "zustand";

interface AuthState {
    token: string | null;
    id: number | null;
    isConnected: boolean;
    setToken: (token: string) => void;
    setId: (id: number) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    id: null,
    isConnected: false,
    setToken: (token: string) => set({token, isConnected: true}),
    setId: (id: number) => set({id}),
    logout: () => set({token: null, isConnected: false}),
}));





