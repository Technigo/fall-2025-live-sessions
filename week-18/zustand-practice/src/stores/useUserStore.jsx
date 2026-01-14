import { create } from "zustand";
import { devtools } from "zustand/middleware";

// const initialUserState = [
//   { id: 1, name: "John Doe", email: "john@example.com" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com" },
//   // { id: 3, name: "Jane Smith", email: "jane@example.com" },
// ];

export const useUserStore = create(
  devtools((set, get) => ({
    users: [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ],
    addUser: (newUser) => {
      const usersListLength = get().users.length;

      const userToAdd = {
        ...newUser,
        id: usersListLength + 1,
      };

      return set((state) => ({
        users: [...state.users, userToAdd],
      }));
    },
    removeUser: (userToRemove) => {
      return set((state) => {
        const newUsers = state.users.filter((u) => u.id !== userToRemove.id);

        return {
          users: newUsers,
        };
      });
    },
  })),
);
