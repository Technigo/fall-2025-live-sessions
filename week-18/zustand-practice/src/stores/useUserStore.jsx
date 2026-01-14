import { create } from "zustand"

export const useUserStore = create(() => ({
  // Here we will store the users
  users: []
}))
