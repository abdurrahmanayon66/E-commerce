import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userType: 'customer' | 'seller' | null;
  name: string;
  setUser: (data: { userType: 'customer' | 'seller'; name: string}) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userType: null,
      name: '',
      setUser: ({ userType, name}) => set({ userType, name}),
      resetUser: () => set({ userType: null, name: ''}),
    }),
    {
      name: 'user-store', 
    }
  )
);
