import { create } from 'zustand';

type HelpStore = {
  count: number;
  name: string;
  gender: string;
  profile: string;
  email: string;
  phone_no: number;
 setProfile: (data: Partial<{ name: string; gender: string; email: string; phone_no: number; profile: string }>) => void;
  setCount: (count: number) => void;
};

export const useHelpStore = create<HelpStore>((set) => ({
  count: 0,
  name: '',
  gender: '',
  profile: '',
  email: '',
  phone_no: 0,
  setCount: (count: number) => set({ count }),
  setProfile: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
