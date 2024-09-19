import {create} from "zustand";
import {Role} from "@/types/Role.ts";

interface AuthState {
    token: string | null;
    id: number | null;
    role: Role | string | null;
    isConnected: boolean;
    setToken: (token: string) => void;
    setRole: (role: Role | string) => void;
    setId: (id: number) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    id: null,
    isConnected: false,
    role: null,
    setRole: (role: Role | string) => set({role}),
    setToken: (token: string) => set({token, isConnected: true}),
    setId: (id: number) => set({id}),
    logout: () => set({token: null, isConnected: false}),
}));





